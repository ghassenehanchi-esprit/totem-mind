<?php

namespace App\Providers;

use App\Support\FortifyLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        Fortify::ignoreRoutes();
    }

    public function boot(): void
    {
        Fortify::ignoreRoutes();

        $this->configureRateLimiting();
    }

    protected function configureRateLimiting(): void
    {
        $loginConfig = FortifyLimiter::resolve('login', 5, 1);
        $loginKey = $loginConfig['key'];
        $loginAttempts = $loginConfig['max_attempts'];
        $loginDecay = $loginConfig['decay_minutes'];

        RateLimiter::for($loginKey, function (Request $request) use ($loginAttempts, $loginDecay) {
            $email = strtolower((string) $request->input('email', 'guest'));

            return Limit::perMinutes($loginDecay, $loginAttempts)->by($email.'|'.$request->ip());
        });

        $registerConfig = FortifyLimiter::resolve('register', 3, 5);
        $registerKey = $registerConfig['key'];
        $registerAttempts = $registerConfig['max_attempts'];
        $registerDecay = $registerConfig['decay_minutes'];

        RateLimiter::for($registerKey, function (Request $request) use ($registerAttempts, $registerDecay) {
            return Limit::perMinutes($registerDecay, $registerAttempts)->by($request->ip());
        });
    }
}
