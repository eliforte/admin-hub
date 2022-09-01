import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const Loading: React.FC = () => (
  <Center height="100vh">
    Carregando
    <Spinner size="lg" />
  </Center>
);
