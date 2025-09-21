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

    /**
     * Indicates if Jetstream should register its default routes.
     */
    public static bool $registersRoutes = true;

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
        [$found, $value] = static::featureEntry($feature);

        if (! $found) {
            return false;
        }

        return match (true) {
            is_bool($value) => $value,
            is_array($value) => true,
            $value === null => false,
            default => (bool) $value,
        };
    }

    public static function feature(string $feature, mixed $default = null): mixed
    {
        [$found, $value] = static::featureEntry($feature);

        if (! $found) {
            return $default;
        }

        return $value ?? $default;
    }

    public static function hasTermsAndPrivacyPolicyFeature(): bool
    {
        return static::hasFeature('terms-and-privacy-policy');
    }

    public static function hasProfilePhotoFeatures(): bool
    {
        return static::hasFeature('profile-photos');
    }

    public static function hasApiFeatures(): bool
    {
        return static::hasFeature('api');
    }

    public static function hasAccountDeletionFeatures(): bool
    {
        return static::hasFeature('account-deletion');
    }

    public static function hasTeamFeatures(): bool
    {
        return static::hasFeature('teams');
    }

    public static function ignoreRoutes(): void
    {
        static::$registersRoutes = false;
    }

    public static function shouldRegisterRoutes(): bool
    {
        return static::$registersRoutes;
    }

    /**
     * Locate a feature entry in the configuration.
     */
    protected static function featureEntry(string $feature): array
    {
        $features = config('jetstream.features', []);

        if (array_key_exists($feature, $features)) {
            return [true, $features[$feature]];
        }

        foreach ($features as $value) {
            if ($value === $feature) {
                return [true, true];
            }

            if (is_array($value) && array_key_exists($feature, $value)) {
                return [true, $value[$feature]];
            }
        }

        return [false, null];

    }

    /**
     * Locate a feature entry in the configuration.
     */
    protected static function featureEntry(string $feature): array
    {
        $features = config('jetstream.features', []);

        if (array_key_exists($feature, $features)) {
            return [true, $features[$feature]];
        }

        foreach ($features as $value) {
            if ($value === $feature) {
                return [true, true];
            }

            if (is_array($value) && array_key_exists($feature, $value)) {
                return [true, $value[$feature]];
            }
        }

        return [false, null];
    }



}
