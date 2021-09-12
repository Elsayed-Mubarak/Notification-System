import mongoose, { Schema, Document, model } from 'mongoose';

const UserGroupSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    notificationId: {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
    }
}, {
    timestamps: true
})

export default model('UserGroup', UserGroupSchema);