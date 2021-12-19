import mongoose from "mongoose";
import RedisManager from "../config/redis/RedisManager";
import Log from "../utils/Log";
type CacheOptions = { key?: string, expire: number };
const client = RedisManager.client;

const exec = mongoose.Query.prototype.exec;

// create new cache function on prototype
mongoose.Query.prototype.cache = function (options: CacheOptions = { expire: 1800, key: '' }) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
  this.expire = options.expire;
  return this; //make cache() chainable
};


// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    //NO CACHE

    return exec.apply(this);
  }
  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.collection.name,
  });

  try {
    const cacheValue = await client.hget(this.hashKey, key);

    // if cache value is not found, fetch data from mongodb and cache it
    if (!cacheValue) {
      const result = await exec.apply(this);
      client.set(this.hashKey, key, JSON.stringify(result));
      client.setExpire(this.hashKey, this.expire);
      Log.info('Return data from MongoDB')
      return result;
    }

    // return found cachedValue
    const doc = JSON.parse(cacheValue);
    Log.info('Return data from Redis')
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : doc;
  } catch (error: any) {
    Log.error(error);
  }
};

/**
 *
 * @param hashKey hashkey to remove
 */

const clearHash = (hashKey: string) => {
  client.del(JSON.stringify(hashKey));
};

export { clearHash };
