const { IncrementalCache } = require("@neshca/cache-handler");
const createRedisCache = require("@neshca/cache-handler/redis-strings").default;
const { createClient } = require("redis");

const client = createClient({
  url: "redis://redis:80",
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
    useFileSystem: true, // Dans l'attente de la résolution du bug : https://github.com/vercel/next.js/issues/58094
  };
});

module.exports = IncrementalCache;
