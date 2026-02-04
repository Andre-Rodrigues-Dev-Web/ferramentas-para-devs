import styled, { css } from "styled-components";
import { StyledButtonProps } from "./Button.types";

export const ButtonContainer = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    box-shadow:
      0 0 0 2px ${({ theme }) => theme.colors.slate[900]},
      0 0 0 4px ${({ theme }) => theme.colors.primary[500]};
  }

  
  ${({ $variant, theme }) => {
    switch ($variant) {
      case "primary":
        return css`
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
          &:hover {
            background-color: ${theme.colors.primary[700]};
          }
        `;
      case "secondary":
        return css`
          background-color: ${theme.colors.slate[700]};
          color: ${theme.colors.slate[100]};
          &:hover {
            background-color: ${theme.colors.slate[600]};
          }
        `;
      case "outline":
        return css`
          background-color: transparent;
          border: 2px solid ${theme.colors.slate[700]};
          color: ${theme.colors.slate[300]};
          &:hover {
            border-color: ${theme.colors.slate[600]};
            background-color: ${theme.colors.slate[800]};
          }
        `;
      case "ghost":
        return css`
          background-color: transparent;
          color: ${theme.colors.slate[400]};
          &:hover {
            color: ${theme.colors.slate[100]};
            background-color: ${theme.colors.slate[800]};
          }
        `;
      case "danger":
        return css`
          background-color: #dc2626;
          color: ${theme.colors.white};
          &:hover {
            background-color: #b91c1c;
          }
        `;
      default:
        return "";
    }
  }}

  
  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return css`
          padding: 0.375rem 0.75rem;
          font-size: 0.875rem;
        `;
      case "lg":
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1.125rem;
        `;
      case "md":
      default:
        return css`
          padding: 0.5rem 1rem;
          font-size: 1rem;
        `;
    }
  }}
`;
