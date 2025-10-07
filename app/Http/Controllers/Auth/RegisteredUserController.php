<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Auth\CreateNewUser;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Notifications\WelcomeNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(private CreateNewUser $creator)
    {
    }

    /**
     * Display the registration view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Register', [
            'socialProviders' => config('services.socialite.providers', []),
        ]);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $this->ensureIsNotRateLimited($request);
        $this->ensureRegistrationIpIsUnique($request);

        $key = $this->registerThrottleKey($request);
        $decayMinutes = (int) config('auth.throttle.register.decay_minutes', 5);

        RateLimiter::hit($key, max(1, $decayMinutes) * 60);

        $user = $this->creator->create(array_merge($request->all(), [
            'registration_ip' => $request->ip(),
        ]));

        RateLimiter::clear($key);

        $user->sendEmailVerificationNotification();
        $user->notify(new WelcomeNotification());

        event(new Registered($user));

        return redirect()->route('register.complete');
    }

    protected function ensureIsNotRateLimited(Request $request): void
    {
        $key = $this->registerThrottleKey($request);
        $maxAttempts = (int) config('auth.throttle.register.max_attempts', 3);

        if (! RateLimiter::tooManyAttempts($key, max(1, $maxAttempts))) {
            return;
        }

        $seconds = RateLimiter::availableIn($key);

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => (int) ceil($seconds / 60),
            ]),
        ]);
    }

    protected function registerThrottleKey(Request $request): string
    {
        return 'register|'.$request->ip();
    }

    protected function ensureRegistrationIpIsUnique(Request $request): void
    {
        $ip = $request->ip();

        if ($ip === null) {
            return;
        }

        $alreadyRegistered = User::query()
            ->where('registration_ip', $ip)
            ->exists();

        if (! $alreadyRegistered) {
            return;
        }

        throw ValidationException::withMessages([
            'email' => __('Les inscriptions multiples depuis la même adresse IP ne sont pas autorisées.'),
        ]);
    }
}
