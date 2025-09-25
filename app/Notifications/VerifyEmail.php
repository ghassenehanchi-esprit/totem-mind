<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as VerifyEmailNotification;
use Illuminate\Notifications\Messages\MailMessage;

class VerifyEmail extends VerifyEmailNotification
{
    /**
     * Build the mail representation of the notification.
     */
    protected function buildMailMessage($url): MailMessage
    {
        return (new MailMessage())
            ->subject(trans('emails.validation.subject'))
            ->greeting(trans('emails.validation.greeting'))
            ->line(trans('emails.validation.intro'))
            ->line(trans('emails.validation.instruction'))
            ->action(trans('emails.validation.cta'), $url)
            ->salutation(trans('emails.validation.salutation')."\n".trans('emails.validation.signature'));
    }
}
