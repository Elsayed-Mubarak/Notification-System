import { IUserGroup } from './../models/interfaces/UserGroup';
import Group from "../models/Group";
import User from "../models/User";
import UserGroup from "../models/User_Group";
import { IUser } from "../models/User";
import { ResponseCode } from '../models/enums/StatusCode';

import mongoose, { isValidObjectId, ObjectId } from "mongoose";
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

    async addUsersToGroup(data: IUserGroup) {
        let userIds = Array.isArray(data.userIds) ? data.userIds : "";
        let groupId = mongoose.Types.ObjectId.isValid(data.groupId) ? data.groupId : "";

        const exsistingUser: any = await User.find({ _id: { $in: userIds } });
        if (!exsistingUser)
            throw new Error("User_Not_Found ");
        const exsistingGroup: any = await Group.findOne({ groupId }).lean();
        if (!exsistingGroup)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'Group_Not_Found' };
        const isUserOnTheGroup: any = await UserGroup.find({ _id: { $in: userIds }, groupId })
        if (isUserOnTheGroup === null || isUserOnTheGroup === undefined)
            throw { statusCode: ResponseCode.ValidationError, status: 'Bad_Request', message: 'User_Already_on_This_Group' };

        let usersThatNeedToAddedToGroup: any = [];

        for (let i = 0; i < exsistingUser.length; i++) {
            let userId = exsistingUser[i]._id;
            usersThatNeedToAddedToGroup.push({ userId, groupId })
        }
        const usersGroup = await UserGroup.insertMany(usersThatNeedToAddedToGroup)
        return usersGroup;
    }
}