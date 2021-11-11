import { Request, Response } from 'express';
import UserService from '../services/UserService';
import HandleErrors from '../utils/handleErrors';
import { ResponseCode } from '../models/enums/StatusCode';

class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    createUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(ResponseCode.CREATED).json({ message: 'USER_CREATED_SUCESSIFULLY', user })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }

    createGroup = async (req: Request, res: Response) => {
        try {
            const createdGroup = await this.userService.createGroup(req.body);
            return res.status(ResponseCode.CREATED).json({ message: 'Group_CREATED_SUCESSIFULLY', createdGroup });
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }
    addUserToGroup = async (req: Request, res: Response) => {
        try {
            let targetUser = await this.userService.addUserToGroup(req.body);
            return res.status(ResponseCode.CREATED).json({ message: 'USER_Added_To_Group_SUCESSIFULLY', targetUser })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }
}

export const userController = new UserController();