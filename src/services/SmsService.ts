import ISendNotification from "../models/interfaces/ISendNotification"

export class SmsService implements ISendNotification {
    constructor() { }

    send(data: any) {
        if (data.userId)
        this.sendOne(data)
    else
        this.sendGroup(data)
    }
    sendOne(data: any) {
        console.log(`sendOne ... ${data}`)
    }
    sendGroup(data: any) {
        console.log(`sendGroup ... ${data}`)
    }
    getRateLimterObject(max: any, duration: any) {
        console.log(`getRateLimterObject ...`)
    }
}