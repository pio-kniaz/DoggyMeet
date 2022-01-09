import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  Container,
  Box,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import {CustomButton, InputField} from '@/components/shared';
import {
  registerValidationSchema,
  IRegisterUser,
} from './registerValidationSchema';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm<IRegisterUser>({
    // mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(registerValidationSchema),
  });

  const handleOnSubmit = (values: IRegisterUser) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        resolve('');
      }, 500);
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="420" pointerEvents={isSubmitting ? 'none' : 'auto'}>
      <Text fontSize="2xl" mb="3" textAlign="center">
        Create Account
      </Text>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Box mb="2">
          <InputField
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
          <InputField
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
          <InputField
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
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    size="xs"
                  />
                </CustomButton>
              </InputRightElement>
            }
          />
        </Box>
        <CustomButton
          display="flex"
          mx="auto"
          px="10"
          mt="4"
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </CustomButton>
      </form>
    </Container>
  );
}

export default RegisterForm;
