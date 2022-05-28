import type { FieldError } from 'react-hook-form';

interface ISetFieldsError<T> {
  fieldsError: IFieldError;
  setError: (
    name: keyof T,
    error: FieldError,
    options?: {
      shouldFocus: boolean;
    },
  ) => void;
}
interface IFieldError {
  [field: string]: string;
}

export const setFieldsError = <T>({ fieldsError, setError }: ISetFieldsError<T>) => {
  Object.keys(fieldsError).forEach((elem) => {
    const fieldName = elem as keyof T;
    setError(
      fieldName,
      {
        type: 'manual',
        message: fieldsError[elem],
      },
      { shouldFocus: false },
    );
  });
};
