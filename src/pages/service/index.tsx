import React from 'react';
import {
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';
import { CustomHeading } from '../../components/customHeading';
import { NewService } from '../../components/newService';
import { List } from '../../components/list';

export const Service: React.FC = () => {
  const [created, setCreated] = React.useState(false);
  const user = JSON.parse(String(localStorage.getItem('user')));

  return (
    <Stack>
      <CustomHeading />
      <Center
        flexDirection="column"
        alignItems="flex-end"
      >
        <Heading
          color="whitesmoke"
          as="h3"
          size="md"
          mt={5}
          mr={5}
        >
          {`Olá, ${user.name}`}
        </Heading>
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
