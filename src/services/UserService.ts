import { IUserGroup } from './../models/User_Group';
import Group from "../models/Group";
import User from "../models/User";
import UserGroup from "../models/User_Group";
import { IUser } from "../models/User";
import { ResponseCode } from '../models/enums/StatusCode';

import mongoose, { isValidObjectId } from "mongoose";
export default class UserService {
    async createUser(data: IUser) {
        let { name, email, phone, lang } = data;
        let exsistingUser: any = await User.findOne({ name, email, phone });
        if (exsistingUser)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'User_Already_Exsist' }

        const user = await User.create({ name, email, phone, lang });
        return user;
    }

    async createGroup(data) {
        let { name }: { name: string } = data;
        const exsistingGroup: any = await Group.findOne({ name });
        if (exsistingGroup)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'Group_Already_Exsist' }

        const createdGroup: any = await Group.create({ name });
        return createdGroup;
    }

    async addUserToGroup(data: IUserGroup) {
        let userId = mongoose.Types.ObjectId.isValid(data.userId) ? new mongoose.Types.ObjectId(data.userId) : "";
        let groupId = mongoose.Types.ObjectId.isValid(data.groupId) ? new mongoose.Types.ObjectId(data.groupId) : "";

        const exsistingUser = await User.findOne({ userId }).lean();
        if (!exsistingUser)
            throw new Error("User_Not_Found");
        const exsistingGroup: any = await Group.findOne({ groupId }).lean();
        if (!exsistingGroup)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'Group_Not_Found' };
        const isUserOnTheGroup: any = await UserGroup.find({ userId, groupId }).lean();
        if (isUserOnTheGroup)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'User_Already_on_This_Group' };

        const addedUser = await UserGroup.create({ userId, groupId });
        return addedUser;
    }
}