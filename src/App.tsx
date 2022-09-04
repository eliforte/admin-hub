import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import theme from './styles';
import { Login } from './pages/login';
import { Service } from './pages/service';
import { Invoicing } from './pages/invoicing';
import { Details } from './pages/details';

export const App = () => (
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/atendimentos" element={<Service />} />
        <Route path="/home/faturamentos" element={<Invoicing />} />
        <Route path="/home/detalhes/:id" element={<Details />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
