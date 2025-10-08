<?php

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Exceptions\ThrottleRequestsException;
use Illuminate\Http\Request;
use Laravel\Socialite\SocialiteServiceProvider;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withProviders([
        SocialiteServiceProvider::class,
    ])
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            \App\Http\Middleware\AuthenticateUsingRememberCookie::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (ThrottleRequestsException $exception, Request $request) {
            if (! $request->routeIs('register')) {
                return null;
            }

            $retryAfterHeader = $exception->getHeaders()['Retry-After']
                ?? $exception->getHeaders()['retry-after']
                ?? null;

            $retryAfter = is_numeric($retryAfterHeader)
                ? (int) $retryAfterHeader
                : 0;

            $retryAfter = max($retryAfter, 1);

            $ipAlreadyRegistered = $request->ip() !== null
                && User::query()
                    ->where('registration_ip', $request->ip())
                    ->exists();

            $message = $ipAlreadyRegistered
                ? __('Les inscriptions multiples depuis la même adresse IP ne sont pas autorisées.')
                : trans('auth.throttle', [
                    'seconds' => $retryAfter,
                    'minutes' => (int) ceil($retryAfter / 60),
                ]);

            return back()
                ->withInput(
                    $request->except([
                        'password',
                        'password_confirmation',
                        'captcha_token',
                    ])
                )
                ->withErrors([
                    'email' => $message,
                ]);
        });
    })->create();
