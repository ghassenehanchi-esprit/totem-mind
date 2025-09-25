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
        $data = [
            'subject' => trans('emails.validation.subject'),
            'greeting' => trans('emails.validation.greeting'),
            'lines' => [
                trans('emails.validation.intro'),
                trans('emails.validation.instruction'),
            ],
            'cta' => [
                'label' => trans('emails.validation.cta'),
                'url' => $url,
            ],
            'salutation' => trans('emails.validation.salutation'),
            'signature' => trans('emails.validation.signature'),
        ];

        return (new MailMessage())
            ->subject($data['subject'])
            ->view('emails.brand', $data);
    }
}
