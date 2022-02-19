import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import isArray from 'lodash/isArray';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, InputLeftElement, InputRightElement, useToast } from '@chakra-ui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useUserCreate } from '@queries/users/users-queries';
import { CustomButton, InputField } from '@components/shared';
import { isApiError } from '@helpers/index';
import { signupValidationSchema, ISignup } from './signupValidationSchema';

const defaultValues = {
  name: '',
  email: '',
  password: '',
};

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    reset,
  } = useForm<ISignup>({
    defaultValues,
    resolver: yupResolver(signupValidationSchema),
  });
  const { isLoading, mutateAsync } = useUserCreate();

  const handleOnSubmit = async (values: ISignup) => {
    try {
      await mutateAsync(values);
      // TODO: ADD SUCCESS TOAST.
      const toastId = 'register-form-success';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          position: 'top-right',
          title: 'Account created.',
          description: `Thank ${values.name} for joining us 🐶`,
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
      }
      reset(defaultValues);
    } catch (err: unknown) {
      console.log(isApiError(err), 'isAxios');
      if (isApiError(err)) {
        if (isArray(err.response?.data?.metaData?.fieldsError)) {
          err.response?.data?.metaData?.fieldsError?.forEach((elem: Record<string, string>, index: number) => {
            const fieldName = Object.keys(elem)[index] as keyof ISignup;
            setError(fieldName, {
              type: 'manual',
              message: elem[fieldName],
            });
          });
        } else {
          const toastId = 'register-form-error';
          if (!toast.isActive(toastId)) {
            toast({
              id: toastId,
              position: 'top-right',
              title: 'Account not created.',
              description: `Unable to create account`,
              status: 'error',
              duration: 2500,
              isClosable: true,
            });
          }
        }
      }
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box pointerEvents={isLoading ? 'none' : 'auto'} data-testid="register-form">
      <form onSubmit={handleSubmit(handleOnSubmit)} autoComplete="off">
        <Box mb="2">
          <InputField<ISignup>
            name="name"
            label="Name"
            register={register}
            placeholder="Name"
            errors={errors}
            variant="filled"
            inputLeftElement={
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                fontSize="1.2em"
                // eslint-disable-next-line react/no-children-prop
                children={<FontAwesomeIcon icon={faUser} size="xs" />}
              />
            }
            borderRadius="2px"
          />
        </Box>
        <Box mb="2">
          <InputField<ISignup>
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
          <InputField<ISignup>
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
    </Box>
  );
}

export default SignupForm;
