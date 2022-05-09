import React from 'react';
import get from 'lodash/get';
import { FormControl, FormErrorMessage, FormLabel, InputGroup, Textarea } from '@chakra-ui/react';
import { UseFormRegister, Path, RegisterOptions, DeepMap, FieldError } from 'react-hook-form';

import TextareaAutosize, { TextareaAutosizeProps } from 'react-textarea-autosize';

interface ITextAreaField<TFormValues> extends TextareaAutosizeProps {
  name: Path<TFormValues>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  register?: UseFormRegister<TFormValues>;
  rules?: RegisterOptions;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}

function TextAreaField<TFormValues>({
  name,
  placeholder,
  label,
  isRequired,

  register,
  rules,
  errors,
  ...restProps
}: ITextAreaField<TFormValues>) {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <FormControl isInvalid={hasError} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <Textarea
          minH="unset"
          overflowY="auto"
          w="100%"
          resize="none"
          minRows={1}
          placeholder={placeholder}
          {...(register && register(name, rules))}
          {...restProps}
          as={TextareaAutosize}
        />
      </InputGroup>
      <FormErrorMessage>{hasError && errorMessages.message}</FormErrorMessage>
    </FormControl>
  );
}

export default TextAreaField;
