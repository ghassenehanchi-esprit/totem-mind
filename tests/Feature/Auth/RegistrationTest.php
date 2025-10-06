<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\VerifyEmail;
use App\Notifications\WelcomeNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
            ], 200),
        ]);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
            'password' => 'password',
            'password_confirmation' => 'password',
            'captcha_token' => 'test-token',
        ]);

        $response->assertRedirect(route('register.complete'));
        $this->assertGuest();

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
        ]);
    }

    public function test_welcome_notification_is_sent_to_new_users(): void
    {
        Notification::fake();

        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
            ], 200),
        ]);

        $this->post('/register', [
            'name' => 'Welcome User',
            'email' => 'welcome@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
            'password' => 'password',
            'password_confirmation' => 'password',
            'captcha_token' => 'test-token',
        ]);

        $user = User::query()->firstWhere('email', 'welcome@example.com');

        $this->assertNotNull($user);

        Notification::assertSentToTimes($user, WelcomeNotification::class, 1);
        Notification::assertSentToTimes($user, VerifyEmail::class, 1);
    }

    public function test_registration_is_limited_to_one_attempt_per_ip_by_default(): void
    {
        Http::fake([
            'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                'success' => true,
            ], 200),
        ]);

        $firstResponse = $this->post('/register', [
            'name' => 'First User',
            'email' => 'first@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
            'password' => 'password',
            'password_confirmation' => 'password',
            'captcha_token' => 'test-token',
        ]);

        $firstResponse->assertRedirect(route('register.complete'));

        $secondResponse = $this->post('/register', [
            'name' => 'Second User',
            'email' => 'second@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
            'password' => 'password',
            'password_confirmation' => 'password',
            'captcha_token' => 'test-token',
        ]);

        $secondResponse->assertStatus(422);
        $secondResponse->assertSessionHasErrors('email');

        $this->assertDatabaseMissing('users', [
            'email' => 'second@example.com',
        ]);
    }
}
