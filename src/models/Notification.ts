import mongoose, { model, Schema, Document, ObjectId } from "mongoose";
import { notificationType } from './enums/NotificationType';
import { Status } from './enums/NotificationStatus';

export interface INotification extends Document {
    notificationId: ObjectId,
    userId: ObjectId | Array<ObjectId>,
    groupId?: ObjectId,
    title: string,
    body: string,
    type: String,
    status?: Status
}

const NotificationSchema: Schema = new Schema({
    notificationId: {
        type: mongoose.Types.ObjectId,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: "Group",
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
        default: notificationType.PUSH_NOTIFICATION,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(Status),
        default: Status.PENDING
    },
    creationDate: {
        type: Date,
        defult: new Date()
    }
},
    { timestamps: true })

export default model<INotification>('Notification', NotificationSchema)