import User from '../models/User';
import { INotification } from '../models/interfaces/Notification';
import Notification from "../models/Notification";
import { ResponseCode } from '../models/enums/StatusCode';
import User_Notification from '../models/User_Notification';
import Group from '../models/Group';
import User_Group from '../models/User_Group';


export default class NotificationService {

    async createNotification(notification: INotification) {
        let { title, body, type, userId, groupId } = notification;

        let exsistingNotification = await User_Notification.findOne({ title, body });
        if (!exsistingNotification)
            exsistingNotification = await User_Notification.create({ title, body });

        if (userId) {
            const isUserExsist = await User.findOne({ _id: userId });
            if (!isUserExsist)
                throw { statusCode: ResponseCode.NotFoud, status: 'Bad_Request', message: 'User_Not_Exsist' };
            const userNotification = await Notification.findOne({ notificationId: exsistingNotification._id, userId, type });
            if (userNotification)
                throw { statusCode: ResponseCode.AlreadyExist, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST' };
        }
        if (groupId) {
            const isUserExsist = await Group.findOne({ _id: groupId });
            if (isUserExsist)
                throw { statusCode: ResponseCode.NotFoud, status: 'Bad_Request', message: 'Group_Not_Exsist' };
            const groupNotification = await Notification.findOne({ notificationId: exsistingNotification._id, groupId, type });
            if (groupNotification)
                throw { statusCode: ResponseCode.AlreadyExist, status: 'Bad_Request', message: 'NOTIFICATION_ALREADY_EXSIST' };
        }

        const newNotification = await Notification.create({
            notificationId: exsistingNotification._id,
            userId,
            groupId,
            type
        });
        return newNotification;
    }

    async addNotificationToUsers(notificationId) {
        const exsistingNotification: any = await Notification.findOne({ _id: notificationId });
        if (!exsistingNotification)
            throw { statusCode: ResponseCode.NotFoud, status: 'Bad_Request', message: 'Notification_Not_Exsist' };

        if (exsistingNotification.userId) {
            const userNotification = await User_Notification.create({
                userId: exsistingNotification.userId,
                title: exsistingNotification.title,
                body: exsistingNotification.title
            });
        } else
            if (exsistingNotification.groupId) {
                let usersIds = [];
                const usersOnTheSameGroup = await User_Group.find({ groupId: exsistingNotification.groupId });
                if (usersOnTheSameGroup.length) {
                    usersOnTheSameGroup.forEach(async item => {
                        await User_Notification.create({
                            userId: item.userId,
                            title: exsistingNotification.title,
                            body: exsistingNotification.body
                        })
                        usersIds.push(item.userId)
                    });
                }
            }
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