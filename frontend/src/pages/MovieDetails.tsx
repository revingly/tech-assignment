import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  List,
  ListItem,
  Center,
  Spinner,
} from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails } from '@/api/MoviesApi'
import { IMAGE_BASE_URL } from '@/Utils/constants'

export const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams()

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await getMovieDetails(movieId);
      setMovie(response);
      setLoading(false);
    };

    fetchMovieDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW={'7xl'}>
        {loading ? (
          <Center h="100vh"><Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'></Spinner></Center>) : (
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}>
            <Flex>
              <Image
                rounded={'md'}
                alt={movie.title}
                src={`${IMAGE_BASE_URL}/w500${movie.poster_path}`}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%' }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={'header'}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                  {movie.title}
                </Heading>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={'column'}
                divider={
                  <StackDivider borderColor={'gray.300'} />
                }>
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text fontSize={'lg'}>
                    {movie.overview}
                  </Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: '16px', lg: '18px' }}
                    color={'yellow.500'}
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    mb={'4'}>
                    Movie Details
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Genres:
                      </Text>{' '}
                      {movie.genres.map(el => el.name).join(', ')}
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Runtime:
                      </Text>{' '}
                      {movie.runtime} minutes
                    </ListItem>
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Release date:
                      </Text>{' '}
                      {movie.release_date}
                    </ListItem>
                  </List>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        )}
      </Container>
    </>
  )
}