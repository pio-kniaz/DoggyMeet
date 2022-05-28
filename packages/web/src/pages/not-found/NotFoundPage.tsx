import { Box, Heading, Text } from '@chakra-ui/react';
import { CustomLink } from '@components/shared';

function NotFoundPage() {
  return (
    <Box
      data-testid="not-found-page"
      textAlign="center"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
      justifyContent="center"
    >
      <Heading
        display="inline-block"
        as="h2"
        fontSize="8xl"
        bgGradient="linear(to-r, green.400, green.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="1.75rem" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text mb={6}>The page you&apos;re looking for does not seem to exist</Text>
      <CustomLink
        color="white"
        to="/"
        variant="solid"
        colorScheme="green"
        bgGradient="linear(to-r, green.400, green.500, green.600)"
      >
        Go to Home
      </CustomLink>
    </Box>
  );
}

export default NotFoundPage;
