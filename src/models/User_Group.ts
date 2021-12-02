import mongoose, { Schema, model } from 'mongoose';

export interface IUserGroup extends Document {
    userId: mongoose.Types.ObjectId,
    groupId: mongoose.Types.ObjectId
}

const UserGroupSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    groupId: {
        type: mongoose.Types.ObjectId,
        ref: "Group",
    }
})

export default model<IUserGroup>('UserGroup', UserGroupSchema);