<?php

namespace App\Notifications;

use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class WelcomeNotification extends Notification
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
            ->subject(trans('emails.welcome.subject'))
            ->line(trans('emails.welcome.intro'))
            ->line(trans('emails.welcome.instruction'))
            ->action(trans('emails.welcome.cta'), route('login'))
            ->line(trans('emails.welcome.details'))
            ->salutation(trans('emails.welcome.salutation')."\n".trans('emails.welcome.signature'));
    }
}
