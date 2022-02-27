import { Box, Flex, Text, Stack, useColorModeValue, useBreakpointValue, Image } from '@chakra-ui/react';
import { CustomButton } from '@components/shared';
import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.jpg';

function Header() {
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

        <Stack flex={{ base: 1 }} justify="flex-end" direction="row" spacing={6}>
          <CustomButton fontSize="sm" fontWeight={400} variant="link">
            Login
          </CustomButton>
          <CustomButton
            onClick={() => console.log('Open modal with login on register')}
            colorScheme="green"
            bgGradient="linear(to-r, green.400, green.500, green.600)"
          >
            Register
          </CustomButton>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Header;
