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
        $data = [
            'subject' => trans('emails.welcome.subject'),
            'lines' => [
                trans('emails.welcome.intro'),
                trans('emails.welcome.instruction'),
                trans('emails.welcome.details'),
            ],
            'cta' => [
                'label' => trans('emails.welcome.cta'),
                'url' => route('login'),
            ],
            'salutation' => trans('emails.welcome.salutation'),
            'signature' => trans('emails.welcome.signature'),
        ];

        return (new MailMessage())
            ->subject($data['subject'])
            ->view('emails.brand', $data);
    }
}
