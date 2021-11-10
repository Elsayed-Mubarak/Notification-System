const joi = require('joi')
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);
const catchAsync = require('../utils/catchAsync')
import { notificationTypeEnum } from '../models/enums/NotificationType'

const createNotificationValidation = catchAsync(async (req, res, next) => {
  const requestBody = {
    notificationSubject: joi
      .object()
      .keys({
        en: joi.string().required(),
        ar: joi.string().required(),
        externalLocalization: joi.boolean(),
      })
      .required(),
    notificationBody: joi
      .object()
      .keys({
        en: joi.string().required(),
        ar: joi.string().required(),
        externalLocalization: joi.boolean(),
      })
      .required(),
    userId: ObjectId().allow(''),
    groupId: joi.when('userId', {
      is: '',
      then: ObjectId(),
      otherwise: ObjectId().allow(''),
    }),
    notificationType: joi
      .string()
      .required()
      .valid([
        notificationTypeEnum.EMAIL,
        notificationTypeEnum.SMS,
        notificationTypeEnum.PUSH_NOTIFICATION,
      ]),
  }

  const bodySchema = joi.object().keys(requestBody).xor('userId', 'groupId')
  const { error, value } = joi.validate(req.body, bodySchema)
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, '') })

  return next()
})

export { createNotificationValidation }
