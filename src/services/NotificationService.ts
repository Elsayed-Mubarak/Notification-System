import User from '../models/User';
import { INotification } from '../models/interfaces/Notification';
import Notification from "../models/Notification";


export default class NotificationService {
    constructor() { }

    async createNotification(notification: INotification) {
        let { title, body, type } = notification;
        const createdNotification = await Notification.create({ title, body, type });
        return createdNotification;
    }
    async sendNotification(notification: INotification) {
        let { title, body, type, status, to } = notification;
        if (!Array.isArray(to)) {
            const sentNotification = await this.sendNotificationToGroupOfUsers(title, body, type, status, to);
        }
        
    }




    async sendNotificationToGroupOfUsers(title, body, type, status, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendNotificationToCustomUser(title, body, type, status, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendBulkNotificationToGroupUser(title, body, type, status, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendBulkNotificationToCustomUser(title, body, type, status, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
}