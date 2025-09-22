<?php

namespace App\Http\Middleware;

use App\Support\RememberCookieManager;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticateUsingRememberCookie
{
    public function __construct(
        protected RememberCookieManager $rememberCookieManager,
    ) {
    }

    public function handle(Request $request, Closure $next)
    {
        if (! Auth::check() && $this->rememberCookieManager->authenticateFromCookie($request) && $request->hasSession()) {
            $request->session()->regenerate();
        }

        return $next($request);
    }
}

