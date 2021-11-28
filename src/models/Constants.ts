import { languageEnum } from "../models/enums/Language";

export default class Constants {
    constructor() { }
    public static APP_NAME = 'ISEC'
    public static AUTHOR = 'Sayed_Mubarak'
    public static DEFULT_LANG = languageEnum.en
    public static SLACK_WEBHOOK_URL = `https://hooks.slack.com/services/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`
    public static KAFKA_OPTS = {
        clientId: 'notification',
        brokers: [`0.0.0.0:9092`],
        groupId: 'kafka-notification',
    }
    public static ORIGIN_CORS = ["https://hooks.slack.com/services/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"]
}