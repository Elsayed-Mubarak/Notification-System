import { languageEnum } from "../models/enums/Language";
export default class Constants {
    constructor() { }
    public static APP_NAME = 'ISEC'
    public static AUTHOR = 'Sayed_Mubarak'
    public static DEFULT_LANG = languageEnum.en
    public static SLACK_WEBHOOK_URL = `https://hooks.slack.com/services/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`
    public static KAFKA_OPTS = {
        clientId: 'notification',
        brokers: ['localhost:9092'],
        groupId: 'kafka-notification',
    }
}