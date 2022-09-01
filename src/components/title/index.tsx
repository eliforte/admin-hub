import React from 'react';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const Title: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <Box
      m="10px"
    >
      <Button
        bg="transparent"
        _hover={{ bg: 'transparent' }}
        onClick={() => Navigate('/home/servicos')}
      >
        <Heading color="#718096">Admin Hub</Heading>
      </Button>
    </Box>
  );
};
