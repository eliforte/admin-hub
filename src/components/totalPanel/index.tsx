import React from 'react';
import {
  Grid,
  GridItem,
  Center,
  Heading,
  Text,
} from '@chakra-ui/react';
import { IDataProps } from '../../interfaces';
import { Loading } from '../loading';

interface ITotalPanel {
  data: IDataProps[];
  periodFormat: string;
  month: string;
  totalQuantityOfInstallments: number;
  totalQuantityInCash: number;
  totalAmountOfInstallments: number;
  totalAmountInCash: number;
  totalLatePayment: number;
  quantityTotalLatePayment: number;
  loading: boolean;
}

export const TotalPanel: React.FC<ITotalPanel> = ({
  data,
  periodFormat,
  month,
  totalQuantityOfInstallments,
  totalQuantityInCash,
  totalAmountOfInstallments,
  totalAmountInCash,
  totalLatePayment,
  quantityTotalLatePayment,
  loading,
}) => {
  React.useEffect(() => {
  }, [data]);

  return (
    loading ? <Loading /> : (
      <Center
        flexDirection="column"
        backgroundColor="whitesmoke"
        p={5}
        borderRadius={5}
        alignItems="flex-start"
        mb={10}
      >
        <Heading
          color="#213b62"
          as="h3"
          size="sm"
          mb={5}
        >
          {`Resultado do ${periodFormat}:`}
        </Heading>
        <Grid
          templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}
          gap={4}
          justifyItems="flex-start"
        >
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                {`${periodFormat}:`}
              </Heading>
              <Text>{ periodFormat === 'Ano' ? new Date().getFullYear() : month }</Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Qnt. de atendimentos:
              </Heading>
              <Text>{totalQuantityOfInstallments + totalQuantityInCash}</Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Qnt. de parcelamentos:
              </Heading>
              <Text>{totalQuantityOfInstallments}</Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Qnt. à vista:
              </Heading>
              <Text>{totalQuantityInCash}</Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Qnt. de pagamentos atrasados:
              </Heading>
              <Text>{quantityTotalLatePayment}</Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Receita de parcelamentos:
              </Heading>
              <Text
                p="0 10px"
                borderRadius={2}
                backgroundColor="blue.200"
                color="gray.700"
              >
                {`R$: ${String((totalAmountOfInstallments).toFixed(2)).replace('.', ',')}`}
              </Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Receita à vista:
              </Heading>
              <Text
                p="0 10px"
                borderRadius={2}
                backgroundColor="green.200"
                color="gray.700"
              >
                {`R$: ${String(totalAmountInCash).replace('.', ',')}`}
              </Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Receita de pagamentos atrasados:
              </Heading>
              <Text
                p="0 10px"
                borderRadius={2}
                backgroundColor="red.600"
                color="whitesmoke"
              >
                {`R$: ${String(totalLatePayment).replace('.', ',')}` }
              </Text>
            </Center>
          </GridItem>
          <GridItem
            p={2}
          >
            <Center
              alignItems="stretch"
              gap={5}
            >
              <Heading
                color="#213b62"
                as="h4"
                size="sm"
              >
                Receita final:
              </Heading>
              <Text
                p="0 10px"
                borderRadius={2}
                backgroundColor="green.600"
                color="whitesmoke"
              >
                {`R$: ${String(((totalAmountInCash + totalAmountOfInstallments) - quantityTotalLatePayment).toFixed(2)).replace('.', ',')}` }
              </Text>
            </Center>
          </GridItem>
        </Grid>
      </Center>
    )
  );
};
