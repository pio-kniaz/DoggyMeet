import { Flex, Stack, Heading, Text, useColorModeValue, HStack } from '@chakra-ui/react';

import { CustomButton } from '@components/shared';
import { useAppDispatch } from '@hooks/useRedux';
import SigninForm from '@components/modal/signin/signin-form/SigninForm';
import { openModal, ModalTypes } from '@/redux/modal/modal.slice';

function Signin() {
  const dispatch = useAppDispatch();
  const handleOpenRegistration = () => {
    dispatch(
      openModal({
        modalType: ModalTypes.SIGN_UP,
      }),
    );
  };
  return (
    <Flex align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} data-testid="signin-modal">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={10} width="100%">
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign in
          </Heading>
        </Stack>
        <SigninForm />
        <HStack justify="center">
          <Text fontSize="md">Dont have an account?</Text>
          <CustomButton variant="link" textDecoration="underline" colorScheme="green" onClick={handleOpenRegistration}>
            Register
          </CustomButton>
        </HStack>
      </Stack>
    </Flex>
  );
}

export default Signin;
