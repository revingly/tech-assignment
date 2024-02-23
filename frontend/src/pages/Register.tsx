import React, { useState } from 'react';
import { Alert, AlertDescription, AlertIcon, Box, Button, Center, FormControl, FormLabel, Input, Spinner, useToast } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import { register } from '@/api/AuthApi';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrors({});

    // Perform validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await register({
        name,
        email,
        password,
        password_confirmation,
      });
      console.log(response.data);
      navigate('/login');
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
  };

  const validateForm = () => {
    const errors = {};

    if (!name) errors.name = 'Name is required';
    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';
    if (!password_confirmation) errors.password_confirmation = 'Password confirmation is required';
    if (password !== password_confirmation)
      errors.password_confirmation = 'Passwords do not match';

    return errors;
  };

  function Errors() {
    if (Object.keys(errors).length > 0) {
      return (
        Object.values(errors).map(
          (error) => <Alert key={error} status="error">
            <AlertIcon />
            <AlertDescription>
            {error}
          </AlertDescription>
            </Alert>
        )
      );
    }
    return null;
  }

  return (
    <>
      <Navbar />
      <Box maxW="md" mx="auto" mt={8}>
        {loading ? (
          <Center h="100vh">
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          </Center>
        ) : (
          <>
            <Errors />
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={name} onChange={(e) => setName(e.target.value)} isInvalid={!!errors.name} />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} isInvalid={!!errors.password} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password Confirmation</FormLabel>
              <Input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} isInvalid={!!errors.password_confirmation} />
            </FormControl>
            <Button mt={4} colorScheme="teal" onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </Box>
    </>
  );
};