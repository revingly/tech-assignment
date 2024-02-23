import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text, Spinner, Center, Flex, useToast } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { MoviesList } from '@/components/MoviesList';
import { getItem } from '@/Utils/Storage';

export const Favorites: React.FC = () => {
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(false);
  const toast = useToast()

  function fetchFavoriteMovies() {
    try {
      setLoading(true);
      const favorites = JSON.parse(getItem('favorites') as string);
      setMovies(favorites);
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
    fetchFavoriteMovies();
  }, []);

  return (
    <>
      <Navbar />
      <Flex flexDirection="column" alignItems="center" gap={4}>
        <Box p='10' display="flex" justifyContent="space-between" width={'100%'} alignItems="center">
          <Text fontSize="xl" fontWeight="bold">
            Favorite Movies
          </Text>
        </Box>
        <Box p={10}>
          {loading ? (
            <Center h="100vh">
              <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
            </Center>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={5}>
              {Object.values(movies).map((movie) => (
                <MoviesList key={movie.id} movie={movie} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </>
  );


};