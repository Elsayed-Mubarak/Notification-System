import RedisClient from "./RedisClient";

/**
 * Provides access to the redis client via the singleton.
 */
export default class RedisManager {
  public static get client(): RedisClient {
    return RedisSingleton.getInstance().client;
  }
}

/**
 * Singleton to ensure there is only one connection to Redis.
 */
class RedisSingleton {
  private static _instance: RedisSingleton;
  private _client: RedisClient;


  private constructor() {
    this._client = new RedisClient();
  }


  public static getInstance(): RedisSingleton {
    if (!RedisSingleton._instance) {
      RedisSingleton._instance = new RedisSingleton();
    }

    return RedisSingleton._instance;
  }


  /**
   * Provides access to the single instance of the redis client.
   */
  public get client(): RedisClient {
    return this._client;
  }
}
