import React from 'react';
import {
  Stack,
  Divider,
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
      justifyContent={['start', 'start', 'space-between']}
    >
      <Sidebar />
      <Title />
      <Navbar />
    </Center>
    <Center h="50px">
      <Divider w="96%" alignSelf="center" />
    </Center>
    <Center justifyContent="flex-end">
      <NewService />
    </Center>
    <Center>
      <List />
    </Center>
  </Stack>
);
