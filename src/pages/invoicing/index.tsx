import React from 'react';
import {
  Stack,
  Center,
  Grid,
  GridItem,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  monthsOptions,
  formOfPaymentOptions,
  paymentMethodOptions,
  typeFilterOptions,
  isInstallments,
  totalInstallmentsValue,
  isInCash,
  totalInCash,
  calculateStatusPayment,
  calculateTotalLatePayment,
} from './utils';
import { CustomHeading } from '../../components/customHeading';
import { CustomSelect } from '../../components/customSelect';
import { SubmitButton } from '../../components/submitButton';
import { HelloMessage } from '../../components/helloMessage';
import { TotalPanel } from '../../components/totalPanel';
import { IDataProps } from '../../interfaces';
import api from '../../services/api';

const currentMonth = new Date().getMonth();

const initalStateService = {
  _id: '',
  type: '',
  pacient_fullname: '',
  plan: '',
  payment_method: '',
  form_of_payment: '',
  quantity_installments: 0,
  total: 0,
  quantity_installments_paid: 0,
  payment_day: 0,
  last_payment: '',
  next_payment: '',
  installment_value: 0,
  responsible_id: '',
};

export const Invoicing: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [typeFilter, setTypeFilter] = React.useState('Mês');
  const [month, setMonth] = React.useState(monthsOptions[currentMonth]);
  const [paymentMethod, setPaymentMethod] = React.useState('');
  const [formOfPayment, setFormOfPayment] = React.useState('');
  const [data, setData] = React.useState<IDataProps[]>([initalStateService]);
  const [totalQuantityOfInstallments, setTotalQuantityOfInstallments] = React.useState(0);
  const [totalQuantityInCash, setTotalQuantityInCash] = React.useState(0);
  const [totalLatePayment, setTotalLatePayment] = React.useState(0);
  const [quantityTotalLatePayment, setQuantityTotalLatePayment] = React.useState(0);
  const [totalAmountOfInstallments, setTotalAmoutOfInstallments] = React.useState(0);
  const [totalAmountInCash, setTotalAmoutInCash] = React.useState(0);

  const Navigate = useNavigate();
  const user = JSON.parse(String(localStorage.getItem('user')));
  const toast = useToast();

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    setTotalQuantityOfInstallments(0);
    setTotalAmoutOfInstallments(0);
    setTotalQuantityInCash(0);
    setTotalAmoutInCash(0);
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.get(`/voucher/filter?periodFormat=${typeFilter}&month=${month}&paymentMethod=${paymentMethod}&formOfPayment=${formOfPayment}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const separatedByStatus = calculateStatusPayment(response);
      const valueTotalLatePayments = calculateTotalLatePayment(separatedByStatus.late);
      const onlyInstallments = isInstallments(separatedByStatus.paid);
      const valueTotalInstallments = totalInstallmentsValue(onlyInstallments);
      const onlyInCash = isInCash(separatedByStatus.paid);
      const valueTotalInCash = totalInCash(onlyInCash);

      setTotalLatePayment(valueTotalLatePayments);
      setQuantityTotalLatePayment(separatedByStatus.late.length);
      setTotalQuantityInCash(onlyInCash.length);
      setTotalQuantityOfInstallments(onlyInstallments.length);
      setTotalAmoutOfInstallments(valueTotalInstallments);
      setTotalAmoutInCash(valueTotalInCash);
      setData([...onlyInstallments, ...onlyInCash]);
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
      <Center color="whitesmoke">
        <Heading mb="20px">Faturamentos</Heading>
      </Center>
      <Center w="100%">
        <form onSubmit={(e) => getData(e)}>
          <Grid
            maxW={typeFilter !== 'Ano' ? '1200px' : '900px'}
            backgroundColor="whitesmoke"
            templateColumns={
              typeFilter !== 'Ano'
                ? ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(5, 1fr)']
                : ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']
            }
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
            <GridItem
              display={typeFilter !== 'Ano' ? 'flex' : 'none'}
            >
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
      <Center>
        <TotalPanel
          data={data}
          periodFormat={typeFilter}
          month={month}
          loading={loading}
          totalQuantityOfInstallments={totalQuantityOfInstallments}
          totalQuantityInCash={totalQuantityInCash}
          totalAmountOfInstallments={totalAmountOfInstallments}
          totalAmountInCash={totalAmountInCash}
          totalLatePayment={totalLatePayment}
          quantityTotalLatePayment={quantityTotalLatePayment}
        />
      </Center>
    </Stack>
  );
};
