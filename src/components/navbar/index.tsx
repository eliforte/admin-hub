import React from 'react';
import {
  Flex,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    Navigate('/');
  };

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
        onClick={() => Navigate('/home/atendimentos')}
      >
        Atendimentos
      </Button>
      <Button
        p="10px"
        border="1px solid #00000029"
        variant="link"
        onClick={() => Navigate('/home/faturamentos')}
      >
        Faturamentos
      </Button>
      <Button
        ml="20px"
        p="10px 20px"
        border="1px solid #2B6CB0"
        backgroundColor="#213b62"
        color="whitesmoke"
        _hover={{ backgroundColor: '#0d1d34' }}
        onClick={() => logout()}
      >
        Sair
      </Button>
    </Flex>
  );
};
