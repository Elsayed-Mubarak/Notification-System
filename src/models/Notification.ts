import mongoose, { model, Schema, Document } from "mongoose";
import { notificationType } from './enums/NotificationType';
import { Status } from './enums/NotificationStatus';

export interface INotification extends Document {
    title: String,
    body: String,
    type: String,
    status?: Status
}

const NotificationSchema: Schema = new Schema({
    notificationId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
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
        enum: Object.values(notificationType),
        default: notificationType.PUSH_NOTIFICATION
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING
    },
    modificationDate: {
        type: Date,
        defult: new Date()
    }
},
    { timestamps: true })

export default model<INotification>('Notification', NotificationSchema)