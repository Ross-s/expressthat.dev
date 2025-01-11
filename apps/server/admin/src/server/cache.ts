import { createStorage, prefixStorage, Storage, StorageValue } from "unstorage";
import redisDriver from "unstorage/drivers/redis";

const globalForCache = globalThis as unknown as { cache:  Storage<StorageValue>}

export const cache = globalForCache.cache || createStorage({
    driver: redisDriver({
      base: "unstorage",
      host: process.env.REDIS_IP,
      port: 6379,
    }),
  })
 
if (process.env.NODE_ENV !== "production") globalForCache.cache = cache;