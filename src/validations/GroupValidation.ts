const joi = require('joi')

import { catchAsync } from '../utils/catchAsync'
export const groupValidation = catchAsync(async (req, res, next) => {

  const requestBody = {
    name: joi.string().alphanum().min(6).max(16).required(),
  }
  const { error, value } = joi.object(requestBody).validate(req.body);
  console.log('.....Group Validation Error......', error)
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, '') })
  return next()
});