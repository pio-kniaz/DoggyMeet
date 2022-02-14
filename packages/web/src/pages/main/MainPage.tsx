import React from 'react';
import BasicLayout from '@components/layouts/basic-layout/BasicLayout';
import { Image, AspectRatio, Heading, Box, Text, List, ListItem } from '@chakra-ui/react';
import { faInfoCircle, faHandsHelping, faPaw } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import girlWithDogImg from '@assets/icons/girl-with-dog.svg';
import { CustomButton } from '@components/shared';

function MainPage() {
  return (
    <BasicLayout>
      <Box padding="3rem 0">
        <Heading fontSize="4xl" textAlign="center" marginBottom="3rem" marginTop="1rem">
          Tworz wspaniala psia społeczność i pomagaj sobie wzajemnie.
        </Heading>
        <AspectRatio maxW="320px" ratio={1 / 1} margin="auto">
          <Image objectFit="cover" src={girlWithDogImg} alt="Girl with Dog" margin="auto" />
        </AspectRatio>
        <Box maxWidth="600" textAlign="left" margin="2rem auto">
          <List spacing={3}>
            <ListItem display="flex" alignItems="baseline">
              <FontAwesomeIcon icon={faInfoCircle} size="1x" />
              <Text fontSize="xl" marginLeft="1rem">
                {' '}
                Dodaj informacje o potrzebie spaceru dla Twgojego psa.
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="baseline">
              <FontAwesomeIcon icon={faHandsHelping} size="1x" />
              <Text fontSize="xl" marginLeft="1rem">
                {' '}
                Pomoz innym zabierajac na spacer czyjegos psa.
              </Text>
            </ListItem>
            {/* <ListItem display="flex" alignItems="baseline">
              <FontAwesomeIcon icon={faSearch} size="1x" />
              <Text fontSize="lg" marginLeft="1rem">
                {' '}
                Sprawdz jakie psy znajduja sie na wybiegach
              </Text>
            </ListItem>
            <ListItem display="flex" alignItems="baseline">
              <FontAwesomeIcon icon={faCalendar} size="1x" />
              <Text fontSize="lg" marginLeft="1rem">
                {' '}
                Organizuj wpsolne zabawy dla psów
              </Text>
            </ListItem> */}
          </List>
        </Box>
        <Box maxWidth="300px" margin="auto">
          <CustomButton
            onClick={() => console.log('Open modal with login on register')}
            width="100%"
            display="flex"
            rightIcon={<FontAwesomeIcon icon={faPaw} size="1x" />}
            colorScheme="green"
            variant="outline"
            margin="1.5rem auto"
            padding="1.45rem"
          >
            Dołącz do nas!
          </CustomButton>
        </Box>
      </Box>
    </BasicLayout>
  );
}

export default MainPage;
