"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis = __importStar(require("redis"));
var config_1 = __importDefault(require("../../config"));
var Log_1 = __importDefault(require("../../utils/Log"));
var Logger_1 = __importDefault(require("../../utils/Logger"));
/**
 * Exposes part of the node-redis client api. Designed to store objects instead
 * of primitive types.
 *
 * You must call connect() before calling any other methods.  The client is connected
 * and ready to issue commands to Redis once isReady returns true.  Be sure to
 * close the connection by calling disconnect() when you no longer wish to issue
 * commands.
 */
var RedisClient = /** @class */ (function () {
    /**
     * Create a client that will connect to the Redis instance specified in the
     * options. You must call connect() before issuing commands.
     *
     * @constructor
     * @param {Redis.ClientOpts} options Options is passed directly to the createClient()
     * method of redis-node. See https://github.com/NodeRedis/node_redis#rediscreateclient.
     */
    function RedisClient() {
        this.options = {
            host: (process.env.NODE_ENV == 'production') ? config_1.default.RedisHost : "127.0.0.1",
            port: +config_1.default.REDIS_PORT || 6379,
            retry_strategy: function (options) {
                console.log('ECONNREFUSED', options.attempt, '\n\n\n\n\n\n\n');
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
        this._isConnected = false;
        this._isReady = false;
        this.client = this.createRedisClient();
    }
    Object.defineProperty(RedisClient.prototype, "isReady", {
        /**
         * If true, then the client is ready to issue commands to Redis. If any methods
         * are called before this is true, they will either be queue or dropped if the
         * client hasn't finished connecting.
         */
        get: function () {
            return this._isReady;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RedisClient.prototype, "isConnected", {
        get: function () {
            return this._isConnected;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Establish a connection to the Redis service specified in options. The promise
     * is settled once the stream is connected to the server.
     *
     * Calling this method multiple times is OK, but it must be called once before
     * calling other methods.
     *
     * @returns {Promise<boolean>}
     */
    RedisClient.prototype.createRedisClient = function () {
        var _this = this;
        this.client = redis.createClient(this.options);
        this.client.on('error', function (err) {
            Log_1.default.error("RedisClient::connect() - ERROR  " + err.message);
            Logger_1.default.error("RedisClient::connect() - ERROR  " + err.message);
        });
        this.client.on('ready', function () {
            Log_1.default.info('RedisClient::connect() - ready');
            _this._isReady = true;
        });
        this.client.on('connect', function () {
            Log_1.default.info('RedisClient::connect() - connected');
            _this._isConnected = true;
        });
        return this.client;
    };
    /**
     * Close the connection to the server. The promise settles when the established
     * Redis server connection has closed.
     *
     * @returns {Promise<boolean>}
     */
    RedisClient.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected)
                    return [2 /*return*/, Promise.resolve(true)];
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        try {
                            _this.client.quit();
                            _this.client.on('end', function () {
                                fulfill(true);
                            });
                        }
                        catch (err) {
                            Log_1.default.error("RedisClient::disconnect() - ERROR  + " + err.message);
                            Logger_1.default.error("RedisClient::disconnect() - ERROR  + " + err.message);
                            reject(err);
                        }
                    })];
            });
        });
    };
    /**
     * Assigns the value to the key. If the key exists, its value is overwritten.
     *
     * @param {string} key The new key.
     * @param {Object} value The value to associate with the key.
     * @returns {Promise<boolean>}
     */
    RedisClient.prototype.set = function (key, value, result) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::set() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.hset(key, value, result, function (err, reply) {
                            if (err)
                                reject(err);
                            else if (reply)
                                fulfill(true);
                            else
                                reject(new Error('Failed to set value of key ' + key));
                        });
                    })];
            });
        });
    };
    RedisClient.prototype.setExpire = function (key, expire) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::set() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.expire(key, expire, function (err, reply) {
                            if (err)
                                reject(err);
                            else if (reply)
                                fulfill(true);
                            else
                                reject(new Error('Failed to set expiration of key ' + key));
                        });
                    })];
            });
        });
    };
    /**
     * Returns the value associated with key as a string or object.
     *
     * @param {string} key The key for the value to return.
     * @returns {Promise<any>}
     */
    RedisClient.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::get() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.hgetall(key, function (err, reply) {
                            if (err)
                                reject(err);
                            else if (reply)
                                fulfill(reply);
                            else
                                reject('Key ' + key + ' does not exist.');
                        });
                    })];
            });
        });
    };
    RedisClient.prototype.hget = function (hashKey, key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::get() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.hget(hashKey, key, function (err, val) {
                            if (err)
                                reject(err);
                            else if (val)
                                fulfill(val);
                            else
                                fulfill('');
                        });
                    })];
            });
        });
    };
    /**
     * Deletes the specified key-value pair. If more than one key is given, the number
     * of keys successfully deleted is returned.
     *
     * @param {string|string[]} key The key for the key-value pair to delete.
     * @returns {Promise<number>}
     */
    RedisClient.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::del() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.del(key, function (err, reply) {
                            if (err)
                                reject(err);
                            else if (reply)
                                fulfill(+reply);
                            else
                                reject('Failed to delete key ' + key);
                        });
                    })];
            });
        });
    };
    /**
     * Checks existence of the specified key. If multiple keys are given, then number
     * of keys that exist is returned.
     *
     * @param {string|string[]} key The key to check existence of.
     * @returns {Promise<boolean}
     */
    RedisClient.prototype.exists = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this._isConnected) {
                    Log_1.default.error('RedisClient::exists() - ERROR Client not connected.');
                    throw new Error('Client not connected');
                }
                return [2 /*return*/, new Promise(function (fulfill, reject) {
                        _this.client.exists(key, function (err, reply) {
                            if (err)
                                reject(err);
                            else
                                fulfill(+reply);
                        });
                    })];
            });
        });
    };
    return RedisClient;
}());
exports.default = RedisClient;
