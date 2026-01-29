import styled from "styled-components";

export const Container = styled.div`
  max-width: 48rem; /* max-w-3xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Header = styled.div`
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

export const GeneratorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
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

export const ResultSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResultTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

export const OutputBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[300]};
  line-height: 1.625;
  white-space: pre-wrap;
  max-height: 500px;
  overflow-y: auto;
`;
