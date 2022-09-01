import React from 'react';
import { Text, Spinner, Button } from '@chakra-ui/react';

interface ISubmitButton {
  loading: boolean;
  initialText: string;
  loadingText: string;
}

export const SubmitButton: React.FC<ISubmitButton> = ({
  loading,
  initialText,
  loadingText,
}) => (
  <Button
    disabled={loading}
    border="1px solid #2B6CB0"
    backgroundColor="#213b62"
    color="whitesmoke"
    type="submit"
    _hover={{ backgroundColor: '#0d1d34' }}
  >
    {
      loading
        ? (
          <Text>
            { `${loadingText}...` }
            <Spinner
              size="sm"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Text>
        )
        : initialText
    }
  </Button>
);
