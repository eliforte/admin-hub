/* eslint-disable camelcase */
import React from 'react';
import {
  Grid,
  GridItem,
  Text,
  Heading,
} from '@chakra-ui/react';
import { IDataProps } from './interface';
import { calculateStatus } from './utils';

export const ItemOfList: React.FC<IDataProps> = (props) => {
  const {
    type,
    pacient_fullname,
    payment_method,
    form_of_payment,
    quantity_installments,
    total,
    quantity_installments_paid,
    next_payment,
    installment_value,
  } = props;

  const status = calculateStatus(String(next_payment), form_of_payment);

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={4}
      w="100%"
      borderRadius={5}
      alignItems="center"
      justifyItems="start"
      backgroundColor="whitesmoke"
      p={5}
      mb={7}
      boxShadow="0px 5px 15px 5px rgba(0,0,0,0.54)"
    >
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading as="h4" size="sm">Paciente:</Heading>
        <Text mt={5}>{ pacient_fullname }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading as="h4" size="sm">Serviço:</Heading>
        <Text mt={5}>{ type }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading as="h4" size="sm">Status do pagamento:</Heading>
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
        <Heading as="h4" size="sm">Método de pagamento:</Heading>
        <Text mt={5}>{ payment_method }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading as="h4" size="sm">Forma de pagamento:</Heading>
        <Text mt={5}>{ form_of_payment }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
        display={form_of_payment === 'Parcelamento' ? 'block' : 'none'}
      >
        <Heading as="h4" size="sm">Próximo pagamento:</Heading>
        <Text mt={5}>{ new Date(String(next_payment)).toLocaleDateString('pt-BR') }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
        display={form_of_payment === 'Parcelamento' ? 'block' : 'none'}
      >
        <Heading as="h4" size="sm">Qnt. de parcelas:</Heading>
        <Text mt={5}>{ quantity_installments }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
        display={form_of_payment === 'Parcelamento' ? 'block' : 'none'}
      >
        <Heading as="h4" size="sm">Qnt. de parcelas pagas:</Heading>
        <Text mt={5}>{ quantity_installments_paid }</Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
        display={form_of_payment === 'Parcelamento' ? 'block' : 'none'}
      >
        <Heading as="h4" size="sm">Valor da parcela:</Heading>
        <Text
          maxW="100px"
          borderRadius={5}
          p="2px 0 2px 12px"
          mt={5}
          color="whitesmoke"
          backgroundColor="#DAA520"
        >
          { `R$ ${installment_value}` }
        </Text>
      </GridItem>
      <GridItem
        w="100%"
        borderRadius={5}
        p={2}
        h="100%"
        border="1px solid #00000029"
      >
        <Heading as="h4" size="sm">Total a receber:</Heading>
        <Text
          maxW="100px"
          borderRadius={5}
          p="2px 0 2px 12px"
          mt={5}
          color="whitesmoke"
          backgroundColor={status}
        >
          {
            `R$ ${form_of_payment === 'Parcelamento' ? installment_value : total}`
          }
        </Text>
      </GridItem>
    </Grid>
  );
};
