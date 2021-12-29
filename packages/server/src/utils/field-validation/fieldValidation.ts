import type { ValidationError } from 'joi';

interface IFieldErrors {
  [field: string]: string;
}

export const fieldValidation = (errors: ValidationError): IFieldErrors => {
  return errors.details.reduce((acc, elem) => {
    acc[elem.path[0]] = elem.message.replace(`"${elem.path[0]}"`, '').trim();
    return acc;
  }, {} as IFieldErrors);
};
