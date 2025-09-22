<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\Http;
use Throwable;

class RecaptchaToken implements ValidationRule
{
    /**
     * Validate the reCAPTCHA token.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $secret = (string) config('services.recaptcha.secret_key');

        if ($secret === '') {
            $fail(__('La vérification reCAPTCHA est indisponible. Veuillez réessayer plus tard.'));

            return;
        }

        if (! is_string($value) || trim($value) === '') {
            $fail(__('La vérification reCAPTCHA a échoué. Veuillez réessayer.'));

            return;
        }

        try {
            $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
                'secret' => $secret,
                'response' => $value,
                'remoteip' => request()->ip(),
            ]);
        } catch (Throwable $exception) {
            report($exception);

            $fail(__('Impossible de vérifier reCAPTCHA. Veuillez réessayer.'));

            return;
        }

        if (! $response->successful()) {
            $fail(__('Impossible de vérifier reCAPTCHA. Veuillez réessayer.'));

            return;
        }

        if (! ($response->json('success') ?? false)) {
            $fail(__('La vérification reCAPTCHA a échoué. Veuillez réessayer.'));
        }
    }
}
