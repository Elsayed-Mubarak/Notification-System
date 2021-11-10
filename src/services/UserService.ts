import User from "../models/User";
import { IUser } from "../models/User";

export default class UserService {

    async createUser(data: IUser) {
        let { name, email, phone, lang } = data;
        let exsistingUser: any = await User.findOne({ name, email, phone });
        if (exsistingUser) {
            throw { statusCode: 400, status: 'Bad_Request', message: 'User_Already_Exsist' }
        }
        const user = await User.create({ name, email, phone, lang });
        return user;
    }

}