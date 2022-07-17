import Joi from 'joi';
import { validationMessage, regex } from 'shared';

export const loginValidationSchema = Joi.object({
  email: Joi.string().trim().pattern(regex.email).required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
  password: Joi.string().required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
});
