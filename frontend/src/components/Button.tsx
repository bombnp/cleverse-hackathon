import { Button } from 'antd';
import React from 'react';
import { hospitelStore } from 'store/hospitelStore';

const { userLogin } = hospitelStore;

export const PrimaryButton = ({ children, className, ...restProps }: any) => (
  <Button
    htmlType="submit"
    className={`w-16 h-8 rounded-md text-base bg-blue-500 ${className} border-0`}
    {...restProps}
  >
    {children}
  </Button>
);
  
export const EmailButton = ({ children, className, ...restProps }: any) => (
  <button
    type="button"
    className={`w-48 h-8 rounded-2xl text-xs outline-none z-10 my-2 mt-2 mr-96 shadow-lg ${className}`}
    {...restProps}
  >
    {children}
  </button>
);

export const SubmitButton = ({ children, className, ...restProps }: any) => (
  <button
    type="button"
    className={`w-26 h-8 rounded-2xl text-sm font-bold outline-none z-10 my-2 mt-2 shadow-lg ${className}`}
    {...restProps}
  >
    {children}
  </button>
);
export const LoginButton = ({ children, className, ...restProps }: any) => (
  <button
    type="button"
    className={`w-48 h-8 rounded-2xl text-xs outline-none z-10 my-2 mt-2 mr-16 shadow-lg bg-white -ml-32${className}`}
    {...restProps}
  >
    {children}
  </button>
);