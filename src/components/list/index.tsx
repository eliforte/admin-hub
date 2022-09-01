import React from 'react';
import { AxiosError } from 'axios';
import {
  useToast,
  Center,
  Box,
  Heading,
} from '@chakra-ui/react';
import { Loading } from '../loading';
import { ItemOfList } from '../itemOfList';
import { IDataProps } from '../../interface';
import api from '../../services/api';

export const List: React.FC = () => {
  const [data, setData] = React.useState<IDataProps[]>();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const getItems = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(String(sessionStorage.getItem('user')));
      const response = await api.get('/voucher', { headers: { Authorization: `Bearer ${user.token}` } });
      setData([...response.data]);
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
  }, []);

  if (loading) return <Loading />;

  return (
    <Center flexDirection="column" maxW="80%">
      {
        data?.map((service, index) => (
          <Box>
            <Heading
              as="h3"
              size="md"
              maxW="50px"
              mb={5}
              borderRadius={5}
              backgroundColor="whitesmoke"
              p={1}
            >
              { `# ${index + 1}`}
            </Heading>
            <ItemOfList key={service._id} {...service} />
          </Box>
        ))
      }
    </Center>
  );
};
