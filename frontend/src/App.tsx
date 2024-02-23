import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Movies } from './pages/Movies';
import Home from './pages/Home';
import AuthProvider from "./context/AuthContext";
import Protected from './components/Protected';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';

const App: React.FC = () => {
  return (
    <ChakraProvider>

      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<Protected><Movies /></Protected>} />
            <Route path="/movies/:movieId" element={<Protected><MovieDetails /></Protected>} />
            <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;
