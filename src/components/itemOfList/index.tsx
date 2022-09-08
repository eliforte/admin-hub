/* eslint-disable camelcase */
import React from 'react';
import {
  Grid,
  GridItem,
  Text,
  Heading,
} from '@chakra-ui/react';
import { IDataProps } from '../../interfaces';
import { calculateStatus } from './utils';

export const ItemOfList: React.FC<IDataProps> = (props) => {
  const {
    type,
    pacient_fullname,
    form_of_payment,
    total,
    last_payment,
    next_payment,
    installment_value,
    quantity_installments_paid,
    quantity_installments,
  } = props;

  const status = calculateStatus(
    String(next_payment),
    form_of_payment,
    String(last_payment),
    quantity_installments_paid,
    quantity_installments,
  );

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']}
      gap={4}
      w="100%"
      borderRadius={5}
      alignItems="center"
      justifyItems="start"
      backgroundColor="whitesmoke"
      p={5}
      mb={7}
    >
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading color="#213b62" as="h4" size="sm">Paciente:</Heading>
        <Text color="gray.500" mt={5}>{ pacient_fullname }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading color="#213b62" as="h4" size="sm">Procedimento:</Heading>
        <Text color="gray.500" mt={5}>{ type }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading color="#213b62" as="h4" size="sm">Status do pagamento:</Heading>
        <Text
          mt={5}
          borderRadius={5}
          maxW={status === 'Atrasado' ? '90px' : '60px'}
          p="2px 0 2px 12px"
          color="whitesmoke"
          backgroundColor={status}
        >
          { status }
        </Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading color="#213b62" as="h4" size="sm">Forma de pagamento:</Heading>
        <Text color="gray.500" mt={5}>{ form_of_payment }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading color="#213b62" as="h4" size="sm">Total a receber:</Heading>
        <Text
          maxW="100px"
          borderRadius={5}
          p="2px 0 2px 12px"
          mt={5}
          color="whitesmoke"
          backgroundColor={status}
        >
          {
            `R$ ${
              form_of_payment === 'Parcelamento'
                ? String(installment_value).replace('.', ',')
                : String(total).replace('.', ',')
            }`
          }
        </Text>
      </GridItem>
    </Grid>
  );
};
