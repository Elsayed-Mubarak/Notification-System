import { Request, Response } from 'express'
import UserService from '../services/UserService'
import HandleErrors from '../utils/handleErrors'
import { ResponseCode } from '../models/enums/StatusCode'
export class UserController {

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }
    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUser(req.body);
            return res.status(ResponseCode.CREATED).json({ message: 'USER_CREATED_SUCESSIFULLY', user })
        } catch (error) {
            let { statusCode, status, message } = HandleErrors(error);
            return res.status(statusCode).json({ status, message });
        }
    }
}
