const { createClient } = require("redis");
const client = createClient({
  url: "redis://redis:80",
});

client.on("error", (err) => console.error("Redis Client Error", err));

process.on("SIGTERM", async () => {
  await client.disconnect();
});

process.on("SIGINT", async () => {
  await client.disconnect();
});

class CacheHandler {
  flushToDisk;

  constructor(ctx) {
    if (ctx.flushToDisk) {
      this.flushToDisk = !!ctx.flushToDisk;
    }
    console.log(`Current mode: ${ctx.dev ? "development" : "non-development"}`);

    if (ctx.dev) {
      console.log(`Redis based cache does not work in development mode,`);
      console.log(
        `just like NextJS LRU cache and file system cache do not work in development mode.`
      );
    }

    if (ctx.maxMemoryCacheSize) {
      console.warn(
        "Redis cache handler ignores CacheHandlerContext.maxMemoryCacheSize"
      );
    }
    if (ctx.serverDistDir) {
      console.warn(
        "Redis cache handler ignores CacheHandlerContext.serverDistDir"
      );
    }
    if (ctx.fs) {
      console.warn("Redis cache handler ignores CacheHandlerContext.fs");
    }

    if (!ctx.dev) {
      this.initialize();
    }
  }

  async initialize() {
    if (!client?.isOpen) {
      client
        .connect()
        .then(() =>
          console.log("Redis cache handler connected to Redis server")
        )
        .catch(() => console.error("Unable to connect to Redis server"));
    }
  }

  async get(key) {
    console.log(`Redis get: ${key}`);

    try {
      const redisResponse = await client.get(key);
      if (redisResponse) {
        return JSON.parse(redisResponse);
      }
    } catch (e) {
      console.log(e);
    }
    console.log(`Redis no data found for key ${key}`);
    return null;
  }

  async set(key, data) {
    console.log(`Redis set: ${key}`);

    if (!this.flushToDisk) {
      console.log(`Redis flushToDisk is false, not storing data in Redis`);
      return;
    }

    if (data) {
      const cacheData = {
        value: data,
        lastModified: Date.now(),
      };

      await client.set(key, JSON.stringify(cacheData));
    } else {
      console.log(`Redis set: ${key} - no data to store`);
    }
  }
}

module.exports = CacheHandler;
