import ISendNotification from "../models/interfaces/ISendNotification"

export class SmsService implements ISendNotification {
    constructor() { }
    
    send(data: any) {
        throw new Error("Method not implemented.");
    }
    sendOne(data: any) {
        throw new Error("Method not implemented.");
    }
    sendGroup(data: any) {
        throw new Error("Method implemented To Send From Group.");
    }
    getRateLimterObject(max: any, duration: any) {
        throw new Error("Method implemented To Send Rate Limit.");
    }
}