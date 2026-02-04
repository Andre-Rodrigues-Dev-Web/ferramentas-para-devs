import styled from "styled-components";

export const Container = styled.div`
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  color: ${({ theme }) => theme.colors.primary[500]};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const EncoderCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    padding: 2rem;
  }
`;

export const InputGroup = styled.div`
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

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-top: 1rem;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CopyButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const ResultBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  min-height: 5rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  word-break: break-all;
  font-family: monospace;
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.slate[700]};
  font-style: italic;
  font-family: sans-serif;
`;
