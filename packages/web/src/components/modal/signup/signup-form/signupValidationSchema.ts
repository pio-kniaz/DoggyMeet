import * as Yup from 'yup';
import { validationMessage, regex } from '@constants';

export const signupValidationSchema = Yup.object({
  name: Yup.string().trim().required(validationMessage.requiredFiled),
  email: Yup.string().trim().matches(regex.email, validationMessage.email).required(validationMessage.requiredFiled),
  password: Yup.string().trim().required(validationMessage.requiredFiled),
});

export type ISignup = Yup.InferType<typeof signupValidationSchema>;
