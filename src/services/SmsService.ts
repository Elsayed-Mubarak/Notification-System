import { ResponseCode } from "../models/enums/StatusCode"
import ISendNotification from "../models/interfaces/ISendNotification"

export class SmsService implements ISendNotification {
    constructor() { }

    async send(data: any) {
        if (data.userId)
            this.sendOne(data)
        else
            this.sendGroup(data)
    }
    async sendOne(data: any) {
        console.log(`sendOne ... ${data}`)
        return data
    }
    async sendGroup(data: any) {
        console.log(`sendGroup ... ${data}`)
        return data
    }
    async getRateLimterObject(max: any, duration: any) {
        console.log(`getRateLimterObject ...`);
        const data = { max, duration }
        return data;
    }
}