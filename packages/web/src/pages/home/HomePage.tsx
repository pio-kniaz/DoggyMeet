import React from 'react';
import { Image, AspectRatio, Heading, Box, Text, List, ListItem } from '@chakra-ui/react';
import { faInfoCircle, faHandsHelping, faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import girlWithDogImg from '@assets/icons/girl-with-dog.svg';
import { CustomButton } from '@components/shared';
import { useAppDispatch } from '@hooks/useRedux';
import { ModalTypes, openModal } from '@/redux/modal/modal.slice';

function HomePage() {
  const dispatch = useAppDispatch();
  const handleOpenRegistration = () =>
    dispatch(
      openModal({
        modalType: ModalTypes.SIGN_UP,
      }),
    );

  return (
    <Box padding="3rem 0">
      <Heading fontSize="4xl" textAlign="center" marginBottom="3rem" marginTop="1rem">
        Create a great canine community and help each other.
      </Heading>
      <AspectRatio maxW="320px" ratio={1 / 1} margin="auto">
        <Image objectFit="cover" src={girlWithDogImg} alt="Girl with Dog" margin="auto" />
      </AspectRatio>
      <Box maxWidth="600" textAlign="left" margin="2rem auto">
        <List spacing={3} aria-label="info-list">
          <ListItem display="flex" alignItems="baseline">
            <FontAwesomeIcon icon={faInfoCircle} size="1x" />
            <Text fontSize="xl" marginLeft="1rem">
              {' '}
              Add information about the need for a walk for your dog.
            </Text>
          </ListItem>
          <ListItem display="flex" alignItems="baseline">
            <FontAwesomeIcon icon={faHandsHelping} size="1x" />
            <Text fontSize="xl" marginLeft="1rem">
              {' '}
              Help others by taking someone&apos;s dog for a walk.
            </Text>
          </ListItem>
        </List>
      </Box>
      <Box maxWidth="300px" margin="auto">
        <CustomButton
          onClick={handleOpenRegistration}
          width="100%"
          display="flex"
          rightIcon={<FontAwesomeIcon icon={faPaw} size="1x" />}
          colorScheme="green"
          bgGradient="linear(to-r, green.400, green.500, green.600)"
          margin="1.5rem auto"
          padding="1.45rem"
        >
          Join us!
        </CustomButton>
      </Box>
    </Box>
  );
}

export default HomePage;
