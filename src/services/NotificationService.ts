import User from '../models/User';
import { INotification } from '../models/interfaces/Notification';
import Notification from "../models/Notification";
import { ResponseCode } from '../models/enums/StatusCode';
import User_Notification from '../models/User_Notification';
import Group from '../models/Group';


export default class NotificationService {
    constructor() { }

    async createNotification(notification: INotification) {
        let { title, body, type, userId, groupId } = notification;

        let exsistingNotification = await Notification.findOne({ title, body });
        if (!exsistingNotification)
            exsistingNotification = await Notification.create({ title, body });

        if (userId) {
            const isUserExsist = await User.findOne({ _id: userId });
            if (isUserExsist)
                throw { statusCode: ResponseCode.NotFoud, status: 'Bad_Request', message: 'User_Not_Exsist' };
            const userNotification = await Notification.findOne({ _id: exsistingNotification._id, userId, type });
            if (userNotification)
                throw { statusCode: ResponseCode.AlreadyExist, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST' };
        }
        if (groupId) {
            const isUserExsist = await Group.findOne({ _id: groupId });
            if (isUserExsist)
                throw { statusCode: ResponseCode.NotFoud, status: 'Bad_Request', message: 'Group_Not_Exsist' };
            const groupNotification = await Notification.findOne({ _id: exsistingNotification._id, groupId, type });
            if (groupNotification)
                throw { statusCode: ResponseCode.AlreadyExist, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST' };
        }
        const newNotification = await Notification.create({ notificationId: exsistingNotification._id, userId, groupId, type });
        return newNotification;
    }









    async sendNotification(notification: INotification) {
        let { title, body, type, to } = notification;
        if (!Array.isArray(to)) {
            const sentNotification = await this.sendNotificationToGroupOfUsers(title, body, type, to);
        }

    }




    async sendNotificationToGroupOfUsers(title, body, type, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendNotificationToCustomUser(title, body, type, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendBulkNotificationToGroupUser(title, body, type, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
    async sendBulkNotificationToCustomUser(title, body, type, to) {
        let targetUsers = [];
        const users = await User.find({ _id: { $in: to } })
        users.forEach(item => { targetUsers.push(item) })

    }
}