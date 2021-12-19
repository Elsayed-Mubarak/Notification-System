import * as redis from 'redis';
import Config from '../../config'

import Log from '../../utils/Log';
import Logger from '../../utils/Logger';


/**
 * Exposes part of the node-redis client api. Designed to store objects instead
 * of primitive types.
 *
 * You must call connect() before calling any other methods.  The client is connected
 * and ready to issue commands to Redis once isReady returns true.  Be sure to
 * close the connection by calling disconnect() when you no longer wish to issue
 * commands.
 */
export default class RedisClient {
  public client: redis.RedisClient;
  private options: redis.ClientOpts = {
    host: (process.env.NODE_ENV == 'production') ? Config.RedisHost : "127.0.0.1",
    port: +Config.REDIS_PORT! || 6379,
    retry_strategy: function (options) {
      console.log('ECONNREFUSED', options.attempt ,'\n\n\n\n\n\n\n');
      if (options.error && options.error.code === "ECONNREFUSED") {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error("The server refused the connection");
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error("Retry time exhausted");
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    },
  };
  private _isConnected: boolean = false;
  private _isReady: boolean = false;


  /**
   * Create a client that will connect to the Redis instance specified in the
   * options. You must call connect() before issuing commands.
   *
   * @constructor
   * @param {Redis.ClientOpts} options Options is passed directly to the createClient()
   * method of redis-node. See https://github.com/NodeRedis/node_redis#rediscreateclient.
   */
  constructor() {
    this.client = this.createRedisClient();
  }

  /**
   * If true, then the client is ready to issue commands to Redis. If any methods
   * are called before this is true, they will either be queue or dropped if the
   * client hasn't finished connecting.
   */
  public get isReady(): boolean {
    return this._isReady;
  }

  public get isConnected(): boolean {
    return this._isConnected;
  }

  /**
   * Establish a connection to the Redis service specified in options. The promise
   * is settled once the stream is connected to the server.
   *
   * Calling this method multiple times is OK, but it must be called once before
   * calling other methods.
   *
   * @returns {Promise<boolean>}
   */

  public createRedisClient(): redis.RedisClient {
    this.client = redis.createClient(this.options);
    this.client.on('error', (err: any) => {
      Log.error(`RedisClient::connect() - ERROR  ${err.message}`);
      Logger.error(`RedisClient::connect() - ERROR  ${err.message}`);
    });
    this.client.on('ready', () => {
      Log.info('RedisClient::connect() - ready');
      this._isReady = true;
    });
    this.client.on('connect', () => {
      Log.info('RedisClient::connect() - connected');
      this._isConnected = true;
    });

    return this.client;
  }

  /**
   * Close the connection to the server. The promise settles when the established
   * Redis server connection has closed.
   *
   * @returns {Promise<boolean>}
   */
  public async disconnect(): Promise<boolean> {
    if (!this._isConnected)
      return Promise.resolve(true);

    return new Promise<boolean>((fulfill, reject) => {
      try {
        this.client.quit();
        this.client.on('end', () => {
          fulfill(true);
        });
      } catch (err: any) {
        Log.error(`RedisClient::disconnect() - ERROR  + ${err.message}`);
        Logger.error(`RedisClient::disconnect() - ERROR  + ${err.message}`);
        reject(err);
      }
    });
  }


  /**
   * Assigns the value to the key. If the key exists, its value is overwritten.
   *
   * @param {string} key The new key.
   * @param {Object} value The value to associate with the key.
   * @returns {Promise<boolean>}
   */
  public async set(key: string, value: any, result: any): Promise<boolean> {
    if (!this._isConnected) {
      Log.error('RedisClient::set() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<boolean>((fulfill, reject) => {
      this.client.hset(key, value, result, (err, reply) => {
        if (err)
          reject(err);
        else if (reply)
          fulfill(true);
        else
          reject(new Error('Failed to set value of key ' + key));
      });
    });
  }

  public async setExpire(key: string, expire: number): Promise<boolean> {
    if (!this._isConnected) {
      Log.error('RedisClient::set() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<boolean>((fulfill, reject) => {
      this.client.expire(key, expire, (err, reply) => {
        if (err)
          reject(err);
        else if (reply)
          fulfill(true);
        else
          reject(new Error('Failed to set expiration of key ' + key));
      });
    });
  }

  /**
   * Returns the value associated with key as a string or object.
   *
   * @param {string} key The key for the value to return.
   * @returns {Promise<any>}
   */
  public async get(key: string): Promise<any> {
    if (!this._isConnected) {
      Log.error('RedisClient::get() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<any>((fulfill, reject) => {
      this.client.hgetall(key, (err: any, reply: any) => {
        if (err)
          reject(err);
        else if (reply)
          fulfill(reply);
        else
          reject('Key ' + key + ' does not exist.');
      });
    });
  }

  public async hget(hashKey: string, key: string): Promise<string | null> {
    if (!this._isConnected) {
      Log.error('RedisClient::get() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<string>((fulfill, reject) => {
      this.client.hget(hashKey, key, (err, val) => {
        if (err) reject(err);
        else if (val) fulfill(val);
        else fulfill('');
      });
    });
  }

  /**
   * Deletes the specified key-value pair. If more than one key is given, the number
   * of keys successfully deleted is returned.
   *
   * @param {string|string[]} key The key for the key-value pair to delete.
   * @returns {Promise<number>}
   */
  public async del(key: string | string[]): Promise<number> {
    if (!this._isConnected) {
      Log.error('RedisClient::del() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<number>((fulfill, reject) => {
      this.client.del(key, (err, reply) => {
        if (err)
          reject(err);
        else if (reply)
          fulfill(+reply);
        else
          reject('Failed to delete key ' + key);
      });
    });
  }


  /**
   * Checks existence of the specified key. If multiple keys are given, then number
   * of keys that exist is returned.
   *
   * @param {string|string[]} key The key to check existence of.
   * @returns {Promise<boolean}
   */
  public async exists(key: string | string[]): Promise<number> {
    if (!this._isConnected) {
      Log.error('RedisClient::exists() - ERROR Client not connected.');
      throw new Error('Client not connected');
    }
    return new Promise<number>((fulfill, reject) => {
      this.client.exists(key, (err, reply) => {
        if (err)
          reject(err);
        else
          fulfill(+reply);
      });
    });
  }


}
