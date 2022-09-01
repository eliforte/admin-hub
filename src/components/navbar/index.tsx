import React from 'react';
import {
  Flex,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <Flex
      display={['none', 'none', 'flex']}
      flexDirection="row"
      gap={1}
      alignItems="center"
      backgroundColor="whitesmoke"
      borderRadius={5}
      m={5}
    >
      <Button
        p="10px"
        border="1px solid #00000029"
        variant="link"
        onClick={() => Navigate('/home/servicos')}
      >
        Serviços
      </Button>
      <Button
        p="10px"
        border="1px solid #00000029"
        variant="link"
        onClick={() => Navigate('/home/faturamento')}
      >
        Faturamentos
      </Button>
      <Button
        p="10px"
        border="1px solid #00000029"
        variant="link"
        onClick={() => Navigate('/home/detalhes')}
      >
        Detalhes
      </Button>
    </Flex>
  );
};
