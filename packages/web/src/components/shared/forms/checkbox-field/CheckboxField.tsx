import React, { ReactNode } from 'react';
import get from 'lodash/get';
import { Checkbox, CheckboxProps, FormErrorMessage, FormControl } from '@chakra-ui/react';
import { UseFormRegister, Path, DeepMap, FieldError, RegisterOptions } from 'react-hook-form';

interface IInputCheckbox<TFormValues> extends CheckboxProps {
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  children?: ReactNode;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}

function CheckboxField<TFormValues>({ children, name, register, errors, ...restProps }: IInputCheckbox<TFormValues>) {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <FormControl>
      <Checkbox name={name} {...(register && register(name))} isInvalid={hasError} {...restProps}>
        {children}
      </Checkbox>
      <FormErrorMessage>{hasError && errorMessages.message}</FormErrorMessage>
    </FormControl>
  );
}

export default CheckboxField;
