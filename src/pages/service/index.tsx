import React from 'react';
import {
  Stack,
  Center,
} from '@chakra-ui/react';
import { Sidebar } from '../../components/sidebar';
import { Title } from '../../components/title';
import { Navbar } from '../../components/navbar';
import { NewService } from '../../components/newService';
import { List } from '../../components/list';

export const Service: React.FC = () => (
  <Stack>
    <Center
      backgroundColor="whitesmoke"
      justifyContent={['start', 'start', 'space-between']}
    >
      <Sidebar />
      <Title />
      <Navbar />
    </Center>
    <Center justifyContent="center">
      <NewService />
    </Center>
    <Center>
      <List />
    </Center>
  </Stack>
);
