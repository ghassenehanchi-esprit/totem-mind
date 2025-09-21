<?php

namespace App\Actions\Auth;

use Illuminate\Validation\Rules\Password;

trait PasswordValidationRules
{
    /**
     * Get the validation rules used to validate passwords.
     *
     * @return array<int, mixed>
     */
    protected function passwordRules(): array
    {
        return [
            'required',
            'string',
            'confirmed',
            Password::defaults(),
        ];
    }
}
