<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\Controller;
use App\Support\FortifyLimiter;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;
use Inertia\Response;
use Laravel\Fortify\Fortify;

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
        return Fortify::renderRegisterView($request);
    }

    /**
     * Handle an incoming registration request.
     */
    public function store(Request $request): RedirectResponse
    {
        $this->ensureIsNotRateLimited($request);

        $key = $this->registerThrottleKey($request);
        $decay = FortifyLimiter::decaySeconds('register', 3, 5);

        RateLimiter::hit($key, $decay);

        $user = $this->creator->create($request->all());

        RateLimiter::clear($key);

        event(new Registered($user));

        return redirect()->route('register.complete');
    }

    protected function ensureIsNotRateLimited(Request $request): void
    {
        $key = $this->registerThrottleKey($request);
        $maxAttempts = FortifyLimiter::maxAttempts('register', 3, 5);

        if (! RateLimiter::tooManyAttempts($key, $maxAttempts)) {
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
}
