import React from 'react';

export interface ICustomSelect {
  onChange: React.Dispatch<React.SetStateAction<any>>;
  labelText: string;
  options: string[] | number[];
  state: string | number;
}
