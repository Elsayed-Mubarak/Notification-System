import ISendNotification from '../models/interfaces/ISendNotification';

export class PushNotificationService implements ISendNotification {
    constructor() { }

    async send(data: any) {
        if (data.userId)
            this.sendOne(data)
        else
            this.sendGroup(data)
    }
    async sendOne(data: any) {
        console.log(`sendOne ... ${data.type}`)
    }
    async sendGroup(data: any) {
        console.log(`sendGroup ... ${data.type}`)
    }
    async getRateLimterObject(max: any, duration: any) {
        console.log(`getRateLimterObject ...`);
    }
}