import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { InputField, CustomButton } from '@components/shared';
import { useAuthLogin } from '@queries/auth/auth-queries';
import { useAppDispatch } from '@hooks/useRedux';
import { isApiError } from '@helpers/index';
import { closeModal } from '@/redux/modal/modal.slice';
import { setUser } from '@/redux/auth/auth.slice';
import { signinValidationSchema, Signin } from './signinValidationSchema';

const defaultValues = {
  email: '',
  password: '',
} as const;

function SigninForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isLoading, mutateAsync } = useAuthLogin();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<Signin>({
    defaultValues,
    resolver: yupResolver(signinValidationSchema),
  });
  const handleOnSubmit = async (values: Signin) => {
    try {
      const { accessToken } = await mutateAsync(values);
      const toastId = 'login-form-success';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          position: 'top-right',
          title: 'Login success',
          description: '',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      }
      reset(defaultValues);
      dispatch(closeModal());
      dispatch(setUser({ accessToken }));
    } catch (err: unknown) {
      const toastId = 'login-form-error';
      if (isApiError(err)) {
        if (err.response?.data?.metaData?.message && !toast.isActive(toastId)) {
          toast({
            id: toastId,
            position: 'top-right',
            title: 'Unable to login.',
            description: err.response?.data?.metaData?.message ?? '',
            status: 'error',
            duration: 2500,
            isClosable: true,
          });
        } else {
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
    }
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
              children={<FontAwesomeIcon icon={faEnvelope} size="xs" />}
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
              children={<FontAwesomeIcon icon={faLock} size="xs" />}
            />
          }
          borderRadius="2px"
          inputRightElement={
            <InputRightElement>
              <CustomButton variant="unstyled" onClick={handleShowPassword}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} size="xs" />
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
