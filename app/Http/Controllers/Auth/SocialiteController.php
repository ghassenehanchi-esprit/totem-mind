<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\WelcomeNotification;
use App\Support\RememberCookieManager;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Contracts\User as ProviderUser;
use Laravel\Socialite\Facades\Socialite;
use Throwable;

class SocialiteController extends Controller
{
    /**
     * @param  list<string>  $supportedProviders
     */
    public function __construct(
        protected RememberCookieManager $rememberCookieManager,
        protected array $supportedProviders = [],
    ) {
        $configuredProviders = array_values((array) config('services.socialite.providers', []));

        $this->supportedProviders = $supportedProviders !== []
            ? array_values($supportedProviders)
            : $configuredProviders;
    }

    public function redirect(string $provider): RedirectResponse
    {
        $this->ensureProviderIsSupported($provider);

        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request, string $provider): RedirectResponse
    {
        $this->ensureProviderIsSupported($provider);

        try {
            $providerUser = Socialite::driver($provider)->stateless()->user();
        } catch (Throwable $exception) {
            Log::warning('Socialite callback failed', [
                'provider' => $provider,
                'message' => $exception->getMessage(),
                'exception' => $exception,
            ]);

            return $this->failedRedirect($provider);
        }

        $user = $this->findOrCreateUser($providerUser, $provider);

        Auth::login($user);

        $request->session()->regenerate();

        $this->rememberCookieManager->forgetDefaultRecaller();

        return redirect()->intended(route('dashboard'));
    }

    protected function ensureProviderIsSupported(string $provider): void
    {
        if (! in_array($provider, $this->supportedProviders, true)) {
            abort(404);
        }
    }

    protected function findOrCreateUser(ProviderUser $providerUser, string $provider): User
    {
        $email = $providerUser->getEmail();
        $providerId = (string) $providerUser->getId();

        $user = User::query()
            ->where('provider_name', $provider)
            ->where('provider_id', $providerId)
            ->first();

        if (! $user && $email) {
            $user = User::query()->where('email', strtolower($email))->first();
        }

        $attributes = [
            'name' => $this->resolveName($providerUser, $provider),
            'provider_name' => $provider,
            'provider_id' => $providerId,
            'avatar_url' => $providerUser->getAvatar(),
        ];

        if ($user) {
            $user->forceFill($attributes);

            if ($email) {
                $user->forceFill(['email' => strtolower($email)]);

                if (! $user->hasVerifiedEmail()) {
                    $user->markEmailAsVerified();
                }
            }

            $user->save();

            return $user;
        }

        $email = $email ? strtolower($email) : $this->generateFallbackEmail($provider, $providerId);

        $user = User::create([
            'name' => $attributes['name'],
            'email' => $email,
            'birthdate' => now()->subYears(18)->toDateString(),
            'password' => Hash::make(Str::random(40)),
            'provider_name' => $provider,
            'provider_id' => $providerId,
            'avatar_url' => $attributes['avatar_url'],
        ]);

        if ($providerUser->getEmail()) {
            $user->markEmailAsVerified();
        }

        if (! $user->hasVerifiedEmail()) {
            $user->sendEmailVerificationNotification();
        }

        $user->notify(new WelcomeNotification());

        event(new Registered($user));

        return $user;
    }

    protected function failedRedirect(string $provider): RedirectResponse
    {
        $message = trans('auth.socialite_error', [
            'provider' => ucfirst($provider),
        ]);

        return redirect()
            ->route('login')
            ->with('socialite_error', $message);
    }

    protected function resolveName(ProviderUser $providerUser, string $provider): string
    {
        $name = $providerUser->getName() ?: $providerUser->getNickname();

        if (is_string($name) && trim($name) !== '') {
            return $name;
        }

        $email = $providerUser->getEmail();

        if (is_string($email) && trim($email) !== '') {
            return Str::before($email, '@');
        }

        return ucfirst($provider).' User';
    }

    protected function generateFallbackEmail(string $provider, string $providerId): string
    {
        return Str::lower(sprintf('%s_%s@social-login.local', $provider, $providerId));
    }
}
