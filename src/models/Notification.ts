import { model, Schema, Document } from "mongoose";
import { notificationTypeEnum } from './enums/NotificationType';
import { Status } from './enums/NotificationStatus';

export interface INotification extends Document {
    title: String,
    body: String,
    type: String,
    status: Status
}

const NotificationSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(notificationTypeEnum),
        default: notificationTypeEnum.EMAIL
    },
    status: {
        type: String,
        enum: Object.values(Status),
    },
    modificationDate: {
        type: Date,
        defult: new Date()
    }
},
    { timestamps: true })

export default model<INotification>('Notification', NotificationSchema)