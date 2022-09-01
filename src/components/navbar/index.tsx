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
      gap={5}
      alignItems="center"
      backgroundColor="whitesmoke"
      p={15}
      borderRadius={5}
      m={5}
      boxShadow="0px 5px 15px 5px rgba(0,0,0,0.54)"
    >
      <Button
        variant="link"
        onClick={() => Navigate('/home/servicos')}
      >
        Serviços
      </Button>
      <Button
        variant="link"
        onClick={() => Navigate('/home/faturamento')}
      >
        Faturamentos
      </Button>
      <Button
        variant="link"
        onClick={() => Navigate('/home/detalhes')}
      >
        Detalhes
      </Button>
    </Flex>
  );
};
