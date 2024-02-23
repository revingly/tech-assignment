import React, { useEffect, useState } from 'react';
import { Box, Button, SimpleGrid, Text, Spinner, Center, Flex, Input, useToast } from '@chakra-ui/react';
import { getAll, searchMovieByName } from '@/api/MoviesApi';
import Navbar from '@/components/Navbar';
import { MoviesList } from '@/components/MoviesList';
import { MovieProps } from '@/types';
import { MOVIES_PAGE_TITLE } from '@/Utils/constants';

export const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const toast = useToast()

  async function searchMovie() {
    try {
      setMovies([]);
      setLoading(true);
      const response = await searchMovieByName(search);
      setMovies(response.results);
      setPageTitle(`Search results for ${search}`);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Api Error!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchMovies() {
    try {
      setLoading(true);
      const response = await getAll();
      setMovies(response.results);
      setPageTitle(MOVIES_PAGE_TITLE);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Api Error!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies().then();
  }, []);

  return (
    <>
      <Navbar />
      <Flex flexDirection="column" alignItems="center" gap={4}>
        <Box p='10' display="flex" justifyContent="space-between" width={'100%'} alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            {pageTitle}
          </Text>
          <Flex gap={2}>
            <Input placeholder='Search movies' onChange={(e) => setSearch(e.target.value)} />
            <Button onClick={searchMovie}>Search</Button>
            <Button onClick={fetchMovies}>Reset</Button>
          </Flex>
        </Box>
        <Box p={10}>
          {loading ? (
            <Center h="100vh">
              <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5}>
              {movies.map((movie) => (
                <MoviesList key={movie.id} movie={movie} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </>
  );


};