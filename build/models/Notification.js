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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var NotificationType_1 = require("./enums/NotificationType");
var NotificationStatus_1 = require("./enums/NotificationStatus");
var NotificationSchema = new mongoose_1.Schema({
    notificationId: {
        type: mongoose_1.default.Types.ObjectId,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "User",
    },
    groupId: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "Group",
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(NotificationType_1.notificationType),
        default: NotificationType_1.notificationType.PUSH_NOTIFICATION,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(NotificationStatus_1.Status),
        default: NotificationStatus_1.Status.PENDING
    },
    creationDate: {
        type: Date,
        defult: new Date()
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Notification', NotificationSchema);
