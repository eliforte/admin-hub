import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const Loading: React.FC = () => (
  <Center color="blue.600" height="100vh">
    Carregando
    <Spinner ml="5px" color="blue.600" size="lg" />
  </Center>
);
