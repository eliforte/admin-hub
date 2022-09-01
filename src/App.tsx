import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import theme from './styles';
import { Login } from './pages/login';
import { Service } from './pages/service';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/atendimentos" element={<Service />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
