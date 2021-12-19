"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProvider = void 0;
var kafkajs_1 = require("kafkajs");
var KafkaProvider = /** @class */ (function () {
    function KafkaProvider(opt) {
        this.providerName = "KAFKA";
        this.provider = new kafkajs_1.Kafka({ clientId: opt.clientId, brokers: opt.brokers });
        this.consumer = this.provider.consumer({ groupId: opt.groupId });
        this.producer = this.provider.producer();
        this.admin = this.provider.admin();
        this.createTopic().then();
    }
    KafkaProvider.prototype.createTopic = function () {
        return __awaiter(this, void 0, void 0, function () {
            var inputTopics, inputTopicsArry, exsistingToics, isEqual, isCreated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inputTopics = [{ topic: 'SMS' }, { topic: 'PUSH_NOTIFICATION' }];
                        inputTopicsArry = inputTopics.map(function (item) { return item.topic; });
                        return [4 /*yield*/, this.admin.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.admin.listTopics()];
                    case 2:
                        exsistingToics = _a.sent();
                        isEqual = this.contains(exsistingToics, inputTopicsArry);
                        if (exsistingToics && isEqual) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.admin.createTopics({ waitForLeaders: true, topics: inputTopics })];
                    case 3:
                        isCreated = _a.sent();
                        if (isCreated === false) {
                            throw { statusCode: 500 /* SomethingWentWrong */, status: 'Bad_Request', message: 'Topic_Not_Created' };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaProvider.prototype.publishMessage = function (notificationId, notificationType, message) {
        return __awaiter(this, void 0, void 0, function () {
            var publishedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.producer.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.producer.send({ topic: notificationType, messages: [{ key: notificationId, value: JSON.stringify({ message: message }) }] })];
                    case 2:
                        publishedData = _a.sent();
                        if (!publishedData) {
                            throw { statusCode: 500 /* SomethingWentWrong */, status: 'Bad_Request', message: 'Producer_Not_Published_Data' };
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaProvider.prototype.subscribe = function (topics) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(topics.map(function (topic) { _this.consumer.subscribe({ topic: topic, fromBeginning: true }); }))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaProvider.prototype.readMessagesFromTopics = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.consumer.run({
                            eachMessage: function (_a) {
                                var topic = _a.topic, message = _a.message;
                                return __awaiter(_this, void 0, void 0, function () {
                                    var _id, data;
                                    return __generator(this, function (_b) {
                                        console.log(' ... .. #### Read Messages From Topics #### .. ... ');
                                        _id = message.key.toString();
                                        data = JSON.parse(message.value.toString());
                                        callback({ _id: _id, data: data, provider: this.providerName, topic: topic });
                                        return [2 /*return*/];
                                    });
                                });
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaProvider.prototype.contains = function (exsistingToics, inputTopicsArry) {
        var counter = 0;
        for (var i = 0; i < inputTopicsArry.length; i++) {
            if (exsistingToics.includes(inputTopicsArry[i]))
                counter++;
        }
        if (counter === inputTopicsArry.length)
            return true;
        return false;
    };
    return KafkaProvider;
}());
exports.KafkaProvider = KafkaProvider;
