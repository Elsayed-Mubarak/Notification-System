import { NotificationFactory } from './../factory/NotificationFactory';
import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'
import HandleErrors from '../utils/handleErrors'
import { ResponseCode } from '../models/enums/StatusCode'
import Slack from '../hooks/Slack';
class NotificationController {

    private notificationService: NotificationService;
    private notificationFactory: NotificationFactory
    constructor() {
        this.notificationService = new NotificationService();
        this.notificationFactory = new NotificationFactory();
    }
    createNotification = async (req: Request, res: Response) => {
        try {
            const createdNotification = await this.notificationService.createNotification(req.body);
            let { _id, type } = createdNotification;
            const notificationService = this.notificationFactory.getNotifierService(type);
            const addedNotification = await this.notificationService.addNotificationToUsers(_id);




            return res.status(ResponseCode.CREATED).json({ message: 'Notification_Created_SUCESSIFULLY', createdNotification })
        } catch (error) {
            console.log("................", error)
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }
    sendNotification = async (req: Request, res: Response) => {
        try {
            const sentNotification = await this.notificationService.sendNotification(req.body);
            return res.status(ResponseCode.Success).json({ message: 'Notification_Sent_SUCESSIFULLY', sentNotification })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

}

export const notificationController = new NotificationController();