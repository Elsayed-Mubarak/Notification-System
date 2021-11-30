import { languageEnum } from "../models/enums/Language";

export default class Constants {
    constructor() { }
    public static APP_NAME = 'NOTIFICATION_SYSTEM'
    public static AUTHOR = 'Sayed_Mubarak'
    public static DEFULT_LANG = languageEnum.en
    public static SLACK_WEBHOOK_URL = `https://hooks.slack.com/services/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`
    //public static TOKEN = `xoxe.xoxp-1-Mi0yLTE4MTE5NDUwNjE2ODItMTgxMjE0OTA5OTc2My0yNzk5MDYzNzg4Mjg4LTI3NjI0MDY2MTIzNzUtOTE0YmQzYThmNWRmODZlOWE2NGM2MDhmY2I2MmQ1N2FiMDRmYTQ1ZTgyNmZkYmI3Zjk4MmQzNjBjN2M5MDc0MQ`
    public static KAFKA_OPTS = {
        clientId: 'notification',
        brokers: [`0.0.0.0:9092`],
        groupId: 'kafka-notification',
    }
}