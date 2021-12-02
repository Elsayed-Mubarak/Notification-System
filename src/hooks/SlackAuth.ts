//import { IncomingWebhook } from '@slack/webhook';
import Constants from '../models/Constants';
import HttpsProxyAgent from 'https-proxy-agent';
//const HttpsProxyAgent = require('https-proxy-agent')
const { IncomingWebhook } = require('@slack/webhook');

export class SlackAuth {
    private webhook;
    private proxy;
    constructor(SLACK_WEBHOOK_URL: string) {
        this.proxy = HttpsProxyAgent(process.env.http_proxy || 'http://localhost:7000');
        this.webhook = new IncomingWebhook(SLACK_WEBHOOK_URL, { agent: this.proxy });
    }

    async getHook(message: string) {
        await this.webhook.send({
            text: `Kafka Consumer Subscribe On Message Made By Sayed Mubarak With This Content :: ${message}`,
        });
    }
}

