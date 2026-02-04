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
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
`;

export const HeaderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ControlsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ControlsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ColorControl = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ColorInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
`;

export const ColorLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ColorInput = styled.input`
  width: 100%;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  cursor: pointer;
  border: none;
  padding: 0.25rem;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 0.25rem;
  }
`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: 0.25rem;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[300]};
`;

export const CheckboxInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary[600]};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewBoxContainer = styled.div`
  display: flex;
  flex: 1;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

export const ShadowElement = styled.div`
  width: 12rem;
  height: 12rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 1rem;
  transition: all 0.075s;
`;

export const CodeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
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
  font-weight: 500;
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
  font-size: 0.875rem;
  word-break: break-all;
  border: 1px solid rgba(30, 41, 59, 0.5);
`;

// Slider Components
export const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

export const SliderLabel = styled.label`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const SliderValue = styled.span`
  color: ${({ theme }) => theme.colors.primary[400]};
  font-weight: 500;
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
