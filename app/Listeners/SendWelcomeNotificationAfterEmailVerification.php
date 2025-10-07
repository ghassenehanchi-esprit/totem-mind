<?php

namespace App\Listeners;

use App\Notifications\WelcomeNotification;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class SendWelcomeNotificationAfterEmailVerification
{
    public function handle(Verified $event): void
    {
        $user = $event->user;

        if (! $user instanceof MustVerifyEmail) {
            return;
        }

        $user->notify(new WelcomeNotification());
    }
}
