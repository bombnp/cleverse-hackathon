import { Button } from 'antd';
import React from 'react';

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
    className={`w-48 h-8 rounded-2xl text-xs outline-none z-10 bg-white my-2 mt-2 mr-96 shadow-lg ${className}`}
    {...restProps}
  >
    {children}
  </button>
);