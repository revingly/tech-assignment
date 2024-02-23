import { getItem, setItem } from '@/Utils/Storage';
import { IMAGE_BASE_URL } from '@/Utils/constants';
import { MovieProps } from '@/types';
import { CardBody, Stack, Heading, Divider, CardFooter, Flex, Button, Spacer, Card, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export function MoviesList({ movie }: { movie: MovieProps }) {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkIfFavorite = () => {
      const favoritesFromStorage = JSON.parse(getItem('favorites') as string) || {};
      if (favoritesFromStorage[movie.id] !== undefined) setIsFavorited(true);
    };

    checkIfFavorite();
  }, []);

  function toggleFavorite(id: number): void {
    const favoritesFromStorage = JSON.parse(getItem('favorites') as string) || {};

    if (favoritesFromStorage[id] !== undefined) {
      const { [id]: _, ...rest } = favoritesFromStorage;
      setItem('favorites', JSON.stringify(rest));
      setIsFavorited(false);
    } else {
      favoritesFromStorage[id] = { ...movie };
      setIsFavorited(true);
      setItem('favorites', JSON.stringify(favoritesFromStorage));
    }
  }

  function goToDetails(id: number): void {
    navigate('/movies/' + id);
  }

  return (
    <Card maxW='sm' >
      <CardBody justifyItems={'center'}>
        <Image
          src={`${IMAGE_BASE_URL}/w300${movie.poster_path}`}
          alt={movie.title}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{movie.title}</Heading>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex minWidth='max-content' flex={'auto'} alignItems='center' gap='2'>
          <Button variant='solid' colorScheme='blue' onClick={() => goToDetails(movie.id)}>
            details
          </Button>
          <Spacer />
          {isFavorited ?
            (<MdOutlineFavorite color='red' size={'30px'} onClick={() => toggleFavorite(movie.id)} />) :
            (<MdOutlineFavoriteBorder color='red' size={'30px'} onClick={() => toggleFavorite(movie.id)} />)
          }
        </Flex>
      </CardFooter>
    </Card>
  )
}
