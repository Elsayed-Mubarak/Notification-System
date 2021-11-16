import { NotificationFactory } from './../factory/NotificationFactory';
import { Request, Response } from 'express'
import NotificationService from '../services/NotificationService'
import HandleErrors from '../utils/handleErrors'
import { ResponseCode } from '../models/enums/StatusCode'
export class UserController {

    private notificationService: NotificationService;
    private notificationFactory: NotificationFactory
    constructor() {
        this.notificationService = new NotificationService();
        this.notificationFactory = new NotificationFactory();
    }
    async createNotification(req: Request, res: Response) {
        try {
            const createdNotification = await this.notificationService.createNotification(req.body);
            return res.status(ResponseCode.CREATED).json({ message: 'Notification_Created_SUCESSIFULLY', createdNotification })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }
    async sendNotification(req: Request, res: Response) {
        try {
            const sentNotification = await this.notificationService.sendNotification(req.body);
            return res.status(ResponseCode.Success).json({ message: 'Notification_Sent_SUCESSIFULLY', sentNotification })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

}
