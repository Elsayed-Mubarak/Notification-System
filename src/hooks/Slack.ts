import { IncomingWebhook } from '@slack/webhook';
import Constants from '../models/Constants';

class Slack {
    private webhook;
    constructor() {
        this.webhook = new IncomingWebhook(Constants.SLACK_WEBHOOK_URL);
    }

    async getHook(message: string) {
        await this.webhook.send({
            text: ` This Message From Sayed Mubarak ${message}`,
        });
    }
}

export default new Slack();