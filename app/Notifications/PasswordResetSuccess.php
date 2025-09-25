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
        $data = [
            'subject' => trans('emails.password_reset_confirmation.subject'),
            'greeting' => trans('emails.password_reset_confirmation.greeting'),
            'lines' => [
                trans('emails.password_reset_confirmation.intro'),
                trans('emails.password_reset_confirmation.instruction'),
            ],
            'cta' => [
                'label' => trans('emails.password_reset_confirmation.cta'),
                'url' => route('login'),
            ],
            'salutation' => trans('emails.password_reset_confirmation.salutation'),
            'signature' => trans('emails.password_reset_confirmation.signature'),
        ];

        return (new MailMessage())
            ->subject($data['subject'])
            ->view('emails.brand', $data);
    }
}
