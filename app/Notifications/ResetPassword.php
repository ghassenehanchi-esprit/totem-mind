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
        $data = [
            'subject' => trans('emails.password_reset_request.subject'),
            'greeting' => trans('emails.password_reset_request.greeting'),
            'lines' => [
                trans('emails.password_reset_request.intro'),
                trans('emails.password_reset_request.instruction'),
            ],
            'cta' => [
                'label' => trans('emails.password_reset_request.cta'),
                'url' => $url,
            ],
            'salutation' => trans('emails.password_reset_request.salutation'),
            'signature' => trans('emails.password_reset_request.signature'),
        ];

        return (new MailMessage())
            ->subject($data['subject'])
            ->view('emails.brand', $data);
    }
}
