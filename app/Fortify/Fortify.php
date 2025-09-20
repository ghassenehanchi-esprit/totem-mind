<?php

namespace Laravel\Fortify;

use Illuminate\Http\Request;
use InvalidArgumentException;
use Symfony\Component\HttpFoundation\Response;
use function response;
use function view;

class Fortify
{
    /**
     * Indicates if Fortify should register the authentication routes.
     */
    public static bool $registersRoutes = true;

    /**
     * The callbacks used to render Fortify views.
     *
     * @var array<string, callable|null>
     */
    protected static array $viewCallbacks = [
        'login' => null,
        'register' => null,
        'requestPasswordResetLink' => null,
        'resetPassword' => null,
        'confirmPassword' => null,
        'verifyEmail' => null,
    ];

    /**
     * The prefix applied to Fortify view names when callbacks are not provided.
     */
    protected static string $viewPrefix = '';

    public static function loginView(callable $callback): void
    {
        static::$viewCallbacks['login'] = $callback;
    }

    public static function registerView(callable $callback): void
    {
        static::$viewCallbacks['register'] = $callback;
    }

    public static function requestPasswordResetLinkView(callable $callback): void
    {
        static::$viewCallbacks['requestPasswordResetLink'] = $callback;
    }

    public static function resetPasswordView(callable $callback): void
    {
        static::$viewCallbacks['resetPassword'] = $callback;
    }

    public static function confirmPasswordView(callable $callback): void
    {
        static::$viewCallbacks['confirmPassword'] = $callback;
    }

    public static function verifyEmailView(callable $callback): void
    {
        static::$viewCallbacks['verifyEmail'] = $callback;
    }

    public static function viewPrefix(string $prefix): void
    {
        $normalized = trim($prefix);

        if ($normalized === '') {
            static::$viewPrefix = '';

            return;
        }

        static::$viewPrefix = rtrim($normalized, '.').'.';
    }

    public static function renderLoginView(Request $request): Response
    {
        return static::render('login', $request);
    }

    public static function renderRegisterView(Request $request): Response
    {
        return static::render('register', $request);
    }

    public static function renderRequestPasswordResetLinkView(Request $request): Response
    {
        return static::render('requestPasswordResetLink', $request);
    }

    public static function renderResetPasswordView(Request $request): Response
    {
        return static::render('resetPassword', $request);
    }

    public static function renderConfirmPasswordView(Request $request): Response
    {
        return static::render('confirmPassword', $request);
    }

    public static function renderVerifyEmailView(Request $request): Response
    {
        return static::render('verifyEmail', $request);
    }

    public static function hasView(string $key): bool
    {
        return isset(static::$viewCallbacks[$key]) && is_callable(static::$viewCallbacks[$key]);
    }

    public static function ignoreRoutes(): void
    {
        static::$registersRoutes = false;
    }

    public static function shouldRegisterRoutes(): bool
    {
        return static::$registersRoutes;
    }

    protected static function render(string $key, Request $request): Response
    {
        $callback = static::$viewCallbacks[$key] ?? null;

        if (is_callable($callback)) {
            return value($callback, $request);
        }

        if (static::$viewPrefix !== '') {
            $view = static::$viewPrefix.$key;

            if (view()->exists($view)) {
                return response()->view($view, ['request' => $request]);
            }
        }

        throw new InvalidArgumentException("Fortify view [{$key}] has not been defined.");
    }
}
