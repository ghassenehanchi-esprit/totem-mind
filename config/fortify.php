<?php

return [
    'guard' => 'web',

    'home' => '/dashboard',

    'middleware' => ['web'],

    'limiters' => [
        'login' => 'login',
        'register' => 'register',
    ],

    'throttle' => [
        'login' => [
            'key' => 'login',
            'max_attempts' => env('FORTIFY_LOGIN_MAX_ATTEMPTS', 5),
            'decay_minutes' => env('FORTIFY_LOGIN_DECAY_MINUTES', 1),
        ],

        'register' => [
            'key' => 'register',
            'max_attempts' => env('FORTIFY_REGISTER_MAX_ATTEMPTS', 3),
            'decay_minutes' => env('FORTIFY_REGISTER_DECAY_MINUTES', 5),
        ],
    ],

    'features' => [
        'email-verification',
    ],
];
