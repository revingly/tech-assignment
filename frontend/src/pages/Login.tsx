import React, { useContext, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { AuthContext } from '@/context/AuthContext';
import { login } from "@/api/AuthApi";
import Navbar from "@/components/Navbar";
import { setItem } from "@/Utils/Storage";
import { useNavigate } from "react-router-dom";

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await login({ email, password });
      console.log(response);
      setItem('token', response.access_token);
      authContext.signIn();
      navigate('/movies');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <Box maxW="md" mx="auto" mt={8}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>
        <Button mt={4} colorScheme="teal" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </>
  );
};
