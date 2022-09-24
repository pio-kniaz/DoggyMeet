import * as Yup from 'yup';
import { validationMessage } from '@doggy-meet/shared';

export const announcementFormValidationSchema = Yup.object().shape({
  city: Yup.string().trim().nullable().required(validationMessage.requiredFiled),
  description: Yup.string().trim().required(validationMessage.requiredFiled),
});
