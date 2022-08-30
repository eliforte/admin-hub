import React from 'react';
import {
  Input,
  // Button,
  // Text,
  // Spinner,
  Select,
  // useToast,
  FormLabel,
  Heading,
  Tag,
  InputGroup,
  Center,
  Grid,
  GridItem,
} from '@chakra-ui/react';
// import { Add } from '@mui/icons-material/';
// import api from '../../services/api';

interface IService {
  type: string;
  pacient_fullname: string;
  plan: string;
  payment_method: string;
  form_of_payment: string;
  quantity_installments: number;
  total: number;
  quantity_installments_paid: number;
  payment_day: number | null;
  last_payment: Date | null;
  next_payment: Date | null;
  installment_value: number;
}

export const NewService: React.FC = () => {
  // const [loading, setLoading] = React.useState(false);
  const [service, setService] = React.useState<IService>({
    type: '',
    pacient_fullname: '',
    plan: '',
    payment_method: 'Cartão de crédito',
    form_of_payment: 'À vista',
    quantity_installments: 2,
    total: 0,
    quantity_installments_paid: 0,
    payment_day: null,
    last_payment: null,
    next_payment: null,
    installment_value: 0,
  });
  // const toast = useToast();

  const paymentMethods: { [key: string]: string; }[] = [
    { value: 'Cartão de crédito', label: 'Cartão de crédito' },
    { value: 'Cartão de débito', label: 'Cartão de débito' },
    { value: 'Em dinheiro', label: 'Em dinheiro' },
  ];

  const formOfPayment: { [key: string]: string; }[] = [
    { value: 'À vista', label: 'À vista' },
    { value: 'Parcelamento', label: 'Parcelamento' },
  ];

  const quantityInstallments = (): number[] => {
    const newQuantity = Array.from({ length: 12 }, (_, index) => index + 1);
    return newQuantity;
  };

  const paymentDays = [5, 8, 15, 18];

  const calculateInstallmentValue = () => {
    const fees = service.total * 0.03 * service.quantity_installments;
    const result = Number(((fees + service.total) / service.quantity_installments).toFixed(2));
    setService({ ...service, installment_value: result });
    return result;
  };

  React.useEffect(() => {
    if (service.quantity_installments > 1) calculateInstallmentValue();
    if (service.form_of_payment === 'À vista') setService({ ...service, quantity_installments: 0 });
  }, [service.quantity_installments, service.form_of_payment]);

  return (
    <Center
      maxWidth="90%"
      flexDirection="column"
      backgroundColor="whitesmoke"
      borderRadius={5}
      p={8}
      gap={10}
    >
      <Heading>Registrar novo serviço</Heading>
      <form>
        <Grid
          templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
          gap={7}
        >
          <GridItem>
            <InputGroup flexDirection="column">
              <FormLabel>Nome do paciente (completo)</FormLabel>
              <Input
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
                bg="gray.100"
                placeholder="Ex: 199.50"
                type="number"
                onChange={(e) => setService({ ...service, total: Number(e.target.value) })}
              />
            </InputGroup>
          </GridItem>
          <GridItem>
            <InputGroup flexDirection="column">
              <FormLabel>Plano odontológico</FormLabel>
              <Input
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
                onChange={(e) => setService({ ...service, payment_method: e.target.value })}
                defaultValue={paymentMethods[0].value}
              >
                {
                  paymentMethods.map((method, index) => (
                    <option key={index.toString() + 1} value={method.value}>{method.label}</option>
                  ))
                }
              </Select>
            </InputGroup>
          </GridItem>
          <GridItem
            display={service.payment_method === 'Cartão de crédito' ? 'block' : 'none'}
          >
            <InputGroup flexDirection="column">
              <FormLabel>Forma de pagamento</FormLabel>
              <Select
                onChange={(e) => setService({ ...service, form_of_payment: e.target.value })}
                defaultValue={formOfPayment[0].value}
              >
                {
                  formOfPayment.map((formPayment, index) => (
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
            display={service.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
          >
            <InputGroup>
              <FormLabel>Quantidade de parcelas</FormLabel>
              <Select
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
            display={service.form_of_payment === 'Parcelamento' ? 'block' : 'none'}
          >
            <InputGroup>
              <FormLabel>Dia de vencimento</FormLabel>
              <Select
                onChange={(value) => setService({ ...service, payment_day: Number(value) })}
                defaultValue={paymentDays[0]}
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
                bg="gray.100"
                placeholder="Ex: 05/05/2022"
                type="date"
                onChange={(date) => console.log(date)}
              />
            </InputGroup>
          </GridItem>
          <GridItem
            display={
              service.form_of_payment === 'Parcelamento'
                && service.total > 0
                ? 'block'
                : 'none'
            }
          >
            <InputGroup>
              <FormLabel>Valor da parcela</FormLabel>
              <Tag
                colorScheme="yellow"
              >
                { `R$ ${service.installment_value}` }
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
                { `R$ ${Number((service.installment_value * service.quantity_installments).toFixed(2))}` }
              </Tag>
            </InputGroup>
          </GridItem>
        </Grid>
      </form>
    </Center>
  );
};
