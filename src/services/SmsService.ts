import NotificationService from "./NotificationService"

export class SmsService extends NotificationService {
    constructor() {
        super()
    }

    async send(notification) {
        console.log(`send  sms .... ${notification}`)
    }
}