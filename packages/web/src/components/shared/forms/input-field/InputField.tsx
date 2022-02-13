import React from 'react';
import get from 'lodash/get';
import type { UseFormRegister, Path, RegisterOptions, DeepMap, FieldError } from 'react-hook-form';
import { FormControl, FormLabel, Input, InputGroup, InputProps, FormErrorMessage } from '@chakra-ui/react';

interface IInputField<TFormValues> extends Omit<InputProps, 'name'> {
  name: Path<TFormValues>;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  label?: string;
  inputLeftElement?: JSX.Element;
  inputRightElement?: JSX.Element;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}
function InputField<TFormValues extends Record<string, unknown>>({
  name,
  placeholder,
  label,
  isRequired,
  type = 'text',
  inputLeftElement,
  inputRightElement,

  register,
  rules,
  errors,
  ...restProps
}: IInputField<TFormValues>) {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <FormControl isInvalid={hasError} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {inputLeftElement}
        <Input
          id={name}
          type={type}
          name={name}
          placeholder={placeholder}
          {...(register && register(name, rules))}
          {...restProps}
        />
        {inputRightElement}
      </InputGroup>
      <FormErrorMessage>{hasError && errorMessages.message}</FormErrorMessage>
    </FormControl>
  );
}
export default InputField;
