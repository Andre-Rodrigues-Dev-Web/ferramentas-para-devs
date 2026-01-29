import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div``;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const IconButton = styled.button`
  padding: 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: all 0.2s;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: #f87171;
    background-color: ${({ theme }) => theme.colors.slate[800]};
  }
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

export const OutputBox = styled.div<{ $error: boolean }>`
  width: 100%;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px solid
    ${({ theme, $error }) =>
      $error ? "rgba(239, 68, 68, 0.5)" : theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1rem;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  overflow: auto;
  max-height: 460px;

  ${({ $error }) =>
    $error &&
    css`
      background-color: rgba(239, 68, 68, 0.05);
    `}
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #f87171;
`;

export const ErrorTitle = styled.p`
  font-weight: 700;
`;

export const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  opacity: 0.8;
`;

export const Pre = styled.pre`
  color: #60a5fa;
`;

export const Placeholder = styled.p`
  color: #475569;
  font-style: italic;
`;
