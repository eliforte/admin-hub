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
import { IDataProps } from '../../interfaces';
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
    <Center
      backgroundColor="whiteAlpha.800"
      flexDirection="column"
      maxW="100vw"
      p={5}
    >
      <Heading m={5} color="#213b62">Atendimentos</Heading>
      {
        data?.map((service, index) => (
          <Box
            maxW="850px"
            justifyContent="center"
            flexDirection="column"
            backgroundColor="whitesmoke"
            border="1px solid #00000029"
            p={5}
            m={2}
            borderRadius={5}
          >
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
            <ItemOfList key={service._id} {...service} />
          </Box>
        ))
      }
    </Center>
  );
};
