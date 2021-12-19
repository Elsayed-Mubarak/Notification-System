"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.clearHash = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var RedisManager_1 = __importDefault(require("../config/redis/RedisManager"));
var Log_1 = __importDefault(require("../utils/Log"));
var client = RedisManager_1.default.client;
var exec = mongoose_1.default.Query.prototype.exec;
// create new cache function on prototype
mongoose_1.default.Query.prototype.cache = function (options) {
    if (options === void 0) { options = { expire: 1800, key: '' }; }
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
    this.expire = options.expire;
    return this; //make cache() chainable
};
// override exec function to first check cache for data
mongoose_1.default.Query.prototype.exec = function () {
    return __awaiter(this, void 0, void 0, function () {
        var key, cacheValue, result, doc, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!this.useCache) {
                        //NO CACHE
                        return [2 /*return*/, exec.apply(this)];
                    }
                    key = JSON.stringify(__assign(__assign({}, this.getQuery()), { collection: this.model.collection.name }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, client.hget(this.hashKey, key)];
                case 2:
                    cacheValue = _a.sent();
                    if (!!cacheValue) return [3 /*break*/, 4];
                    return [4 /*yield*/, exec.apply(this)];
                case 3:
                    result = _a.sent();
                    client.set(this.hashKey, key, JSON.stringify(result));
                    client.setExpire(this.hashKey, this.expire);
                    Log_1.default.info('Return data from MongoDB');
                    return [2 /*return*/, result];
                case 4:
                    doc = JSON.parse(cacheValue);
                    Log_1.default.info('Return data from Redis');
                    return [2 /*return*/, Array.isArray(doc)
                            ? doc.map(function (d) { return new _this.model(d); })
                            : doc];
                case 5:
                    error_1 = _a.sent();
                    Log_1.default.error(error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
/**
 *
 * @param hashKey hashkey to remove
 */
var clearHash = function (hashKey) {
    client.del(JSON.stringify(hashKey));
};
exports.clearHash = clearHash;
