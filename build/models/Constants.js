"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Language_1 = require("../models/enums/Language");
var Constants = /** @class */ (function () {
    function Constants() {
    }
    Constants.APP_NAME = 'NOTIFICATION_SYSTEM';
    Constants.AUTHOR = 'Sayed_Mubarak';
    Constants.DEFULT_LANG = Language_1.languageEnum.en;
    Constants.SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
    //public static TOKEN = `xoxe.xoxp-1-Mi0yLTE4MTE5NDUwNjE2ODItMTgxMjE0OTA5OTc2My0yNzk5MDYzNzg4Mjg4LTI3NjI0MDY2MTIzNzUtOTE0YmQzYThmNWRmODZlOWE2NGM2MDhmY2I2MmQ1N2FiMDRmYTQ1ZTgyNmZkYmI3Zjk4MmQzNjBjN2M5MDc0MQ`
    Constants.KAFKA_OPTS = {
        clientId: 'notification',
        brokers: ["0.0.0.0:9092"],
        groupId: 'kafka-notification',
    };
    return Constants;
}());
exports.default = Constants;
