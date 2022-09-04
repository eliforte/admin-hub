import React from 'react';
import {
  Button,
  Center,
  Spinner,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { AxiosError } from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { DeleteForever } from '@mui/icons-material';
import api from '../../services/api';

export const DeleteButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  const { id } = useParams();
  const Navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const deleteVoucher = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(String(localStorage.getItem('user')));
      await api.delete(`/voucher/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });
      setLoading(false);
      toast({
        position: 'top',
        title: 'Excluir comprovante',
        description: 'Comprovante de atendimento excluído com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      Navigate('/home/atendimentos');
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
        description: 'Error ao excluir o atendimento, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <Center>
      <Button
        bgColor="transparent"
        _hover={{ backgroundColor: 'transparent' }}
        onClick={onOpen}
        p={0}
        m={0}
      >
        <DeleteForever sx={{ color: '#e53e3e' }} />
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir comprovante de atendimento
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza? Você não pode desfazer esta ação depois.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={loading}
                colorScheme="red"
                type="button"
                ml={3}
                onClick={() => deleteVoucher()}
              >
                {
                  loading ? (
                    <>
                      <Text>Excluindo</Text>
                      <Spinner
                        size="sm"
                        emptyColor="gray.200"
                        color="blue.500"
                      />
                    </>
                  )
                    : 'Excluir'
                }
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Center>
  );
};
