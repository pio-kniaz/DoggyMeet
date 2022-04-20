import { Flex, Stack, Heading, Text, useColorModeValue, HStack } from '@chakra-ui/react';

import { CustomButton } from '@components/shared';
import { useAppDispatch } from '@hooks/useRedux';
import SignupForm from '@/components/modal/signup/signup-form/SignupForm';
import { openModal, ModalTypes } from '@/redux/modal/modal.slice';

function Signup() {
  const dispatch = useAppDispatch();
  const handleOpenLogin = () => {
    dispatch(
      openModal({
        modalType: ModalTypes.SIGN_IN,
      }),
    );
  };
  return (
    <Flex align="center" justify="center" bg={useColorModeValue('gray.50', 'gray.800')} data-testid="signup-modal">
      <Stack spacing={8} mx="auto" maxW="lg" py={12} px={10} width="100%">
        <Stack align="center">
          <Heading fontSize="4xl" textAlign="center">
            Sign up
          </Heading>
          <Text fontSize="lg" color="gray.600">
            to enjoy all of our cool features
          </Text>
        </Stack>
        <SignupForm />
        <HStack justify="center">
          <Text fontSize="md">Already a user?</Text>
          <CustomButton variant="link" textDecoration="underline" colorScheme="green" onClick={handleOpenLogin}>
            Login
          </CustomButton>
        </HStack>
      </Stack>
    </Flex>
  );
}

export default Signup;
