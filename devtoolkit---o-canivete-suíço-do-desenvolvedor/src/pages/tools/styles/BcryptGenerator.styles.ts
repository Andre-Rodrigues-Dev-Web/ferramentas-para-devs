import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2.5rem;
  animation: ${fadeIn} 0.5s ease-out;
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

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ControlCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SaltControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SaltLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

export const SaltLabel = styled.label`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-weight: 500;
`;

export const SaltValue = styled.span`
  color: ${({ theme }) => theme.colors.primary[400]};
  font-weight: 700;
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 0.375rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary[600]};
    cursor: pointer;
    transition: transform 0.1s;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const LegendRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-weight: 700;
`;

export const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const OutputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
`;

export const HashDisplay = styled.div<{ $hasHash: boolean }>`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme, $hasHash }) =>
    $hasHash ? theme.colors.primary[400] : theme.colors.slate[700]};
`;

export const HashText = styled.span`
  font-family: monospace;
  font-size: 0.875rem;
  word-break: break-all;
`;

export const InfoCard = styled.div`
  padding: 1rem;
  background-color: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;
`;

export const InfoIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  flex-shrink: 0;
`;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};

  strong {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
