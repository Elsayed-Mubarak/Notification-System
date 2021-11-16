const joi = require('joi')
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
import { catchAsync } from '../utils/catchAsync'

export const UserGroupValidation = catchAsync(async (req, res, next) => {
    const requestBody = {
        userIds: joi.array().items(ObjectId().required()),
        groupId: ObjectId().required()
    }
    const { error, value } = joi.object(requestBody).validate(req.body);
    console.log('.....User_Group Validation Error......', error)
    if (error)
        return res.status(400).json({ message: error.message.replace(/"/g, '') })
    return next()
});