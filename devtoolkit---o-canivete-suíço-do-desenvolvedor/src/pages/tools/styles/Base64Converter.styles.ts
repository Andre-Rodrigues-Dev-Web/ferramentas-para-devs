import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding-bottom: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  padding: 1rem;
  background-color: rgba(37, 99, 235, 0.1);
  color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius["3xl"]};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    padding: 2rem;
  }
`;

export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    flex-direction: row;
  }
`;

export const ModeBadge = styled.div<{ $active: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 700;
  font-size: 0.75rem;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
        `
      : css`
          background-color: ${theme.colors.slate[800]};
          color: ${theme.colors.slate[500]};
        `}
`;

export const SwitchButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.primary[400]};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[700]};
  }
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

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const ResultBox = styled.div<{ $error: boolean }>`
  height: 16rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1rem;
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? "rgba(239, 68, 68, 0.3)" : theme.colors.slate[800]};
  overflow: auto;
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;

  ${({ $error, theme }) =>
    $error
      ? css`
          color: #f87171;
          background-color: rgba(239, 68, 68, 0.05);
        `
      : css`
          color: ${theme.colors.primary[400]};
        `}
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.slate[700]};
  font-style: italic;
`;
