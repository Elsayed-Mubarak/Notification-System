"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RedisClient_1 = __importDefault(require("./RedisClient"));
/**
 * Provides access to the redis client via the singleton.
 */
var RedisManager = /** @class */ (function () {
    function RedisManager() {
    }
    Object.defineProperty(RedisManager, "client", {
        get: function () {
            return RedisSingleton.getInstance().client;
        },
        enumerable: false,
        configurable: true
    });
    return RedisManager;
}());
exports.default = RedisManager;
/**
 * Singleton to ensure there is only one connection to Redis.
 */
var RedisSingleton = /** @class */ (function () {
    function RedisSingleton() {
        this._client = new RedisClient_1.default();
    }
    RedisSingleton.getInstance = function () {
        if (!RedisSingleton._instance) {
            RedisSingleton._instance = new RedisSingleton();
        }
        return RedisSingleton._instance;
    };
    Object.defineProperty(RedisSingleton.prototype, "client", {
        /**
         * Provides access to the single instance of the redis client.
         */
        get: function () {
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    return RedisSingleton;
}());
