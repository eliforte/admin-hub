import React from 'react';
import {
  Flex,
  Box,
  Button,
  Heading,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar';
import { Sidebar } from '../sidebar';

export const CustomHeading: React.FC = () => {
  const Navigate = useNavigate();

  return (
    <Flex
      backgroundColor="whitesmoke"
      alignItems="center"
      justifyContent={['start', 'start', 'space-between']}
    >
      <Sidebar />
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
      <Navbar />
    </Flex>
  );
};
