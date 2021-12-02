const joi = require('joi')
import { catchAsync } from '../utils/catchAsync'
export const userValidation = catchAsync(async (req, res, next) => {

  const requestBody = {
    name: joi.string().alphanum().min(6).max(16).required(),
    phone: joi.string().regex(/^[0-9]{11}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.`, }).required(),
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    lang: joi.string().regex(/[a-zA-Z]/)
  }

  const { error, value } = joi.object(requestBody).validate(req.body);
  console.log('.....User Validation Error......', error)
  if (error)
    return res.status(400).json({ message: error.message.replace(/"/g, '') })
  return next()
});