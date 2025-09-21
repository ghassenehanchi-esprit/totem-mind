<?php

namespace App\Actions\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class CreateNewUser
{
    use PasswordValidationRules;

    public function create(array $input): User
    {
        $validator = Validator::make($input, [
            'name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'birthdate' => [
                'required',
                'date',
                'before_or_equal:'.now()->subYears(18)->toDateString(),
            ],
            'password' => $this->passwordRules(),
            'captcha' => ['accepted'],
        ], [
            'birthdate.before_or_equal' => __('Vous devez avoir au moins 18 ans pour vous inscrire.'),
        ]);

        $validator->validate();

        return User::create([
            'name' => $this->resolveName($input),
            'email' => strtolower($input['email']),
            'birthdate' => $input['birthdate'],
            'password' => Hash::make($input['password']),
        ]);
    }

    protected function resolveName(array $input): string
    {
        $name = trim((string) ($input['name'] ?? ''));

        if ($name !== '') {
            return $name;
        }

        $email = (string) ($input['email'] ?? '');

        if ($email !== '') {
            return Str::before($email, '@');
        }

        return __('Invité Totem');
    }
}
