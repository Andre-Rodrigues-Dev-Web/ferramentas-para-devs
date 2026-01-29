import styled, { keyframes, css } from "styled-components";

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
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const HeaderControls = styled.div`
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
  gap: 2rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const ControlsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ControlHeader = styled.div`
  display: flex;
  items-center;
  justify-content: space-between;
`;

export const ControlLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CounterControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const CounterButton = styled.button`
  padding: 0.25rem 0.5rem;
  background: transparent;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  color: ${({ theme }) => theme.colors.slate[400]};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CounterValue = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[400]};
  width: 1.5rem;
  text-align: center;
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

export const GapControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const GapLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const GapValue = styled.span`
  color: ${({ theme }) => theme.colors.primary[400]};
`;

export const CodeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CodeTitle = styled.h3`
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
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[400]};
  background-color: rgba(59, 130, 246, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  cursor: pointer;
  transition: all 0.2s;

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
  font-size: 0.6875rem;
  white-space: pre-wrap;
  line-height: 1.6;
  border: 1px solid rgba(30, 41, 59, 0.5);
  overflow-x: auto;
`;

export const PreviewArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const PreviewBox = styled.div`
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const PreviewBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image:
    linear-gradient(#fff 1px, transparent 1px),
    linear-gradient(90deg, #fff 1px, transparent 1px);
  background-size: 20px 20px;
`;

export const GridCell = styled.div`
  background-color: rgba(37, 99, 235, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    background-color: rgba(37, 99, 235, 0.2);
  }
`;

export const GridLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: rgba(59, 130, 246, 0.4);
  transition: color 0.2s;

  ${GridCell}:hover & {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const PreviewBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.slate[400]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoCard = styled.div<{ $variant?: "primary" | "default" }>`
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background-color: rgba(37, 99, 235, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.2);
        `
      : css`
          background-color: ${theme.colors.slate[900]};
          border: 1px solid ${theme.colors.slate[800]};
        `}
`;

export const InfoIcon = styled.div<{ $variant?: "primary" | "default" }>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  height: fit-content;

  ${({ $variant, theme }) =>
    $variant === "primary"
      ? css`
          background-color: rgba(37, 99, 235, 0.1);
          color: ${theme.colors.primary[500]};
        `
      : css`
          background-color: ${theme.colors.slate[800]};
          color: ${theme.colors.slate[400]};
        `}
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoTitle = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
`;

export const InfoText = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};

  code {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
