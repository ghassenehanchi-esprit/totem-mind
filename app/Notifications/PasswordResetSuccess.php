<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PasswordResetSuccess extends Notification
{
    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage())
            ->subject(trans('emails.password_reset_confirmation.subject'))
            ->greeting(trans('emails.password_reset_confirmation.greeting'))
            ->line(trans('emails.password_reset_confirmation.intro'))
            ->line(trans('emails.password_reset_confirmation.instruction'))
            ->action(trans('emails.password_reset_confirmation.cta'), route('login'))
            ->salutation(trans('emails.password_reset_confirmation.salutation')."\n".trans('emails.password_reset_confirmation.signature'));
    }
}
