import React from 'react';
import { AxiosError } from 'axios';
import {
  Center,
  useToast,
  InputGroup,
  Input,
  Image,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SubmitButton } from '../../components/submitButton';
import api from '../../services/api';

export const Login: React.FC = () => {
  const [loginInfo, setLoginInfo] = React.useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);
  const Navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/login', { ...loginInfo });
      sessionStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false);
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
        description: 'Algo deu errado, tente novamente.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
    >
      <Center
        flexDirection="column"
        backgroundColor="white"
        w={['90vw', '70vw', '500px']}
        m="auto"
        p="25px"
        borderRadius="10px"
        boxShadow="0px 3px 6px 3px rgba(0,0,0,0.54)"
      >
        <Image
          src="title.svg"
          alt="Admin Hub"
          mb="50px"
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputGroup
            gap={5}
            flexDirection="column"
            alignItems="center"
            w="100%"
          >
            <Input
              bg="gray.100"
              placeholder="Email"
              type="email"
              onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
            />
            <Input
              bg="gray.100"
              placeholder="Senha"
              type="password"
              onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
            />
            <SubmitButton
              loading={loading}
              initialText="Entrar"
              loadingText="Entrando"
            />
          </InputGroup>
        </form>
      </Center>
    </Flex>
  );
};
