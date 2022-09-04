import React from 'react';
import {
  Stack,
  Center,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  monthsOptions,
  formOfPaymentOptions,
  paymentMethodOptions,
  typeFilterOptions,
} from './utils';
import { CustomHeading } from '../../components/customHeading';
import { CustomSelect } from '../../components/customSelect';
import { SubmitButton } from '../../components/submitButton';
import { HelloMessage } from '../../components/helloMessage';
import { IDataProps } from '../../interfaces';
import api from '../../services/api';

export const Invoicing: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState('Mês');
  const [month, setMonth] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [formOfPayment, setFormOfPayment] = React.useState('');
  const [data, setData] = React.useState<IDataProps[]>();

  const Navigate = useNavigate();
  const user = JSON.parse(String(localStorage.getItem('user')));
  const toast = useToast();

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get('/voucher', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setData([...response.data]);
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 500) {
          setLoading(false);
          toast({
            position: 'top',
            title: 'Ops!',
            description: 'Erro ao carregar o seus dados. Faça o login novamente.',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          localStorage.clear();
          return Navigate('/');
        }

        setLoading(false);
        return toast({
          position: 'top',
          title: 'Ops!',
          description: err.response?.data?.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
      toast({
        position: 'top',
        title: 'Ops!',
        description: 'Error ao carregar os atendimento, recarregue a página',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  React.useEffect(() => {}, [data]);

  return (
    <Stack>
      <CustomHeading />
      <HelloMessage name={user.name} />
      <Center
        w="100%"
      >
        <form onSubmit={(e) => getData(e)}>
          <Grid
            maxW="1000px"
            backgroundColor="whitesmoke"
            templateColumns={['repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']}
            alignItems="center"
            justifyItems="stretch"
            borderRadius={5}
            p={5}
            m={5}
            gap={4}
          >
            <GridItem justifyContent="space-between">
              <CustomSelect
                onChange={setTypeFilter}
                labelText="Período:"
                options={typeFilterOptions}
                state={typeFilter}
              />
            </GridItem>
            <GridItem>
              <CustomSelect
                onChange={setMonth}
                labelText="Mês:"
                options={monthsOptions}
                state={month}
              />
            </GridItem>
            <GridItem>
              <CustomSelect
                onChange={setPaymentMethod}
                labelText="Método de pagamento:"
                options={paymentMethodOptions}
                state={paymentMethod}
              />
            </GridItem>
            <GridItem>
              <CustomSelect
                onChange={setFormOfPayment}
                labelText="Forma de pagamento:"
                options={formOfPaymentOptions}
                state={formOfPayment}
              />
            </GridItem>
            <GridItem>
              <Center>
                <SubmitButton
                  loading={loading}
                  loadingText="Filtrando"
                  initialText="Filtrar"
                />
              </Center>
            </GridItem>
          </Grid>
        </form>
      </Center>
    </Stack>
  );
};
