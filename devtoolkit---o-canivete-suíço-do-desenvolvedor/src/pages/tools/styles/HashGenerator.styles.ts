import styled from "styled-components";

export const Container = styled.div`
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

export const InputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const HashesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

export const HashCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
  }
`;

export const HashHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const AlgoName = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary[500]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const CopyButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const HashValue = styled.div<{ $hasValue: boolean }>`
  font-family: monospace;
  font-size: 0.875rem;
  word-break: break-all;
  line-height: 1.6;
  color: ${({ theme, $hasValue }) =>
    $hasValue ? theme.colors.slate[200] : theme.colors.slate[700]};
  font-style: ${({ $hasValue }) => ($hasValue ? "normal" : "italic")};
`;
