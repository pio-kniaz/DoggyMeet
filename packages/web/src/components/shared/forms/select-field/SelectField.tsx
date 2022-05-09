import React, { useMemo } from 'react';
import get from 'lodash/get';
import { Select, OptionBase } from 'chakra-react-select';
import { useController, Control, Path, DeepMap, FieldError } from 'react-hook-form';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';

type SelectProps = React.ComponentProps<typeof Select>;

interface ISelectField<TFormValues> extends SelectProps {
  name: Path<TFormValues>;
  control: Control<TFormValues>;
  options: IOption[];
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
}

interface IOption extends OptionBase {
  label: string;
  value: string;
}

function SelectField<TFormValues>({ name, control, options, errors, ...restProps }: ISelectField<TFormValues>) {
  const { field } = useController({ name, control });
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  const onChange = (option: unknown) => {
    const newValue = option as IOption | IOption[];
    if (Array.isArray(newValue)) {
      field.onChange(newValue.map((v) => v.value));
    } else if ('value' in newValue) {
      field.onChange(newValue.value);
    }
  };

  const currentValue = useMemo(() => {
    return Array.isArray(options) ? options.find(({ value }) => field.value === value) : field.value;
  }, [field.value, options]);

  return (
    <FormControl>
      <Select
        {...field}
        isInvalid={hasError}
        name={name}
        options={options}
        value={currentValue}
        onChange={onChange}
        {...restProps}
      />
      <FormErrorMessage>{hasError && errorMessages.message}</FormErrorMessage>
    </FormControl>
  );
}

export default SelectField;
