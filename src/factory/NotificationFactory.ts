import SmsService from './../services/SmsService';
import { PushNotificationService } from './../services/PushNotificationService';
import { notificationType } from '../models/enums/NotificationType';

export default class NotificationFactory {
    constructor() { }
    
    getNotifierService(type) {
        console.log(" ********** get notifier service  ********* ");
        switch (type) {
            case notificationType.SMS:
                return new PushNotificationService();
            case notificationType.PUSH_NOTIFICATION:
                return new SmsService();
            case notificationType.EMAIL:
                return new SmsService();
        }
    }
}