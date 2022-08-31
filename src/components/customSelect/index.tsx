import React from 'react';
import {
  InputGroup,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import { ICustomSelect } from './interface';

export const CustomSelect: React.FC<ICustomSelect> = ({
  onChange,
  labelText,
  options,
  state,
}) => (
  <InputGroup flexDirection="column">
    <FormLabel>{ labelText }</FormLabel>
    <Select
      isRequired
      onChange={(e) => onChange(e.target.value)}
      defaultValue={options[0]}
      value={state}
    >
      {
        options.map((option, index) => (
          <option
            key={index.toString() + 1}
            value={option}
          >
            {option}
          </option>
        ))
      }
    </Select>
  </InputGroup>
);
