"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var NotificationValidation_1 = require("../validations/NotificationValidation");
var NotificationController_1 = require("../controller/NotificationController");
router.post('/notification', NotificationValidation_1.createNotificationValidation, NotificationController_1.notificationController.createNotification);
router.get('/notification', NotificationController_1.notificationController.getAllNotifications);
exports.default = router;
