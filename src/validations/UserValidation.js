import Joi from "joi";
joi.objectId = require("joi-objectid")(joi);
import catchAsync from "../utils/catchAsync";
import { Status } from "../models/enums/NotificationType";
export const userNotification = catchAsync(async (req, res, next) => {
  const bodySchema = joi
    .object()
    .keys({
      title: joi
        .object()
        .keys({
          en: joi.string().required(),
          ar: joi.string().required(),
          fr: joi.string().required(),
          externalLocalization: joi.boolean(),
        })
        .required(),
      notificationBody: joi
        .object()
        .keys({
          en: joi.string().required(),
          ar: joi.string().required(),
          fr: joi.string().required(),
          externalLocalization: joi.boolean(),
        })
        .required(),
      userId: ObjectId().allow(""),
      groupId: joi.when("userId", {
        is: "",
        then: ObjectId(),
        otherwise: ObjectId().allow(""),
      }),
      type: joi.string().required().valid([Status.EMAIL, Status.SMS]),
    })
    .xor("userId", "groupId");

  const bodyValidation = joi.validate(req.body, bodySchema, {
    allowUnknown: false,
  });
  const validationError = bodyValidation.error;

  if (validationError) {
    return res.status(400).send({
      status: "BAD_REQUEST",
      message: validationError.message,
    });
  }
  return next();
});
