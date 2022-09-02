import React from 'react';
import {
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';
import { Sidebar } from '../../components/sidebar';
import { Title } from '../../components/title';
import { Navbar } from '../../components/navbar';
import { NewService } from '../../components/newService';
import { List } from '../../components/list';

export const Service: React.FC = () => {
  const [created, setCreated] = React.useState(false);

  return (
    <Stack>
      <Center
        backgroundColor="whitesmoke"
        justifyContent={['start', 'start', 'space-between']}
      >
        <Sidebar />
        <Title />
        <Navbar />
      </Center>
      <Center justifyContent="flex-end">
        <NewService setCreated={setCreated} />
      </Center>
      <Center
        backgroundColor="whiteAlpha.800"
        maxW="100vw"
        flexDirection="column"
      >
        <Heading m={5} color="#213b62">Atendimentos</Heading>
        <List created={created} />
      </Center>
    </Stack>
  );
};
