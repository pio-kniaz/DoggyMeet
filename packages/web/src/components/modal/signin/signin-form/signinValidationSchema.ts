import * as Yup from 'yup';
import { validationMessage, regex } from 'shared';

export const signinValidationSchema = Yup.object({
  email: Yup.string().trim().required(validationMessage.requiredFiled).matches(regex.email, validationMessage.email),
  password: Yup.string().trim().required(validationMessage.requiredFiled),
});

export type Signin = Yup.InferType<typeof signinValidationSchema>;
