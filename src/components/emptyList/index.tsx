import React from 'react';
import { Center, Heading } from '@chakra-ui/react';
import { Warning } from '@mui/icons-material/';

export const EmptyList: React.FC = () => (
  <Center flexDirection="column" mt="50px" gap={5}>
    <Warning />
    <Heading
      color="#213b62"
      as="h3"
      size="md"
    >
      Ops! Nenhum atendimento encontrado
    </Heading>
  </Center>
);
