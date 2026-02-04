import styled, { css } from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 12rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(219, 39, 119, 0.1); /* pink-600/10 */
  color: #ec4899;
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

export const Kbd = styled.kbd`
  background-color: ${({ theme }) => theme.colors.slate[800]};
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-family: monospace;
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
`;

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PaletteContainer = styled.div`
  flex: 1;
  display: flex;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const ColorColumn = styled.div<{ $hex: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ $hex }) => $hex};
  transition: all 0.3s;

  /* Group hover equivalent logic needs to be handled via component state or css nesting */
`;

export const ColorContent = styled.div<{ $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 10;
  color: ${({ $isDark }) =>
    $isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)"};
`;

export const LockButton = styled.button<{
  $isLocked: boolean;
  $isDark: boolean;
}>`
  padding: 0.75rem;
  border-radius: 9999px;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s;

  color: ${({ $isLocked, $isDark }) =>
    $isLocked
      ? $isDark
        ? "white"
        : "black"
      : $isDark
        ? "rgba(255, 255, 255, 0.4)"
        : "rgba(0, 0, 0, 0.3)"};

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const HexButton = styled.button`
  font-size: 1.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: monospace;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const CopyHint = styled.div`
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  opacity: 0;
  transition: opacity 0.2s;

  ${ColorColumn}:hover & {
    opacity: 0.6;
  }
`;

export const ColorActions = styled.div<{ $iconColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: 0;
  transition: all 0.2s;
  transform: translateY(1rem);

  ${ColorColumn}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  button {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
    color: ${({ $iconColor }) => $iconColor};
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const CopiedTooltip = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  z-index: 20;
  animation: zoomIn 0.2s ease-out;

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1rem 0;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const LegendDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
`;
