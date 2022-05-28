import type { IAnnouncement } from '@interfaces/index';
import Joi from 'joi';
import { validationMessage } from '@const/index';

export const addAnnouncementValidationSchema = Joi.object<IAnnouncement>({
  city: Joi.string().trim().required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
  description: Joi.string().trim().max(1100).required().messages({
    'string.empty': validationMessage.notEmpty,
    'any.required': validationMessage.requiredFiled,
  }),
  coordinates: Joi.object({
    lat: Joi.number().strict().required(),
    lng: Joi.number().strict().required(),
  }),
});
