import redisStore from 'cache-manager-redis-store';

interface RedisConfig {
  max: number;
  ttl: number;
  store: any;
  host: string;
  port: number;
  auth_pass: string;
}

export function getRedisConfig(): RedisConfig {
  return {
    max: Number(process.env.REDIS_CACHE_MAX),
    ttl: Number(process.env.REDIS_CACHE_TTL),
    store: redisStore,
    host: process.env.REDIS_HOST || '',
    port: Number(process.env.REDIS_PORT),
    auth_pass: process.env.REDIS_PASSWORD || '',
  };
}
