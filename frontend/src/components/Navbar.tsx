import React, { useState, useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Spacer,
  Link,
  Button,
  useDisclosure,
  IconButton,
  Collapse,
  useToast,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { AuthContext } from '@/context/AuthContext';
import { logout } from "@/api/AuthApi";
import { AuthStatus } from '@/types';
import { removeItem } from '@/Utils/Storage';

const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(authContext.authStatus);
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response);
      authContext.signOut();
      setIsLoggedIn(AuthStatus.SignedOut);
      removeItem('token');
      navigate('/');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Api Error!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="gray.800" color="white" p={4}>
      <Flex align="center">
        <Box>
          <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold">
            My App
          </Link>
        </Box>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }}>
          <Link as={RouterLink} to="/movies" mr={4}>
            Movies
          </Link>
          {isLoggedIn ? (
            <>
              <Link as={RouterLink} to="/favorites" mr={4}>
                Favorites
              </Link>
              <Button colorScheme="teal" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link as={RouterLink} to="/login" mr={4}>
                Login
              </Link>
              <Link as={RouterLink} to="/register">
                Register
              </Link>
            </>
          )}
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            aria-label="Toggle menu"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={onToggle}
          />
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <Box mt={4}>
          <Link as={RouterLink} to="/movies" display="block" mb={2}>
            Movies
          </Link>
          {isLoggedIn ? (
            <Button colorScheme="teal" onClick={handleLogout} w="100%">
              Logout
            </Button>
          ) : (
            <>
              <Link as={RouterLink} to="/login" display="block" mb={2}>
                Login
              </Link>
              <Link as={RouterLink} to="/register" display="block">
                Register
              </Link>
            </>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default Navbar;
