import { useState, useRef } from 'react';
import {
  Box,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  useBreakpointValue,
  Image,
  useToast,
  Divider,
  useOutsideClick,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { CustomButton } from '@components/shared';
import logo from '@assets/images/logo.jpg';
import { useLogout } from '@queries/auth/auth-queries';
import avatarImg from '@assets/images/Abi-avatar.jpeg';
import { openModal, ModalTypes } from '@/redux/modal/modal.slice';
import { clearAccessToken, authSelector } from '@/redux/auth/auth.slice';
import { AvatarImg, UserBioWrapper } from './Header.styles';

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
  const [isUserBioOpen, setIsUserBioOpen] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  const authState = useAppSelector(authSelector);
  const toast = useToast();
  const dispatch = useAppDispatch();
  useOutsideClick({
    ref,
    handler: () => setIsUserBioOpen(false),
    enabled: isUserBioOpen,
  });

  const navigate = useNavigate();

  const { mutateAsync: logOutUser, isLoading } = useLogout();

  const handleBioToggle = () => {
    setIsUserBioOpen((prev) => !prev);
  };

  const handleOpenSettings = () => {
    console.log('Not implemented yet');
  };

  const handleLogout = async () => {
    toast.closeAll();
    try {
      await logOutUser();
      dispatch(clearAccessToken());
      navigate('/', { replace: true });
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
    <Stack flex={{ base: 1 }} justify="flex-end" direction="row">
      <Box mr={3} cursor="pointer">
        <FontAwesomeIcon icon={faBell} size="lg" />
      </Box>
      <Box cursor="pointer">
        <FontAwesomeIcon icon={faUser} size="lg" onClick={handleBioToggle} forwardedRef={ref} />
      </Box>
      <UserBioWrapper isOpen={isUserBioOpen}>
        <AvatarImg src={avatarImg} alt="avatar" />
        <Text textAlign="center" noOfLines={1} px="1rem" py="0.25em">
          {authState.user?.name}
        </Text>
        <Divider my="0.25rem" />
        <CustomButton variant="link" onClick={handleOpenSettings} width="100%" pt="0.75rem" pb="0.25rem">
          Settings
        </CustomButton>
        <CustomButton variant="link" onClick={handleLogout} disabled={isLoading} width="100%" py="0.25rem">
          Log out
        </CustomButton>
      </UserBioWrapper>
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
        py={{ base: 1 }}
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
