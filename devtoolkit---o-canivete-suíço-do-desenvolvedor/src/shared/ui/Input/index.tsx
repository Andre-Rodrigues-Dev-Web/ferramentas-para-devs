
import * as React from 'react';
import { Container, Label, StyledInput, ErrorText, StyledTextarea } from './Input.styles';
import { InputProps, TextareaProps } from './Input.types';

export const Input: React.FC<InputProps> = ({ label, error, className, ...props }) => {
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <StyledInput $error={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export const Textarea: React.FC<TextareaProps> = ({ label, error, className, ...props }) => {
  return (
    <Container className={className}>
      {label && <Label>{label}</Label>}
      <StyledTextarea $error={!!error} {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

export type { InputProps, TextareaProps };
