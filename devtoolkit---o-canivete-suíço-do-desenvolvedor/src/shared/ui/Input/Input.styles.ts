import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[300]};
  display: block;
`;

const commonInputStyles = css<{ $error?: boolean }>`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid
    ${({ theme, $error }) => ($error ? "#ef4444" : theme.colors.slate[700])};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[500]};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const StyledInput = styled.input<{ $error?: boolean }>`
  ${commonInputStyles}
`;

export const StyledTextarea = styled.textarea<{ $error?: boolean }>`
  ${commonInputStyles}
  min-height: 200px;
  font-family: "Fira Code", monospace;
`;

export const ErrorText = styled.p`
  font-size: 0.75rem;
  color: #ef4444;
`;
