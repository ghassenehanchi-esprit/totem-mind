<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $recaptchaSiteKey = (string) config('services.recaptcha.site_key', '');
        $recaptchaTestKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'recaptcha' => [
                'siteKey' => $recaptchaSiteKey,
                'isSandbox' => hash_equals($recaptchaTestKey, $recaptchaSiteKey),
            ],
        ];
    }
}
