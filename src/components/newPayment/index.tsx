import React from 'react';
import { AxiosError } from 'axios';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Grid,
  GridItem,
  Center,
  Heading,
  InputGroup,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { SubmitButton } from '../submitButton';
import api from '../../services/api';

interface IUpdatePayment {
  installmentValue: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewPayment: React.FC<IUpdatePayment> = ({
  installmentValue,
  loading,
  setLoading,
}) => {
  const [lastPayment, setLastPayment] = React.useState('');
  const [quantityInstallments, setQuantityInstallmenst] = React.useState(1);

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const editVoucher = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(String(localStorage.getItem('user')));
      await api.put(`/voucher/${id}`, {
        last_payment: lastPayment,
        quantity_installments_paid: quantityInstallments,
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast({
        position: 'top',
        title: 'Pagamento atualizado com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setLastPayment('');
      setQuantityInstallmenst(1);
      setLoading(false);
      onClose();
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

  return (
    <>
      <Button
        color="#1a202c"
        onClick={onOpen}
        mr={5}
      >
        Adicionar novo pagamento
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={() => editVoucher()}>
          <ModalContent maxW="700px">
            <ModalHeader>Adicionar novo pagamento de parcela</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Grid
                templateColumns={['repeat(1, fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}
                gap={4}
                alignItems="center"
              >
                <GridItem>
                  <Center flexDirection="column">
                    <Heading
                      color="#213b62"
                      as="h4"
                      size="sm"
                    >
                      Valor da parcela:
                    </Heading>
                    <Text
                      maxW="100px"
                      borderRadius={5}
                      p="2px 12px"
                      mt={5}
                      color="whitesmoke"
                      backgroundColor="#DAA520"
                    >
                      { `R$ ${String(installmentValue).replace('.', ',')}` }
                    </Text>
                  </Center>
                </GridItem>
                <GridItem flexDirection="column">
                  <Center>
                    <InputGroup flexDirection="column">
                      <FormLabel color="#1a202c">Data do pagamento: *</FormLabel>
                      <Input
                        isRequired
                        bg="gray.100"
                        placeholder="Ex: 05/05/2022"
                        type="date"
                        value={lastPayment}
                        onChange={(e) => setLastPayment(e.target.value)}
                      />
                    </InputGroup>
                  </Center>
                </GridItem>
                <GridItem>
                  <Center flexDirection="column">
                    <InputGroup flexDirection="column">
                      <FormLabel color="#1a202c">Qnt. de parcelas pagas: *</FormLabel>
                      <Input
                        isRequired
                        bg="gray.100"
                        placeholder="Ex: 2"
                        value={quantityInstallments}
                        onChange={(e) => setQuantityInstallmenst(Number(e.target.value))}
                      />
                    </InputGroup>
                  </Center>
                </GridItem>
              </Grid>
            </ModalBody>
            <ModalFooter>
              <SubmitButton
                loading={loading}
                initialText="Confirmar"
                loadingText="Atualizando"
              />
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};
