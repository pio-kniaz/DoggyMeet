import Joi from 'joi';
import { validationMessage, regex } from '@doggy-meet/shared';

export const addUserValidationSchema = Joi.object({
  name: Joi.string().trim().max(30).required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
  email: Joi.string().trim().pattern(regex.email).required().messages({
    'string.empty': validationMessage.notEmpty,
    'string.pattern.base': validationMessage.email,
    'any.required': validationMessage.requiredFiled,
  }),
  password: Joi.string().required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
});
