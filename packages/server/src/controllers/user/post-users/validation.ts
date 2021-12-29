import Joi from 'joi';

export const addUserValidationSchema = Joi.object({
  firstName: Joi.string().trim().max(30).required(),
  lastName: Joi.string().trim().max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().required(), // TODO: add specific
  passwordConfirm: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({ 'any.only': 'password do not match' }),
  terms: Joi.boolean()
    .valid(true)
    .required()
    .messages({ 'any.only': 'terms must be true' }),
});
