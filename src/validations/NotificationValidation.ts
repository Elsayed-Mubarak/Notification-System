const joi = require('joi')
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
import { catchAsync } from '../utils/catchAsync'
import { notificationType } from '../models/enums/NotificationType'

export const createNotificationValidation = catchAsync(async (req, res, next) => {
  const requestBody = {
    title: joi.string().required(),
    body: joi.string().required(),
    userId: ObjectId().allow(''),
    groupId: joi.when('userId', {
      is: '',
      then: ObjectId(),
      otherwise: ObjectId().allow(''),
    }),
    type: joi
      .string()
      .required()
      .valid(notificationType.SMS, notificationType.PUSH_NOTIFICATION),
  }

  const { error, value } = joi.object(requestBody).xor('userId', 'groupId').validate(req.body);
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, '') })

  return next()
})