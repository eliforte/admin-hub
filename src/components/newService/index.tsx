import React from 'react';
import { AxiosError } from 'axios';
import {
  Input,
  useToast,
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
import { CustomSelect } from '../customSelect';
import { SubmitButton } from '../submitButton';
import { IService } from './interface';
import {
  paymentDaysOptions,
  formOfPaymentOptions,
  paymentMethodsOptions,
  quantityInstallmentsOptions,
  ShowInstallmentsDetails,
} from './utils';
import api from '../../services/api';

export const NewService: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [service, setService] = React.useState<IService>({
    type: '',
    pacient_fullname: '',
    plan: '',
    total: 0,
    quantity_installments_paid: 0,
    last_payment: null,
    next_payment: null,
  });
  const [paymentMethod, setPaymentMethod] = React.useState('Cartão de crédito');
  const [formOfPayment, setFormOfPayment] = React.useState('À vista');
  const [paymentDay, setPaymentDay] = React.useState(5);
  const [quantityInstallments, setQuantityInstallments] = React.useState(2);
  const [installmentValue, setInstallmentValue] = React.useState(0);
  const [totalForm, setTotalForm] = React.useState(0);
  const qntInstallmentsOptions = quantityInstallmentsOptions();
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

  const calculateInstallmentValue = () => {
    const fees = totalForm * 0.03 * quantityInstallments;
    const result = Number(((fees + totalForm) / quantityInstallments).toFixed(2));
    setInstallmentValue(result);
    return result;
  };

  const calculateTotal = () => {
    if (
      paymentMethod === 'Cartão de crédito'
      && formOfPayment === 'Parcelamento'
      && totalForm > 0
    ) {
      const priceWithFees = quantityInstallments * installmentValue;
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
      setQuantityInstallments(2);
      setService({ ...service, total: totalForm });
    }
  }, [
    quantityInstallments,
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
                <CustomSelect
                  options={paymentMethodsOptions}
                  state={paymentMethod}
                  onChange={setPaymentMethod}
                  labelText="Método de pagamento"
                />
              </GridItem>
              <GridItem
                display={paymentMethod === 'Cartão de crédito' ? 'block' : 'none'}
              >
                <CustomSelect
                  options={formOfPaymentOptions}
                  state={formOfPayment}
                  onChange={setFormOfPayment}
                  labelText="Forma de pagamento"
                />
              </GridItem>
              <GridItem
                display={ShowInstallmentsDetails(formOfPayment, paymentMethod)}
              >
                <CustomSelect
                  options={qntInstallmentsOptions}
                  state={quantityInstallments}
                  onChange={setQuantityInstallments}
                  labelText="Qnt. de parcelas"
                />
              </GridItem>
              <GridItem
                display={ShowInstallmentsDetails(formOfPayment, paymentMethod)}
              >
                <CustomSelect
                  options={paymentDaysOptions}
                  state={paymentDay}
                  onChange={setPaymentDay}
                  labelText="Dia de vencimento"
                />
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
                <SubmitButton
                  loading={loading}
                  initialText="Criar"
                  loadingText="Criando"
                />
              </GridItem>
            </Grid>
          </form>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
