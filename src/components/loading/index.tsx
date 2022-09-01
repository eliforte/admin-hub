import React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

export const Loading: React.FC = () => (
  <Center color="whitesmoke" height="100vh">
    Carregando
    <Spinner color="whitesmoke" size="lg" />
  </Center>
);
