import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 42rem; /* max-w-2xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
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
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const GeneratorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Controls = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const Label = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const NumberInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.slate[100]};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  transition: all 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

export const UuidCode = styled.code`
  color: ${({ theme }) => theme.colors.primary[400]};
  font-family: monospace;
  font-size: 0.875rem;
  word-break: break-all;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    font-size: 1rem;
  }
`;

export const CopyButton = styled.button`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
