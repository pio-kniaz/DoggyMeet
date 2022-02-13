import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';

interface ICustomButton extends ButtonProps {
  children?: JSX.Element | string;
}
function CustomButton({ children = '', ...props }: ICustomButton) {
  return <Button {...props}>{children}</Button>;
}

export default CustomButton;
