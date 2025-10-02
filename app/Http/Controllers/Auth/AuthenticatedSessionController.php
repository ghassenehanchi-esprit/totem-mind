<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Support\RememberCookieManager;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    public function __construct(
        protected RememberCookieManager $rememberCookieManager,
    ) {
    }

    /**
     * Display the login view.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('Auth/Login', [
            'status' => $request->session()->get('status'),
            'canResetPassword' => Route::has('password.request'),
            'canRegister' => Route::has('register'),
            'socialProviders' => config('services.socialite.providers', []),
            'socialError' => $request->session()->pull('socialite_error'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $this->rememberCookieManager->forgetDefaultRecaller();

        $user = $request->user();

        if ($request->boolean('remember') && $user !== null) {
            $this->rememberCookieManager->rememberUser($user);
        } else {
            $this->rememberCookieManager->forgetCookie($user);
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $user = Auth::guard('web')->user();

        $this->rememberCookieManager->forgetCookie($user);
        $this->rememberCookieManager->forgetDefaultRecaller();

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
