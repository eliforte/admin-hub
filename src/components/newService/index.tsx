import React from 'react';
import { AxiosError } from 'axios';
import {
  Input,
  Text,
  Spinner,
  Select,
  useToast,
  Button,
  FormLabel,
  Tag,
  InputGroup,
  Grid,
  GridItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionPanel,
} from '@chakra-ui/react';
import { Add } from '@mui/icons-material/';
import api from '../../services/api';

interface IService {
  type: string;
  pacient_fullname: string;
  plan: string;
  quantity_installments: number;
  total: number;
  quantity_installments_paid: number;
  payment_day: number | null;
  last_payment: Date | null;
  next_payment: Date | null;
}

export const NewService: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [service, setService] = React.useState<IService>({
    type: '',
    pacient_fullname: '',
    plan: '',
    quantity_installments: 2,
    total: 0,
    quantity_installments_paid: 0,
    payment_day: 5,
    last_payment: null,
    next_payment: null,
  });
  const [paymentMethod, setPaymentMethod] = React.useState('Cartão de crédito');
  const [formOfPayment, setFormOfPayment] = React.useState('À vista');
  const [installmentValue, setInstallmentValue] = React.useState(0);
  const [totalForm, setTotalForm] = React.useState(0);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = JSON.parse(String(sessionStorage.getItem('user')));
      await api.post('/voucher', {
        ...service,
        payment_method: paymentMethod,
        form_of_payment: formOfPayment,
        installment_value: installmentValue,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
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
        description: 'Algo deu errado, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  const paymentMethods: { [key: string]: string; }[] = [
    { value: 'Cartão de crédito', label: 'Cartão de crédito' },
    { value: 'Cartão de débito', label: 'Cartão de débito' },
    { value: 'Em dinheiro', label: 'Em dinheiro' },
  ];

  const formOfPaymentOptions: { [key: string]: string; }[] = [
    { value: 'À vista', label: 'À vista' },
    { value: 'Parcelamento', label: 'Parcelamento' },
  ];

  const paymentDays = [5, 8, 15, 18];

  const quantityInstallments = (): number[] => {
    const newQuantity = Array.from({ length: 12 }, (_, index) => index + 1);
    return newQuantity;
  };

  const calculateInstallmentValue = () => {
    const fees = totalForm * 0.03 * service.quantity_installments;
    const result = Number(((fees + totalForm) / service.quantity_installments).toFixed(2));
    setInstallmentValue(result);
    return result;
  };

  const calculateTotal = () => {
    if (
      paymentMethod === 'Cartão de crédito'
      && formOfPayment === 'Parcelamento'
      && totalForm > 0
    ) {
      const priceWithFees = service.quantity_installments * installmentValue;
      setService({ ...service, total: priceWithFees });
    } else {
      setService({ ...service, total: totalForm });
    }
  };

  React.useEffect(() => {
    totalForm > 0 && calculateTotal();
    formOfPayment === 'Parcelamento' && calculateInstallmentValue();
    if (paymentMethod !== 'Cartão de crédito') {
      setInstallmentValue(totalForm);
      setFormOfPayment('À vista');
      setService({ ...service, quantity_installments: 2, total: totalForm });
    }
  }, [
    service.quantity_installments,
    paymentMethod,
    formOfPayment,
    installmentValue,
    totalForm,
  ]);

  return (
    <Accordion
      allowToggle
      backgroundColor="whitesmoke"
      borderRadius={5}
      alignItems="center"
      mr={5}
    >
      <AccordionItem borderRadius={5}>
        <h2>
          <AccordionButton>
            <Add />
            <Box flex="1" textAlign="left">
              Registrar novo serviço
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel width="100%" borderRadius={5}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
              gap={4}
              w="100%"
              alignItems="center"
              justifyItems="start"
            >
              <GridItem width="100%">
                <InputGroup flexDirection="column" justifyContent="space-between">
                  <FormLabel>Nome do paciente</FormLabel>
                  <Input
                    isRequired
                    bg="gray.100"
                    maxWidth={370}
                    placeholder="Ex: Miguel Fernandez Viera"
                    type="text"
                    onChange={(e) => setService({ ...service, pacient_fullname: e.target.value })}
                  />
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Tipo do Atendimento</FormLabel>
                  <Input
                    isRequired
                    bg="gray.100"
                    placeholder="Ex: Extração de siso"
                    type="text"
                    onChange={(e) => setService({ ...service, type: e.target.value })}
                  />
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Valor</FormLabel>
                  <Input
                    isRequired
                    bg="gray.100"
                    placeholder="Ex: 199.50"
                    type="number"
                    onChange={(e) => setTotalForm(Number(e.target.value))}
                  />
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Plano odontológico</FormLabel>
                  <Input
                    isRequired
                    bg="gray.100"
                    placeholder="Ex: Odonto Care Plus"
                    type="text"
                    onChange={(e) => setService({ ...service, plan: e.target.value })}
                  />
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    isRequired
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    defaultValue={paymentMethods[0].value}
                  >
                    {
                      paymentMethods.map((method, index) => (
                        <option
                          key={index.toString() + 1}
                          value={method.value}
                        >
                          {method.label}
                        </option>
                      ))
                    }
                  </Select>
                </InputGroup>
              </GridItem>
              <GridItem
                display={paymentMethod === 'Cartão de crédito' ? 'block' : 'none'}
              >
                <InputGroup flexDirection="column">
                  <FormLabel>Forma de pagamento</FormLabel>
                  <Select
                    isRequired
                    onChange={(e) => setFormOfPayment(e.target.value)}
                    value={formOfPayment}
                  >
                    {
                      formOfPaymentOptions.map((formPayment, index) => (
                        <option
                          key={index.toString() + 1}
                          value={formPayment.value}
                        >
                          {formPayment.label}
                        </option>
                      ))
                    }
                  </Select>
                </InputGroup>
              </GridItem>
              <GridItem
                display={
                  formOfPayment === 'Parcelamento'
                  && paymentMethod === 'Cartão de crédito'
                    ? 'block'
                    : 'none'
                }
              >
                <InputGroup flexDirection="column">
                  <FormLabel>Qnt. de parcelas</FormLabel>
                  <Select
                    isRequired
                    onChange={(e) => setService({
                      ...service, quantity_installments: Number(e.target.value),
                    })}
                    defaultValue={service.quantity_installments}
                  >
                    {
                      quantityInstallments().map((value, index) => (
                        <option
                          key={index.toString() + 1}
                          value={value + 1}
                        >
                          { value + 1 }
                        </option>
                      ))
                    }
                  </Select>
                </InputGroup>
              </GridItem>
              <GridItem
                display={
                  formOfPayment === 'Parcelamento'
                  && paymentMethod === 'Cartão de crédito'
                    ? 'block'
                    : 'none'
                }
              >
                <InputGroup flexDirection="column">
                  <FormLabel>Dia de vencimento</FormLabel>
                  <Select
                    isRequired
                    onChange={(e) => setService({
                      ...service, payment_day: Number(e.target.value),
                    })}
                    defaultValue={Number(service.payment_day)}
                  >
                    {
                      paymentDays.map((day, index) => (
                        <option key={index.toString() + 1} value={day}>{ day }</option>
                      ))
                    }
                  </Select>
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Data do pagamento</FormLabel>
                  <Input
                    isRequired
                    bg="gray.100"
                    placeholder="Ex: 05/05/2022"
                    type="date"
                    onChange={(e) => setService({ ...service, last_payment: e.target.valueAsDate })}
                  />
                </InputGroup>
              </GridItem>
              <GridItem
                display={
                  formOfPayment === 'Parcelamento'
                    && totalForm > 0
                    ? 'block'
                    : 'none'
                }
              >
                <InputGroup flexDirection="column">
                  <FormLabel>Valor da parcela</FormLabel>
                  <Tag
                    colorScheme="yellow"
                  >
                    { `R$ ${String(installmentValue).replace('.', ',')}` }
                  </Tag>
                </InputGroup>
              </GridItem>
              <GridItem>
                <InputGroup flexDirection="column">
                  <FormLabel>Valor total</FormLabel>
                  <Tag
                    size="lg"
                    colorScheme="green"
                  >
                    { `R$ ${String((service.total).toFixed(2)).replace('.', ',')}` }
                  </Tag>
                </InputGroup>
              </GridItem>
              <GridItem>
                <Button
                  disabled={loading}
                  border="1px solid #2B6CB0"
                  color="#2B6CB0"
                  type="submit"
                >
                  {
                    loading
                      ? (
                        <Text>
                          Criando...
                          <Spinner
                            size="sm"
                            emptyColor="gray.200"
                            color="blue.500"
                          />
                        </Text>
                      )
                      : 'Criar'
                  }
                </Button>
              </GridItem>
            </Grid>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
