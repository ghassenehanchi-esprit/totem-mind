<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class FortifyServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->configureRateLimiting();
    }

    protected function configureRateLimiting(): void
    {
        $loginConfig = config('fortify.limiters.login', []);
        $loginKey = (string) data_get($loginConfig, 'key', 'login');
        $loginAttempts = max(1, (int) data_get($loginConfig, 'max_attempts', 5));
        $loginDecay = max(1, (int) data_get($loginConfig, 'decay_minutes', 1));

        RateLimiter::for($loginKey, function (Request $request) use ($loginAttempts, $loginDecay) {
            $email = strtolower((string) $request->input('email', 'guest'));

            return Limit::perMinutes($loginDecay, $loginAttempts)->by($email.'|'.$request->ip());
        });

        $registerConfig = config('fortify.limiters.register', []);
        $registerKey = (string) data_get($registerConfig, 'key', 'register');
        $registerAttempts = max(1, (int) data_get($registerConfig, 'max_attempts', 3));
        $registerDecay = max(1, (int) data_get($registerConfig, 'decay_minutes', 5));

        RateLimiter::for($registerKey, function (Request $request) use ($registerAttempts, $registerDecay) {
            return Limit::perMinutes($registerDecay, $registerAttempts)->by($request->ip());
        });
    }
}
