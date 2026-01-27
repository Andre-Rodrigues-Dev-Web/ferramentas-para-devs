
import * as React from 'react';
import { ButtonContainer } from './Button.styles';
import { ButtonProps } from './Button.types';

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}) => {
  return (
    <ButtonContainer $variant={variant} $size={size} {...props}>
      {children}
    </ButtonContainer>
  );
};

export type { ButtonProps };
