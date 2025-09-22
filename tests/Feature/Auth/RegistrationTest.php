<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
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

    public function test_new_users_can_register_with_recaptcha_v3(): void
    {
        $this->withRecaptchaConfig([
            'version' => 'v3',
            'score_threshold' => 0.5,
            'action' => 'register',
        ], function (): void {
            Http::fake([
                'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                    'success' => true,
                    'score' => 0.9,
                    'action' => 'register',
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
        });
    }

    public function test_registration_fails_when_recaptcha_v3_score_is_too_low(): void
    {
        $this->withRecaptchaConfig([
            'version' => 'v3',
            'score_threshold' => 0.8,
            'action' => 'register',
        ], function (): void {
            Http::fake([
                'https://www.google.com/recaptcha/api/siteverify' => Http::response([
                    'success' => true,
                    'score' => 0.3,
                    'action' => 'register',
                ], 200),
            ]);

            $response = $this->from('/register')->post('/register', [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'birthdate' => now()->subYears(20)->toDateString(),
                'password' => 'password',
                'password_confirmation' => 'password',
                'captcha_token' => 'test-token',
            ]);

            $response->assertRedirect('/register');
            $response->assertSessionHasErrors('captcha_token');
            $this->assertGuest();
        });
    }

    protected function withRecaptchaConfig(array $overrides, callable $callback): void
    {
        $originalVersion = config('services.recaptcha.version');
        $originalAction = config('services.recaptcha.action');
        $originalThreshold = config('services.recaptcha.score_threshold');

        config([
            'services.recaptcha.version' => $overrides['version'] ?? $originalVersion,
            'services.recaptcha.action' => $overrides['action'] ?? $originalAction,
            'services.recaptcha.score_threshold' => $overrides['score_threshold'] ?? $originalThreshold,
        ]);

        try {
            $callback();
        } finally {
            config([
                'services.recaptcha.version' => $originalVersion,
                'services.recaptcha.action' => $originalAction,
                'services.recaptcha.score_threshold' => $originalThreshold,
            ]);
        }
    }
}
