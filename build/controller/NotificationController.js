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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
var kafka_provider_1 = require("./../providers/kafka.provider");
var NotificationFactory_1 = __importDefault(require("./../factory/NotificationFactory"));
var NotificationService_1 = __importDefault(require("../services/NotificationService"));
var handleErrors_1 = __importDefault(require("../utils/handleErrors"));
var Slack_1 = require("../hooks/Slack");
var Constants_1 = __importDefault(require("../models/Constants"));
var dispatcher_1 = require("../models/interfaces/dispatcher");
var NotificationStatus_1 = require("../models/enums/NotificationStatus");
var NotificationController = /** @class */ (function () {
    //private event: events
    function NotificationController() {
        var _this = this;
        this.createNotification = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var createdNotification_1, _id, type, notificationService, sentNotification, notificationId_1, notificationType_1, topics, sendMessageFromEvent, error_1, _a, statusCode, status_1, message;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.notificationService.createNotification(req.body)];
                    case 1:
                        createdNotification_1 = _b.sent();
                        _id = createdNotification_1._id, type = createdNotification_1.type;
                        notificationService = this.notificationFactory.getNotifierService(type);
                        return [4 /*yield*/, this.notificationService.addNotificationToUsers(_id)];
                    case 2:
                        _b.sent();
                        sentNotification = notificationService.send(createdNotification_1);
                        notificationId_1 = _id.toString();
                        notificationType_1 = type.toString();
                        topics = (0, dispatcher_1.convertToTopicType)(type);
                        return [4 /*yield*/, this.kafkaProvider.publishMessage(notificationId_1, notificationType_1, createdNotification_1)];
                    case 3:
                        _b.sent();
                        sendMessageFromEvent = function (message) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(message._id.toString() === notificationId_1 && message.topic === notificationType_1)) return [3 /*break*/, 2];
                                        createdNotification_1.status = NotificationStatus_1.Status.SENT;
                                        return [4 /*yield*/, Promise.all([createdNotification_1.save(), this.slack.sendHook(JSON.stringify(createdNotification_1))])];
                                    case 1:
                                        _a.sent();
                                        console.log("\n                    ### **** Concumer_Subscribed_On_Notification_ID : {" + message._id + "} **** ###\n                    ### **** Read_Notification_From_Topic : {" + message.topic + "} **** ###\n                    ### **** With Message {" + JSON.stringify(message.data) + "} ***** ###\n                    ****************************************************************************\n                    ");
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, Promise.all([this.kafkaProvider.subscribe(topics), this.kafkaProvider.readMessagesFromTopics(sendMessageFromEvent)])];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, res.status(201 /* CREATED */).json({ message: 'NOTIFICATION_CREATED_SUCESSIFULLY', createdNotification: createdNotification_1 })];
                    case 5:
                        error_1 = _b.sent();
                        _a = (0, handleErrors_1.default)(error_1), statusCode = _a.statusCode, status_1 = _a.status, message = _a.message;
                        return [2 /*return*/, res.status(statusCode).json({ status: status_1, message: message })];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getAllNotifications = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var notifications, error_2, _a, statusCode, status_2, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.notificationService.listAllNotification()];
                    case 1:
                        notifications = _b.sent();
                        return [2 /*return*/, res.status(200 /* Success */).json({ message: 'SUCESS', ALL_NOTIFICATIONS: notifications })];
                    case 2:
                        error_2 = _b.sent();
                        _a = (0, handleErrors_1.default)(error_2), statusCode = _a.statusCode, status_2 = _a.status, message = _a.message;
                        return [2 /*return*/, res.status(statusCode).json({ status: status_2, message: message })];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.notificationService = new NotificationService_1.default();
        this.notificationFactory = new NotificationFactory_1.default();
        this.kafkaProvider = new kafka_provider_1.KafkaProvider(Constants_1.default.KAFKA_OPTS);
        this.slack = new Slack_1.Slack(Constants_1.default.SLACK_WEBHOOK_URL);
        //  this.event = new events.EventEmitter();
    }
    return NotificationController;
}());
exports.notificationController = new NotificationController();
