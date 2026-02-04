import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
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

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ControlHeader = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ControlLabel = styled.label`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ControlValue = styled.span`
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

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewBackgroundContainer = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const BackgroundBlob = styled.div<{ $color: string; $position: string }>`
  position: absolute;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  filter: blur(80px);
  background-color: ${({ $color }) => $color};
  ${({ $position }) => $position}
  animation: ${pulse} 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const PreviewBoxContainer = styled.div`
  z-index: 10;
  width: 66%;
  height: 66%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GlassBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

export const GlassDecoration = styled.div<{ $width: string; $opacity: number }>`
  height: ${({ $width }) =>
    $width === "12" ? "3rem" : $width === "4" ? "1rem" : "0.75rem"};
  width: ${({ $width }) =>
    $width === "12" ? "3rem" : $width === "4" ? "50%" : "75%"};
  background-color: rgba(255, 255, 255, ${({ $opacity }) => $opacity});
  border-radius: ${({ $width }) => ($width === "12" ? "50%" : "0.25rem")};
  margin-bottom: ${({ $width }) =>
    $width === "12" ? "1rem" : $width === "4" ? "0.5rem" : "0"};
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
