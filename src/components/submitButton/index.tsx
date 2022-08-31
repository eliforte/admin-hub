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
  <Button disabled={loading} border="1px solid #2B6CB0" color="#2B6CB0" type="submit">
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
