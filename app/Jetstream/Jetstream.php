<?php

namespace Laravel\Jetstream;

use Illuminate\Support\Arr;
use Laravel\Fortify\Fortify;

class Jetstream
{
    /**
     * The current stack Jetstream should use.
     */
    protected static string $stack = 'livewire';

    public static function useInertia(): void
    {
        static::$stack = 'inertia';

        config(['jetstream.stack' => 'inertia']);
    }

    public static function stack(): string
    {
        return static::$stack;
    }

    public static function loginView(callable $callback): void
    {
        Fortify::loginView($callback);
    }

    public static function registerView(callable $callback): void
    {
        Fortify::registerView($callback);
    }

    public static function requestPasswordResetLinkView(callable $callback): void
    {
        Fortify::requestPasswordResetLinkView($callback);
    }

    public static function resetPasswordView(callable $callback): void
    {
        Fortify::resetPasswordView($callback);
    }

    public static function confirmPasswordView(callable $callback): void
    {
        Fortify::confirmPasswordView($callback);
    }

    public static function verifyEmailView(callable $callback): void
    {
        Fortify::verifyEmailView($callback);
    }

    public static function defaultApiTokenPermissions(array $permissions): void
    {
        config(['jetstream.permissions.default' => $permissions]);
    }

    public static function permissions(array $permissions): void
    {
        config(['jetstream.permissions.available' => $permissions]);
    }

    public static function hasFeature(string $feature): bool
    {
        return in_array($feature, config('jetstream.features', []), true);
    }

    public static function feature(string $feature, mixed $default = null): mixed
    {
        return Arr::get(config('jetstream.features', []), $feature, $default);
    }
}
