<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
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
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
            'password' => 'password',
            'password_confirmation' => 'password',
            'captcha' => true,
        ]);

        $response->assertRedirect(route('register.complete'));
        $this->assertGuest();

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'birthdate' => now()->subYears(20)->toDateString(),
        ]);
    }
}
