import styled, { css } from "styled-components";

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

export const ConverterCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const UseNowButton = styled.button`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const Hint = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 700;
  text-transform: uppercase;
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ResultBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  transition: all 0.2s;

  &:hover button {
    opacity: 1;
  }
`;

export const ResultLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const ResultValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[400]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 2rem;
`;

export const CopyButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  opacity: 0;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.slate[500]};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const UnitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  opacity: 0.6;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const UnitCard = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
`;

export const UnitLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
`;

export const UnitValue = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;
