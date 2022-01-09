import * as Yup from 'yup';
import {validationMessage, regex} from '@/const/index';

export const registerValidationSchema = Yup.object({
  name: Yup.string().trim().required(validationMessage.requiredFiled),
  email: Yup.string()
    .trim()
    .matches(regex.email, validationMessage.email)
    .required(validationMessage.requiredFiled),
  password: Yup.string().trim().required(validationMessage.requiredFiled),
});

export type IRegisterUser = Yup.InferType<typeof registerValidationSchema>;
