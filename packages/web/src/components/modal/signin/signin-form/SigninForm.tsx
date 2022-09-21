import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import isPlainObject from 'lodash/isPlainObject';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import { InputField, CustomButton } from '@components/shared';
import { useLogin } from '@queries/auth/auth-queries';
import { useAppDispatch } from '@hooks/useRedux';
import { isApiError, setFieldsError } from '@helpers/index';
import { closeModal } from '@/redux/modal/modal.slice';
import { setAccessToken } from '@/redux/auth/auth.slice';
import { signinValidationSchema, Signin } from './signinValidationSchema';

const defaultValues = {
  email: process.env.__DEV__ ? process.env.login : '',
  password: process.env.__DEV__ ? process.env.password : '',
} as const;

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading, mutate } = useLogin();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
    reset,
  } = useForm<Signin>({
    defaultValues,
    resolver: yupResolver(signinValidationSchema),
  });
  const handleOnSubmit = async (values: Signin) => {
    const toastId = 'signin-toast';
    toast.closeAll();
    mutate(values, {
      onSuccess: (data) => {
        reset(defaultValues);
        dispatch(closeModal());
        dispatch(setAccessToken({ accessToken: data.accessToken }));
      },
      onError(err) {
        if (isApiError(err)) {
          const fieldsError = err.response?.data?.metaData?.fieldsError;
          if (isPlainObject(fieldsError)) {
            setFieldsError({
              fieldsError,
              setError,
            });
          } else if (err.response?.data?.metaData?.message && !toast.isActive(toastId)) {
            toast({
              id: toastId,
              position: 'top-right',
              title: 'Unable to login.',
              description: err.response?.data?.metaData?.message ?? '',
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          } else if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              position: 'top-right',
              title: 'Unable to login.',
              description: 'Something went wrong',
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          }
        }
      },
    });
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
      <Box mb="2">
        <InputField<Signin>
          type="text"
          name="email"
          label="Email"
          register={register}
          placeholder="Email"
          errors={errors}
          variant="filled"
          inputLeftElement={
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              // eslint-disable-next-line react/no-children-prop
              children={<FaEnvelope size="1.25rem" />}
            />
          }
          borderRadius="2px"
        />
      </Box>
      <Box mb="2">
        <InputField<Signin>
          name="password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          register={register}
          placeholder="Password"
          errors={errors}
          variant="filled"
          inputLeftElement={
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2em"
              // eslint-disable-next-line react/no-children-prop
              children={<FaLock size="1.25rem" />}
            />
          }
          borderRadius="2px"
          inputRightElement={
            <InputRightElement>
              <CustomButton variant="unstyled" onClick={handleShowPassword}>
                {showPassword ? <FaEye size="1.25rem" /> : <FaEyeSlash size="1.25rem" />}
              </CustomButton>
            </InputRightElement>
          }
        />
      </Box>
      <CustomButton
        bgGradient="linear(to-r, green.400, green.500, green.600)"
        display="flex"
        mx="auto"
        px="10"
        mt="4"
        colorScheme="green"
        isLoading={isLoading}
        type="submit"
      >
        Submit
      </CustomButton>
    </form>
  );
}

export default SigninForm;
