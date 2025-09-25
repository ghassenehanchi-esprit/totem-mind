<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as ResetPasswordNotification;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPassword extends ResetPasswordNotification
{
    /**
     * Build the mail representation of the notification.
     */
    protected function buildMailMessage($url): MailMessage
    {
        return (new MailMessage())
            ->subject(trans('emails.password_reset_request.subject'))
            ->greeting(trans('emails.password_reset_request.greeting'))
            ->line(trans('emails.password_reset_request.intro'))
            ->line(trans('emails.password_reset_request.instruction'))
            ->action(trans('emails.password_reset_request.cta'), $url)
            ->salutation(trans('emails.password_reset_request.salutation')."\n".trans('emails.password_reset_request.signature'));
    }
}
