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

export const ControlRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ValueDisplay = styled.span`
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

export const ShapeButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding-top: 1rem;
`;

export const ShapeButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid;
  transition: all 0.2s;
  cursor: pointer;

  ${({ $isActive, theme }) =>
    $isActive
      ? `
        background-color: ${theme.colors.primary[600]};
        border-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
      `
      : `
        background-color: ${theme.colors.slate[800]};
        border-color: ${theme.colors.slate[700]};
        color: ${theme.colors.slate[400]};
        
        &:hover {
          color: ${theme.colors.white};
          background-color: ${theme.colors.slate[700]};
        }
      `}
`;

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewContainer = styled.div<{ $previewColor: string }>`
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  background-color: ${({ $previewColor }) => $previewColor};
`;

export const NeumorphicBox = styled.div`
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

export const CodeBlock = styled.pre`
  display: block;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  font-family: monospace;
  font-size: 0.75rem;
  overflow-x: auto;
  border: 1px solid rgba(30, 41, 59, 0.5);
`;
