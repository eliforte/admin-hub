import React from 'react';
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {
  Menu,
  List,
  Assessment,
  Settings,
} from '@mui/icons-material/';

export const Sidebar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const Navigate = useNavigate();

  return (
    <>
      <Button
        display={['block', 'block', 'none']}
        leftIcon={<Menu />}
        colorScheme="teal"
        onClick={onOpen}
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
                atendimentos
              </Button>
              <Button
                leftIcon={<Assessment />}
                variant="link"
                onClick={() => Navigate('/home/faturamento')}
              >
                Faturamentos
              </Button>
              <Button
                leftIcon={<Settings />}
                variant="link"
                onClick={() => Navigate('/home/detalhes')}
              >
                Detalhes
              </Button>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
