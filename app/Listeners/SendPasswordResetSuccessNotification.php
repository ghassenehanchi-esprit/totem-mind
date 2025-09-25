<?php

namespace App\Listeners;

use App\Notifications\PasswordResetSuccess;
use Illuminate\Auth\Events\PasswordReset;

class SendPasswordResetSuccessNotification
{
    /**
     * Handle the event.
     */
    public function handle(PasswordReset $event): void
    {
        $event->user->notify(new PasswordResetSuccess());
    }
}
