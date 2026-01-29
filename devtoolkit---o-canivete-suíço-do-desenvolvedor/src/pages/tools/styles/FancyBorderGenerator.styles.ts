import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
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
  gap: 0.25rem;
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
  gap: 3rem;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ControlsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem 2rem;
`;

export const SliderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const SliderValue = styled.span`
  color: ${({ theme }) => theme.colors.primary[400]};
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

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
`;

export const PreviewBoxContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const PreviewBox = styled.div`
  width: 16rem;
  height: 16rem;
  background: linear-gradient(to bottom right, #2563eb, #4f46e5);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.25);
  border: 4px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    width: 20rem;
    height: 20rem;
  }
`;

export const CodeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  width: 100%;
`;

export const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[400]};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

export const CodeBlock = styled.code`
  display: block;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  font-family: monospace;
  font-size: 0.75rem;
  word-break: break-all;
  border: 1px solid rgba(30, 41, 59, 0.5);
`;
