import styled, { css, keyframes } from "styled-components";

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

export const HeaderContent = styled.div`
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

export const GridLayout = styled.div`
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
    grid-column: span 3 / span 3;
  }
`;

export const ConfigBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const CategoryButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? "rgba(37, 99, 235, 0.1)" : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[400] : theme.colors.slate[400]};

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? "rgba(37, 99, 235, 0.1)" : theme.colors.slate[800]};
  }
`;

export const AnimationButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;
  border: none;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primary[600] : "transparent"};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.white : theme.colors.slate[400]};
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 10px 15px -3px rgba(37, 99, 235, 0.3)" : "none"};

  &:hover {
    background-color: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary[600] : theme.colors.slate[800]};
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 6 / span 6;
  }
`;

export const PreviewBox = styled.div`
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const PreviewBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  pointer-events: none;
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 30px 30px;
`;

export const AnimatedElement = styled.div`
  width: 6rem;
  height: 6rem;
  background: linear-gradient(to bottom right, #3b82f6, #4f46e5);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2);
`;

export const PreviewControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

export const PreviewLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: -0.05em;
`;

export const ReplayButton = styled.button`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.slate[400]};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const ControlsGrid = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ControlHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const ControlValue = styled.span`
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
  }
`;

export const SelectInput = styled.select`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[300]};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const OutputColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 3 / span 3;
  }
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

export const CodeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  margin-bottom: 1rem;
`;

export const CodeLabel = styled.span`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-weight: 700;
  text-transform: uppercase;
`;

export const CodeBlock = styled.code`
  display: block;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 0.75rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  font-family: monospace;
  font-size: 0.6875rem;
  word-break: break-all;
  border: 1px solid rgba(30, 41, 59, 0.5);
  overflow-x: auto;
`;

export const KeyframesBlock = styled(CodeBlock)`
  color: #c084fc;
  max-height: 300px;
  overflow-y: auto;
`;

export const TipBox = styled.div`
  padding: 1rem;
  background-color: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.6875rem;
  line-height: 1.6;
`;

export const TipContent = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};

  strong {
    color: ${({ theme }) => theme.colors.slate[200]};
  }

  code {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;
