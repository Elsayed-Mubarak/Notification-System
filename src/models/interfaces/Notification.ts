import { ObjectId } from 'mongoose';
export interface INotification {
    title: string,
    body: string,
    type: string,
    userId?: ObjectId | Array<ObjectId>,
    groupId?: ObjectId,
    to: ObjectId | Array<ObjectId>
}