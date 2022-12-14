import React from 'react';
import { AxiosError } from 'axios';
import {
  useToast,
  Center,
  Box,
  Heading,
  Link,
} from '@chakra-ui/react';
import { useNavigate, Link as LinkRouter } from 'react-router-dom';
import { Loading } from '../loading';
import { ItemOfList } from '../itemOfList';
import { EmptyList } from '../emptyList';
import { IDataProps } from '../../interfaces';
import api from '../../services/api';

interface ICreatedProps {
  created: boolean;
}

export const List: React.FC<ICreatedProps> = ({ created }) => {
  const [data, setData] = React.useState<IDataProps[]>();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const Navigate = useNavigate();

  const getItems = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(String(localStorage.getItem('user')));
      const response = await api.get('/voucher', { headers: { Authorization: `Bearer ${user.token}` } });
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

  React.useEffect(() => {
    getItems();
  }, [created]);

  if (loading) return <Loading />;

  return (
    <Center
      flexDirection="column-reverse"
      maxW="100vw"
      borderRadius={5}
      mb={10}
      gap={5}
    >
      {
        !data?.length ? <EmptyList />
          : data.map((service, index) => (
            <Box
              w={['95%', '95%', '90%', '1100px']}
              backgroundColor="whiteAlpha.800"
              justifyContent="center"
              flexDirection="column"
              border="1px solid #00000029"
              p={5}
              borderRadius={5}
              key={service._id}
            >
              <Center justifyContent="space-between">
                <Heading
                  as="h3"
                  size="md"
                  maxW="50px"
                  mb={2}
                  borderRadius={5}
                  backgroundColor="whitesmoke"
                  p={1}
                  color="#213b62"
                >
                  { `# ${index + 1}`}
                </Heading>
                <Link color="gray.500" as={LinkRouter} to={`/home/detalhes/${service._id}`}>
                  ver mais detalhes
                </Link>
              </Center>
              <ItemOfList {...service} />
            </Box>
          ))
      }
    </Center>
  );
};
