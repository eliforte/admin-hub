import React from 'react';
import { Stack, Flex } from '@chakra-ui/react';
import { Sidebar } from '../../components/sidebar';
import { Title } from '../../components/title';
import { Navbar } from '../../components/navbar';
import { NewService } from '../../components/newService';

export const Service: React.FC = () => (
  <Stack>
    <Flex
      alignItems="center"
      justifyContent={['start', 'start', 'space-between']}
    >
      <Sidebar />
      <Title />
      <Navbar />
    </Flex>
    <Flex
      alignItems="center"
      justifyContent="center"
    >
      <NewService />
    </Flex>
  </Stack>
);
