import mongoose, { Document, ObjectId } from 'mongoose';

export interface IUserGroup extends Document {
    userIds: mongoose.Types.Array<ObjectId>,
    groupId: mongoose.Types.ObjectId
}