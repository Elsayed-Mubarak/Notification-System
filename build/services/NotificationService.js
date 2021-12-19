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
var User_1 = __importDefault(require("../models/User"));
var Notification_1 = __importDefault(require("../models/Notification"));
var User_Notification_1 = __importDefault(require("../models/User_Notification"));
var Group_1 = __importDefault(require("../models/Group"));
var User_Group_1 = __importDefault(require("../models/User_Group"));
var NotificationService = /** @class */ (function () {
    function NotificationService() {
    }
    NotificationService.prototype.createNotification = function (notification) {
        return __awaiter(this, void 0, void 0, function () {
            var title, body, exsistingNotification, userId, groupId, type, isUserExsist, userNotification, isUserExsist, groupNotification, newNotification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        title = notification.title, body = notification.body;
                        return [4 /*yield*/, User_Notification_1.default.findOne({ title: title, body: body })];
                    case 1:
                        exsistingNotification = _a.sent();
                        if (!!exsistingNotification) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_Notification_1.default.create({ title: title, body: body })];
                    case 2:
                        exsistingNotification = _a.sent();
                        _a.label = 3;
                    case 3:
                        userId = notification.userId, groupId = notification.groupId, type = notification.type;
                        if (!userId) return [3 /*break*/, 6];
                        return [4 /*yield*/, User_1.default.findOne({ _id: userId })];
                    case 4:
                        isUserExsist = _a.sent();
                        if (!isUserExsist)
                            throw { statusCode: 404 /* NotFoud */, status: 'Bad_Request', message: 'User_Not_Exsist' };
                        return [4 /*yield*/, Notification_1.default.findOne({ notificationId: exsistingNotification._id, userId: userId, type: type })];
                    case 5:
                        userNotification = _a.sent();
                        if (userNotification)
                            throw { statusCode: 409 /* AlreadyExist */, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST_FOR_USER' };
                        _a.label = 6;
                    case 6:
                        if (!groupId) return [3 /*break*/, 9];
                        return [4 /*yield*/, Group_1.default.findOne({ _id: groupId })];
                    case 7:
                        isUserExsist = _a.sent();
                        if (isUserExsist)
                            throw { statusCode: 404 /* NotFoud */, status: 'Bad_Request', message: 'Group_Not_Exsist' };
                        return [4 /*yield*/, Notification_1.default.findOne({ notificationId: exsistingNotification._id, groupId: groupId, type: type })];
                    case 8:
                        groupNotification = _a.sent();
                        if (groupNotification)
                            throw { statusCode: 409 /* AlreadyExist */, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST_FOR_GROUP' };
                        _a.label = 9;
                    case 9: return [4 /*yield*/, Notification_1.default.create({
                            notificationId: exsistingNotification._id,
                            userId: userId,
                            groupId: groupId,
                            title: title,
                            body: body,
                            type: type
                        })];
                    case 10:
                        newNotification = _a.sent();
                        return [2 /*return*/, newNotification];
                }
            });
        });
    };
    NotificationService.prototype.addNotificationToUsers = function (notificationId) {
        return __awaiter(this, void 0, void 0, function () {
            var exsistingNotification, usersIds_1, usersOnTheSameGroup;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Notification_1.default.findOne({ _id: notificationId })];
                    case 1:
                        exsistingNotification = _a.sent();
                        if (!exsistingNotification)
                            throw { statusCode: 404 /* NotFoud */, status: 'Bad_Request', message: 'Notification_Not_Exsist' };
                        if (!exsistingNotification.userId) return [3 /*break*/, 3];
                        return [4 /*yield*/, User_Notification_1.default.create({
                                userId: exsistingNotification.userId,
                                title: exsistingNotification.title,
                                body: exsistingNotification.title
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!exsistingNotification.groupId) return [3 /*break*/, 5];
                        usersIds_1 = [];
                        return [4 /*yield*/, User_Group_1.default.find({ groupId: exsistingNotification.groupId })];
                    case 4:
                        usersOnTheSameGroup = _a.sent();
                        if (usersOnTheSameGroup.length) {
                            usersOnTheSameGroup.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, User_Notification_1.default.create({
                                                userId: item.userId,
                                                title: exsistingNotification.title,
                                                body: exsistingNotification.body
                                            })];
                                        case 1:
                                            _a.sent();
                                            usersIds_1.push(item.userId);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    NotificationService.prototype.listAllNotification = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exsistingNotifications;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Notification_1.default.find()];
                    case 1:
                        exsistingNotifications = _a.sent();
                        if (!exsistingNotifications)
                            throw { statusCode: 404 /* NotFoud */, status: 'Bad_Request', message: 'NOT_FOUND_NOTIFICATION' };
                        return [2 /*return*/, exsistingNotifications];
                }
            });
        });
    };
    return NotificationService;
}());
exports.default = NotificationService;
