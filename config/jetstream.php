<?php

return [
    'stack' => env('JETSTREAM_STACK', 'inertia'),

    'middleware' => ['web'],

    'features' => [
        'profile-photos' => false,
        'account-deletion' => false,
    ],

    'profile_photo_disk' => env('JETSTREAM_PROFILE_PHOTO_DISK', 'public'),

    'profile_photo_path' => env('JETSTREAM_PROFILE_PHOTO_PATH', 'profile-photos'),

    'guard' => env('JETSTREAM_GUARD', 'web'),
];
