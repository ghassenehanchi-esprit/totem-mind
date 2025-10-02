<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('provider_name')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('avatar_url')->nullable();

            $table->unique(['provider_name', 'provider_id'], 'users_provider_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique('users_provider_unique');
            $table->dropColumn(['provider_name', 'provider_id', 'avatar_url']);
        });
    }
};
