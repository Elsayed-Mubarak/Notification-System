"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SmsService_1 = __importDefault(require("./../services/SmsService"));
var PushNotificationService_1 = require("./../services/PushNotificationService");
var NotificationType_1 = require("../models/enums/NotificationType");
var NotificationFactory = /** @class */ (function () {
    function NotificationFactory() {
    }
    NotificationFactory.prototype.getNotifierService = function (type) {
        console.log(" ********** get notifier service  ********* ");
        switch (type) {
            case NotificationType_1.notificationType.SMS:
                return new PushNotificationService_1.PushNotificationService();
            case NotificationType_1.notificationType.PUSH_NOTIFICATION:
                return new SmsService_1.default();
            case NotificationType_1.notificationType.EMAIL:
                return new SmsService_1.default();
        }
    };
    return NotificationFactory;
}());
exports.default = NotificationFactory;
