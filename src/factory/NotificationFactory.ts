import { SmsService } from './../services/SmsService';
import { PushNotificationService } from './../services/PushNotificationService';
import { notificationType } from '../models/enums/NotificationType';

export class NotificationFactory {
    constructor() { }

    async createNotification(type) {
        switch (type) {
            case notificationType.SMS:
                return new PushNotificationService();
            case notificationType.PUSH_NOTIFICATION:
                return new SmsService();
            default:
                console.log(" ... UNDEFIND_NOTIFICATION_TYPE ... ")
        }
    }
}