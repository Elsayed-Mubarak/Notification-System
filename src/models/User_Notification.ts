import mongoose, { Schema, Document, model } from 'mongoose';

const UserGroupSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    notificationId: {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default model('UserNotification', UserGroupSchema);