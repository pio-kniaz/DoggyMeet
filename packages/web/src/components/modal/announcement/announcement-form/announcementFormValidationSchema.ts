import * as Yup from 'yup';
import { validationMessage } from '@constants';

export const announcementFormValidationSchema = Yup.object().shape({
  city: Yup.string().trim().required(validationMessage.requiredFiled),
  description: Yup.string().trim().required(validationMessage.requiredFiled),
});