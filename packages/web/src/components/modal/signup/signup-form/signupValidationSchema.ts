import * as Yup from 'yup';
import { regex, validationMessage } from '@doggy-meet/shared';

export const signupValidationSchema = Yup.object({
  name: Yup.string().trim().required(validationMessage.requiredFiled),
  email: Yup.string().trim().required(validationMessage.requiredFiled).matches(regex.email, validationMessage.email),
  password: Yup.string().trim().required(validationMessage.requiredFiled),
});

export type Signup = Yup.InferType<typeof signupValidationSchema>;
