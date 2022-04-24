import { Box, Flex, Text, Stack, useColorModeValue, useBreakpointValue, Image, useToast } from '@chakra-ui/react';

import { useAppDispatch } from '@hooks/useRedux';
import { CustomButton } from '@components/shared';
import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.jpg';
import { useLogout } from '@queries/auth/auth-queries';
import { openModal, ModalTypes } from '@/redux/modal/modal.slice';
import { clearAccessToken } from '@/redux/auth/auth.slice';

interface IHeader {
  type?: 'basic' | 'main';
}

function BasicHeader() {
  const dispatch = useAppDispatch();
  const handleOpenRegistration = () => {
    dispatch(
      openModal({
        modalType: ModalTypes.SIGN_UP,
      }),
    );
  };
  const handleOpenLogin = () => {
    dispatch(
      openModal({
        modalType: ModalTypes.SIGN_IN,
      }),
    );
  };
  return (
    <Stack flex={{ base: 1 }} justify="flex-end" direction="row" spacing={6}>
      <CustomButton fontSize="sm" fontWeight={400} variant="link" onClick={handleOpenLogin}>
        Login
      </CustomButton>
      <CustomButton
        onClick={handleOpenRegistration}
        colorScheme="green"
        bgGradient="linear(to-r, green.400, green.500, green.600)"
      >
        Register
      </CustomButton>
    </Stack>
  );
}

function MainHeader() {
  const toast = useToast();
  const dispatch = useAppDispatch();

  const { mutateAsync: logOutUser, isLoading } = useLogout();

  const handleLogout = async () => {
    toast.closeAll();
    try {
      await logOutUser();
      dispatch(clearAccessToken());
    } catch (error) {
      toast({
        position: 'top-right',
        title: '',
        description: 'Something went wrong',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
    }
  };
  return (
    <Stack flex={{ base: 1 }} justify="flex-end" direction="row" spacing={6}>
      <CustomButton variant="link" onClick={handleLogout} disabled={isLoading}>
        Log out
      </CustomButton>
    </Stack>
  );
}

function Header({ type }: IHeader) {
  return (
    <Box
      data-testid="header"
      as="header"
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      <Flex
        maxW="container.xl"
        margin="auto"
        width="100%"
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        align="center"
        py={{ base: 2 }}
        px={{ base: 4 }}
      >
        <Flex flex={1} justify="start">
          <CustomButton variant="link" as="span">
            <Link to="/">
              <Text
                textAlign={useBreakpointValue({ base: 'left' })}
                fontFamily="heading"
                color={useColorModeValue('gray.800', 'white')}
              >
                <Image src={logo} boxSize="80px" objectFit="contain" alt="Doggy Meet" />
              </Text>
            </Link>
          </CustomButton>
        </Flex>
        {type === 'basic' && <BasicHeader />}
        {type === 'main' && <MainHeader />}
      </Flex>
    </Box>
  );
}

export default Header;
