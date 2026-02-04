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

export const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
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
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
  max-height: 600px;
  overflow-y: auto;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 3 / span 3;
  }
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const GridList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const TooltipContent = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(10px);
  margin-left: 0.75rem;
  z-index: 60;
  width: 16rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s;
  pointer-events: none;
  border-left: 4px solid ${({ theme }) => theme.colors.primary[500]};
  display: none;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    display: block;
  }
`;

export const PresetButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.slate[400]};
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.slate[800]};
    border-color: ${({ theme }) => theme.colors.slate[700]};

    /* Show Tooltip on Hover */
    ${TooltipContent} {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(0px);
    }
  }
`;

export const PresetIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: rgba(37, 99, 235, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 0.25rem;
  flex-shrink: 0;
`;

export const PresetTooltipArrow = styled.div`
  position: absolute;
  top: 50%;
  left: -0.375rem;
  transform: translateY(-50%) rotate(45deg);
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-left: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[700]};
`;

export const EditorArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 6 / span 6;
  }
`;

export const CanvasContainer = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const CanvasBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.1;
  pointer-events: none;
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 20px 20px;
`;

export const CanvasInteractive = styled.div<{
  $showImage: boolean;
  $clipPath: string;
}>`
  position: absolute;
  inset: 2rem;
  transition: all 0.3s;
  background-size: cover;
  background-position: center;
  clip-path: ${({ $clipPath }) => $clipPath};

  ${({ $showImage, theme }) =>
    $showImage
      ? css`
          background-image: url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800");
          background-color: transparent;
        `
      : css`
          background-image: none;
          background-color: ${theme.colors.primary[500]};
        `}
`;

export const SvgLayer = styled.svg`
  position: absolute;
  inset: 2rem;
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
  touch-action: none;
  cursor: crosshair;
  overflow: visible;
`;

export const OutputArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 3 / span 3;
  }
`;

export const CodeBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary[400]};
  background-color: rgba(59, 130, 246, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }
`;

export const CodeContent = styled.code`
  display: block;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  font-family: monospace;
  font-size: 0.75rem;
  word-break: break-all;
  border: 1px solid rgba(30, 41, 59, 0.5);
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
`;

export const PointsList = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const PointItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  font-size: 0.75rem;
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  margin-bottom: 0.5rem;
`;
