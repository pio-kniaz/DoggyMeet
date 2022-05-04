import React from 'react';
import { Box } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { InputField, CustomButton, TextAreaField } from '@components/shared';
import { announcementFormValidationSchema } from './announcementFormValidationSchema';

const defaultValues = {
  city: '',
  description: '',
};
type FormData = {
  city: string;
  description: string;
};

function AnnouncementForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(announcementFormValidationSchema),
  });

  const handleOnSubmit = (values: FormData) => {
    console.log(values);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
      <Box mb="2">
        <InputField<FormData> register={register} name="city" label="City" placeholder="City" errors={errors} />
      </Box>
      <Box mb="2">
        <TextAreaField<FormData>
          register={register}
          errors={errors}
          name="description"
          label="Description"
          placeholder="Description"
          minRows={8}
          maxRows={14}
          style={{
            width: '100%',
          }}
        />
      </Box>
      <CustomButton
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        display="flex"
        mx="auto"
        px="10"
        mt="4"
        colorScheme="green"
        type="submit"
      >
        Add
      </CustomButton>
    </form>
  );
}

export default AnnouncementForm;
