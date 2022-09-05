import React from 'react';
import {
  Center,
  Heading,
} from '@chakra-ui/react';

interface IMessageProps {
  name: string;
}

export const HelloMessage: React.FC<IMessageProps> = ({ name }) => (
  <Center
    justifyContent="flex-end"
  >
    <Heading
      color="whitesmoke"
      as="h3"
      size="md"
      mt={5}
      mr={5}
      mb={10}
    >
      {`Olá, ${name}`}
    </Heading>
  </Center>
);
