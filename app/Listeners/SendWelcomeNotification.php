<?php

namespace App\Listeners;

use App\Notifications\WelcomeNotification;
use Illuminate\Auth\Events\Verified;

class SendWelcomeNotification
{
    /**
     * Handle the event.
     */
    public function handle(Verified $event): void
    {
        $event->user->notify(new WelcomeNotification());
    }
}
