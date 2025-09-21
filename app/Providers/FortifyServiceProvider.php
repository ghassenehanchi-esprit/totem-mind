<?php

namespace App\Providers;

use App\Support\FortifyLimiter;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
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

        Fortify::loginView(function (Request $request) {
            return Inertia::render('Auth/Login', [
                'status' => $request->session()->get('status'),
                'canResetPassword' => Route::has('password.request'),
                'canRegister' => Route::has('register'),
            ]);
        });

        Fortify::registerView(fn (Request $request) => Inertia::render('Auth/Register'));

        Fortify::requestPasswordResetLinkView(function (Request $request) {
            return Inertia::render('Auth/ForgotPassword', [
                'status' => $request->session()->get('status'),
            ]);
        });

        Fortify::resetPasswordView(function (Request $request) {
            return Inertia::render('Auth/ResetPassword', [
                'token' => $request->route('token'),
                'email' => $request->query('email'),
            ]);
        });

        Fortify::confirmPasswordView(fn (Request $request) => Inertia::render('Auth/ConfirmPassword'));

        Fortify::verifyEmailView(function (Request $request) {
            return Inertia::render('Auth/VerifyEmail', [
                'status' => $request->session()->get('status'),
            ]);
        });

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
