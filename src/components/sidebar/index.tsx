import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  MenuSharp,
  List,
  Assessment,
  LogoutSharp,
} from '@mui/icons-material/';

export const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const Navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    Navigate('/');
  };

  return (
    <>
      <Button
        display={['block', 'block', 'none']}
        leftIcon={<MenuSharp sx={{ color: 'black' }} />}
        colorScheme="teal"
        onClick={onOpen}
        p={0}
        ml={2}
        backgroundColor="transparent"
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent flexDirection="column">
          <DrawerCloseButton />
          <DrawerHeader>Admin Hub</DrawerHeader>
          <DrawerBody>
            <Flex
              flexDirection="column"
              gap={5}
              alignItems="flex-start"
            >
              <Button
                leftIcon={<List />}
                variant="link"
                onClick={() => Navigate('/home/atendimentos')}
              >
                Atendimentos
              </Button>
              <Button
                leftIcon={<Assessment />}
                variant="link"
                onClick={() => Navigate('/home/faturamentos')}
              >
                Faturamentos
              </Button>
            </Flex>
          </DrawerBody>
          <DrawerFooter justifyContent="flex-start">
            <Button
              leftIcon={<LogoutSharp />}
              variant="link"
              onClick={() => logout()}
            >
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
