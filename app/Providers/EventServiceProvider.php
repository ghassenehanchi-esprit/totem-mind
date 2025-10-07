<?php

namespace App\Providers;

use App\Listeners\SendPasswordResetSuccessNotification;
use App\Listeners\SendWelcomeNotificationAfterEmailVerification;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        Verified::class => [
            SendWelcomeNotificationAfterEmailVerification::class,
        ],
        PasswordReset::class => [
            SendPasswordResetSuccessNotification::class,
        ],
    ];
}
