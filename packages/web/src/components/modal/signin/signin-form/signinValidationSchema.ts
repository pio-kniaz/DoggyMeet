import * as Yup from 'yup';
import { validationMessage, regex } from '@constants';

export const signinValidationSchema = Yup.object({
  email: Yup.string().trim().required(validationMessage.requiredFiled).matches(regex.email, validationMessage.email),
  password: Yup.string().trim().required(validationMessage.requiredFiled),
});

export interface ISignin extends Yup.InferType<typeof signinValidationSchema> {}
