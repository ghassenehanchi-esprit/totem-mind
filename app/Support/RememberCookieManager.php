<?php

namespace App\Support;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use JsonException;

class RememberCookieManager
{
    /**
     * Create a fresh persistent login cookie for the given user.
     */
    public function rememberUser(Authenticatable $user): void
    {
        $plainToken = Str::random(64);

        $user->setRememberToken(Hash::make($plainToken));

        if (method_exists($user, 'save')) {
            $user->save();
        }

        $payload = json_encode([
            'id' => $user->getAuthIdentifier(),
            'token' => $plainToken,
        ], JSON_THROW_ON_ERROR);

        $this->queueCookie(Crypt::encryptString($payload));

        $this->forgetDefaultRecaller();
    }

    /**
     * Attempt to authenticate the current request using the remember cookie.
     */
    public function authenticateFromCookie(Request $request): bool
    {
        if (Auth::check()) {
            return true;
        }

        $cookie = $request->cookie($this->cookieName());

        if ($cookie === null) {
            return false;
        }

        try {
            $payload = json_decode(
                Crypt::decryptString($cookie),
                true,
                512,
                JSON_THROW_ON_ERROR
            );
        } catch (DecryptException|JsonException) {
            $this->forgetCookie();

            return false;
        }

        if (! is_array($payload) || ! isset($payload['id'], $payload['token'])) {
            $this->forgetCookie();

            return false;
        }

        $provider = Auth::getProvider();

        if ($provider === null) {
            $this->forgetCookie();

            return false;
        }

        $user = $provider->retrieveById($payload['id']);

        if ($user === null) {
            $this->forgetCookie();

            return false;
        }

        $storedToken = $user->getRememberToken();

        if (! is_string($storedToken) || $storedToken === '' || ! Hash::check($payload['token'], $storedToken)) {
            $this->forgetCookie($user);

            return false;
        }

        Auth::login($user);

        $this->rememberUser($user);

        return true;
    }

    /**
     * Forget the custom remember cookie and stored token.
     */
    public function forgetCookie(?Authenticatable $user = null): void
    {
        if ($user !== null) {
            $user->setRememberToken(null);

            if (method_exists($user, 'save')) {
                $user->save();
            }
        }

        $cookieName = $this->cookieName();

        Cookie::queue(Cookie::forget($cookieName, $this->cookiePath(), $this->cookieDomain()));

        $this->forgetDefaultRecaller();
    }

    /**
     * Remove Laravel's default recaller cookie if present.
     */
    public function forgetDefaultRecaller(): void
    {
        $guard = Auth::guard();

        if (method_exists($guard, 'getRecallerName')) {
            Cookie::queue(Cookie::forget($guard->getRecallerName(), $this->cookiePath(), $this->cookieDomain()));
        }
    }

    /**
     * Queue the secure remember cookie.
     */
    protected function queueCookie(string $value): void
    {
        $config = config('auth.remember.cookie');

        $minutes = (int) ($config['lifetime'] ?? (60 * 24 * 30));
        $path = $this->cookiePath();
        $domain = $this->cookieDomain();
        $secure = $this->booleanValue($config['secure'] ?? true, true);
        $httpOnly = $this->booleanValue($config['http_only'] ?? true, true);
        $sameSite = $config['same_site'] ?? config('session.same_site');

        Cookie::queue(
            Cookie::make(
                $this->cookieName(),
                $value,
                $minutes,
                $path,
                $domain,
                $secure,
                $httpOnly,
                false,
                $sameSite
            )
        );
    }

    protected function cookieName(): string
    {
        return (string) (config('auth.remember.cookie.name') ?? 'totem_remember');
    }

    protected function cookiePath(): string
    {
        return (string) (config('auth.remember.cookie.path') ?? config('session.path', '/'));
    }

    protected function cookieDomain(): ?string
    {
        return config('auth.remember.cookie.domain') ?? config('session.domain');
    }

    protected function booleanValue(mixed $value, bool $default): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        $evaluated = filter_var($value, FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE);

        return $evaluated ?? $default;
    }
}

