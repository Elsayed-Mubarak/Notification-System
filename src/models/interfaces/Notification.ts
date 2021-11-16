import { ObjectId } from 'mongoose';
import { Status } from './../enums/NotificationStatus';

export interface INotification {
    title: string,
    body: string,
    type: string,
    status?: Status,
    to?: ObjectId | Array<ObjectId>
}