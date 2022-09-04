import React from 'react';
import {
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  Box,
  useToast,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CustomHeading } from '../../components/customHeading';
import { Loading } from '../../components/loading';
import { HelloMessage } from '../../components/helloMessage';
import { DeleteButton } from '../../components/deleteButton';
import { calculateStatus } from '../../components/itemOfList/utils';
import api from '../../services/api';

import { IDataProps } from '../../interfaces';

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

export const Details: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState<IDataProps>(initalStateService);

  const status = calculateStatus(
    String(details.next_payment),
    details.form_of_payment,
    String(details.last_payment),
  );
  const toast = useToast();
  const { id } = useParams();
  const Navigate = useNavigate();
  const user = JSON.parse(String(localStorage.getItem('user')));

  const getDetails = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/voucher/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setDetails({ ...response.data });
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
        description: 'Error ao carregar os atendimentos, recarregue a página',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDetails();
  }, []);

  return (
    <Box>
      <CustomHeading />
      <HelloMessage name={user.name} />
      <Center color="whitesmoke">
        <Heading>Detalhes do atendimento</Heading>
      </Center>
      <Center
        m={5}
        flexDirection="column"
        backgroundColor="whitesmoke"
        p={5}
        borderRadius={3}
        alignItems="flex-end"
      >
        <Center justifyContent="flex-end">
          <DeleteButton />
        </Center>
        {
          loading ? <Loading />
            : (
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
              >
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                >
                  <Heading color="#213b62" as="h4" size="sm">Paciente:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.pacient_fullname }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                >
                  <Heading color="#213b62" as="h4" size="sm">Procedimento:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.type }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                >
                  <Heading color="#213b62" as="h4" size="sm">Plano de saúde:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.plan }</Text>
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
                  <Heading color="#213b62" as="h4" size="sm">Método de pagamento:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.payment_method }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                >
                  <Heading color="#213b62" as="h4" size="sm">Forma de pagamento:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.form_of_payment }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                >
                  <Heading color="#213b62" as="h4" size="sm">Último pagamento:</Heading>
                  <Text color="gray.500" mt={5}>{ new Date(String(details?.last_payment)).toLocaleDateString('pt-BR') }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                  display={details?.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
                >
                  <Heading color="#213b62" as="h4" size="sm">Próximo pagamento:</Heading>
                  <Text color="gray.500" mt={5}>{ new Date(String(details?.next_payment)).toLocaleDateString('pt-BR') }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                  display={details?.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
                >
                  <Heading color="#213b62" as="h4" size="sm">Qnt. de parcelas:</Heading>
                  <Text color="gray.500" mt={5}>{ details?.quantity_installments }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                  display={details?.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
                >
                  <Heading color="#213b62" as="h4" size="sm">Qnt. de parcelas pagas:</Heading>
                  <Text color="gray.500" mt={5}>{ `${details?.quantity_installments_paid}/${details?.quantity_installments}` }</Text>
                </GridItem>
                <GridItem
                  w="100%"
                  borderRadius={5}
                  p={2}
                  h="100%"
                  border="1px solid #00000029"
                  display={details?.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
                >
                  <Heading color="#213b62" as="h4" size="sm">Valor da parcela:</Heading>
                  <Text
                    maxW="100px"
                    borderRadius={5}
                    p="2px 0 2px 12px"
                    mt={5}
                    color="whitesmoke"
                    backgroundColor="#DAA520"
                  >
                    { `R$ ${details?.installment_value}` }
                  </Text>
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
                      `R$ ${details?.total}`
                    }
                  </Text>
                </GridItem>
              </Grid>
            )
        }
      </Center>
    </Box>
  );
};
