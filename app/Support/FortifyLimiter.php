<?php

namespace App\Support;

class FortifyLimiter
{
    /**
     * @var array<string, array{key: string, max_attempts: int, decay_minutes: int}>
     */
    protected static array $cache = [];

    public static function resolve(string $name, int $defaultAttempts, int $defaultDecayMinutes): array
    {
        $cacheKey = implode(':', [$name, $defaultAttempts, $defaultDecayMinutes]);

        if (isset(static::$cache[$cacheKey])) {
            return static::$cache[$cacheKey];
        }

        $config = config("fortify.limiters.{$name}");

        if (is_array($config)) {
            return static::$cache[$cacheKey] = [
                'key' => static::stringValue($config['key'] ?? $name, $name),
                'max_attempts' => static::intValue($config['max_attempts'] ?? $defaultAttempts, $defaultAttempts),
                'decay_minutes' => static::intValue($config['decay_minutes'] ?? $defaultDecayMinutes, $defaultDecayMinutes),
            ];
        }

        if (is_string($config) && $config !== '') {
            return static::$cache[$cacheKey] = [
                'key' => $config,
                'max_attempts' => $defaultAttempts,
                'decay_minutes' => $defaultDecayMinutes,
            ];
        }

        return static::$cache[$cacheKey] = [
            'key' => $name,
            'max_attempts' => $defaultAttempts,
            'decay_minutes' => $defaultDecayMinutes,
        ];
    }

    public static function key(string $name, int $defaultAttempts, int $defaultDecayMinutes): string
    {
        return static::resolve($name, $defaultAttempts, $defaultDecayMinutes)['key'];
    }

    public static function decaySeconds(string $name, int $defaultAttempts, int $defaultDecayMinutes): int
    {
        $minutes = static::resolve($name, $defaultAttempts, $defaultDecayMinutes)['decay_minutes'];

        return max(1, $minutes) * 60;
    }

    public static function maxAttempts(string $name, int $defaultAttempts, int $defaultDecayMinutes): int
    {
        return static::resolve($name, $defaultAttempts, $defaultDecayMinutes)['max_attempts'];
    }

    protected static function intValue(mixed $value, int $default, int $min = 1): int
    {
        if (is_numeric($value)) {
            $intValue = (int) $value;
        } else {
            $intValue = $default;
        }

        return max($min, $intValue);
    }

    protected static function stringValue(mixed $value, string $default): string
    {
        if (is_string($value) && $value !== '') {
            return $value;
        }

        return $default;
    }
}
