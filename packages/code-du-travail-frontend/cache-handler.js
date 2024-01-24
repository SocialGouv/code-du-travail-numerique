const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-strings").default;
const { createClient } = require("redis");

const client = createClient({
  url: process.env.NEXT_PUBLIC_REDIS_URL ?? "redis://localhost:6379",
});

client.on("error", (error) => {
  console.error("Redis error:", error);
});

IncrementalCache.onCreation(async () => {
  await client.connect();

  const redisCache = await createRedisCache({
    client,
    useTtl: true,
    timeoutMs: 2000,
  });

  return {
    cache: [redisCache],
    useFileSystem: false,
  };
});

module.exports = IncrementalCache;
