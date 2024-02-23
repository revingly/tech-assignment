import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

export default function CallToActionWithAnnotation() {
  return (
    <>
      <Navbar />
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}
          >
            Join Today and check our movie list!
          </Heading>
          <Text color={'gray.500'}>{/* Add any additional text here */}</Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            {/* Use the Link component to navigate to the login page */}
            <Link to="/login">
              <Button
                colorScheme={'green'}
                bg={'green.400'}
                rounded={'full'}
                px={6}
                _hover={{
                  bg: 'green.500',
                }}
              >
                Get Started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
