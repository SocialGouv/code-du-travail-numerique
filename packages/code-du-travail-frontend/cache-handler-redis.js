const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-stack").default;
const createLruCache = require("@neshca/cache-handler/local-lru").default;
const { createClient } = require("redis");

const client = createClient({
  url: process.env.NEXT_PUBLIC_REDIS_URL ?? "redis://localhost:6379",
});

client.on("error", (error) => {
  console.error("Redis error:", error.message);
});

IncrementalCache.onCreation(async () => {
  // read more about TTL limitations https://caching-tools.github.io/next-shared-cache/configuration/ttl
  const useTtl = true;

  await client.connect();

  const redisCache = await createRedisCache({
    client,
    useTtl,
  });

  const localCache = createLruCache({
    useTtl,
  });

  return {
    cache: [redisCache, localCache],
    useFileSystem: !useTtl,
  };
});

module.exports = IncrementalCache;
