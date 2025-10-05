<?php

namespace App\Listeners;

use App\Notifications\WelcomeNotification;
use Illuminate\Auth\Events\Registered;

class SendWelcomeNotification
{
    /**
     * Handle the event.
     */
    public function handle(Registered $event): void
    {
        $event->user->notify(new WelcomeNotification());
    }
}
