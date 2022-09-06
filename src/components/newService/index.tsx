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
import { MinusIcon, AddIcon } from '@chakra-ui/icons';
import { CustomSelect } from '../customSelect';
import { SubmitButton } from '../submitButton';
import { IService } from '../../interfaces';
import {
  paymentDaysOptions,
  formOfPaymentOptions,
  paymentMethodsOptions,
  quantityInstallmentsOptions,
  ShowInstallmentsDetails,
} from './utils';
import api from '../../services/api';

const initalStateService = {
  type: '',
  pacient_fullname: '',
  plan: '',
  total: 0,
  quantity_installments_paid: 1,
  last_payment: null,
  next_payment: null,
};

interface ISetCreatedProps {
  setCreated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewService: React.FC<ISetCreatedProps> = ({
  setCreated,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [service, setService] = React.useState<IService>(initalStateService);
  const [paymentMethod, setPaymentMethod] = React.useState('Cartão de crédito');
  const [formOfPayment, setFormOfPayment] = React.useState('À vista');
  const [paymentDay, setPaymentDay] = React.useState(5);
  const [quantityInstallments, setQuantityInstallments] = React.useState(2);
  const [installmentValue, setInstallmentValue] = React.useState(0);
  const [totalForm, setTotalForm] = React.useState(0);
  const qntInstallmentsOptions = quantityInstallmentsOptions();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    formOfPayment === 'À vista' && setQuantityInstallments(0);
    e.preventDefault();
    setLoading(true);
    try {
      const user = JSON.parse(String(sessionStorage.getItem('user')));
      await api.post('/voucher', {
        ...service,
        payment_method: paymentMethod,
        form_of_payment: formOfPayment,
        payment_day: paymentDay,
        installment_value: installmentValue,
        quantity_installments: quantityInstallments,
      }, { headers: { Authorization: `Bearer ${user.token}` } });
      setLoading(false);
      toast({
        position: 'top',
        title: 'Atendimento registrado!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTotalForm(0);
      setService({ ...initalStateService });
      setCreated(true);
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
      setService({ ...service, total: Number((priceWithFees.toFixed(2))) });
    } else {
      setService({ ...service, total: totalForm });
    }
  };

  React.useEffect(() => {
    totalForm > 0 && calculateTotal();
    totalForm === 0 && setService({ ...service, total: 0 });
    formOfPayment === 'Parcelamento' && calculateInstallmentValue();
    if (paymentMethod !== 'Cartão de crédito') {
      setInstallmentValue(totalForm);
      setPaymentDay(0);
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
    loading,
  ]);

  return (
    <Accordion
      allowToggle
      backgroundColor="whitesmoke"
      borderRadius={5}
      alignItems="center"
      m="20px 20px"
      maxW="100%"
    >
      <AccordionItem borderRadius={5}>
        {
          ({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton justifyContent="space-between">
                  <Box mr="15px" color="#1a202c">
                    Registrar novo atendimento
                  </Box>
                  {isExpanded ? (
                    <MinusIcon fontSize="12px" />
                  ) : (
                    <AddIcon fontSize="12px" />
                  )}
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
                        <FormLabel color="#1a202c">Nome do paciente: *</FormLabel>
                        <Input
                          isRequired
                          bg="gray.100"
                          maxWidth={370}
                          placeholder="Ex: Miguel Fernandez Viera"
                          type="text"
                          value={service.pacient_fullname}
                          onChange={
                            (e) => setService({ ...service, pacient_fullname: e.target.value })
                          }
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem>
                      <InputGroup flexDirection="column">
                        <FormLabel color="#1a202c">Tipo do Atendimento: *</FormLabel>
                        <Input
                          isRequired
                          bg="gray.100"
                          placeholder="Ex: Extração de siso"
                          type="text"
                          value={service.type}
                          onChange={(e) => setService({ ...service, type: e.target.value })}
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem>
                      <InputGroup flexDirection="column">
                        <FormLabel color="#1a202c">Valor: *</FormLabel>
                        <Input
                          isRequired
                          bg="gray.100"
                          placeholder="Ex: 199.50"
                          type="string"
                          value={totalForm}
                          onChange={(e) => setTotalForm(Number(e.target.value))}
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem>
                      <InputGroup flexDirection="column">
                        <FormLabel color="#1a202c">Plano odontológico: *</FormLabel>
                        <Input
                          isRequired
                          bg="gray.100"
                          placeholder="Ex: Odonto Care Plus"
                          type="text"
                          value={service.plan}
                          onChange={(e) => setService({ ...service, plan: e.target.value })}
                        />
                      </InputGroup>
                    </GridItem>
                    <GridItem>
                      <CustomSelect
                        options={paymentMethodsOptions}
                        state={paymentMethod}
                        onChange={setPaymentMethod}
                        labelText="Método de pagamento: *"
                      />
                    </GridItem>
                    <GridItem
                      display={paymentMethod === 'Cartão de crédito' ? 'block' : 'none'}
                    >
                      <CustomSelect
                        options={formOfPaymentOptions}
                        state={formOfPayment}
                        onChange={setFormOfPayment}
                        labelText="Forma de pagamento: *"
                      />
                    </GridItem>
                    <GridItem
                      display={ShowInstallmentsDetails(formOfPayment, paymentMethod)}
                    >
                      <CustomSelect
                        options={qntInstallmentsOptions}
                        state={quantityInstallments}
                        onChange={setQuantityInstallments}
                        labelText="Qnt. de parcelas: *"
                      />
                    </GridItem>
                    <GridItem
                      display={ShowInstallmentsDetails(formOfPayment, paymentMethod)}
                    >
                      <CustomSelect
                        options={paymentDaysOptions}
                        state={paymentDay}
                        onChange={setPaymentDay}
                        labelText="Dia de vencimento: *"
                      />
                    </GridItem>
                    <GridItem>
                      <InputGroup flexDirection="column">
                        <FormLabel color="#1a202c">Data do pagamento: *</FormLabel>
                        <Input
                          isRequired
                          bg="gray.100"
                          placeholder="Ex: 05/05/2022"
                          type="date"
                          value={String(service.last_payment)}
                          onChange={(e) => setService({ ...service, last_payment: e.target.value })}
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
                        <FormLabel color="#1a202c">Valor da parcela: *</FormLabel>
                        <Tag
                          colorScheme="yellow"
                        >
                          { `R$ ${String(installmentValue).replace('.', ',')}` }
                        </Tag>
                      </InputGroup>
                    </GridItem>
                    <GridItem>
                      <InputGroup flexDirection="column">
                        <FormLabel color="#1a202c">Valor total</FormLabel>
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
            </>
          )
        }
      </AccordionItem>
    </Accordion>
  );
};
