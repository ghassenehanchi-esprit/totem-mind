<?php

namespace App\Providers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Jetstream\Jetstream;

class JetstreamServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        Jetstream::useInertia();

        Jetstream::loginView(function (Request $request) {
            return Inertia::render('Auth/Login', [
                'status' => $request->session()->get('status'),
                'canResetPassword' => Route::has('password.request'),
                'canRegister' => Route::has('register'),
            ]);
        });

        Jetstream::registerView(fn (Request $request) => Inertia::render('Auth/Register'));

        Jetstream::requestPasswordResetLinkView(function (Request $request) {
            return Inertia::render('Auth/ForgotPassword', [
                'status' => $request->session()->get('status'),
            ]);
        });

        Jetstream::resetPasswordView(function (Request $request) {
            return Inertia::render('Auth/ResetPassword', [
                'token' => $request->route('token'),
                'email' => $request->query('email'),
            ]);
        });

        Jetstream::confirmPasswordView(fn (Request $request) => Inertia::render('Auth/ConfirmPassword'));

        Jetstream::verifyEmailView(function (Request $request) {
            return Inertia::render('Auth/VerifyEmail', [
                'status' => $request->session()->get('status'),
            ]);
        });

        $this->configurePermissions();
    }

    protected function configurePermissions(): void
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
