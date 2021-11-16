import NotificationService from "./NotificationService";

export class PushNotificationService extends NotificationService {
    private message: string;

    constructor(message: string = 'hello') {
        super()
        this.message = message;
    }

    async send(notification) {
        console.log(`send data from push notification.... ${notification}`)
        console.log(this.message)
    }
}