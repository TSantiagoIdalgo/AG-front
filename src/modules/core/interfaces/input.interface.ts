import React from 'react';
import {UseFormRegisterReturn} from 'react-hook-form';

export interface InputProps {
  info: UseFormRegisterReturn<string>;
  name: string;
  type: 'text' | 'email' | 'password' | 'number';
  error?: unknown;
  style?: React.CSSProperties;
}