import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2.5rem;
`;

export const Header = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  margin-top: 0.5rem;
`;

export const EmptyState = styled.div`
  height: 400px;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
`;

export const KeyboardIcon = styled.div`
  color: ${({ theme }) => theme.colors.slate[700]};
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 500;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: zoomIn 0.2s ease-out;

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const MainKeyDisplay = styled.div`
  display: flex;
  justify-content: center;
`;

export const KeyCard = styled.div`
  background-color: #2563eb;
  padding: 2rem 3rem;
  border-radius: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(37, 99, 235, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 200px;
`;

export const KeyCodeValue = styled.span`
  font-size: 3.75rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`;

export const KeyLabel = styled.span`
  color: #dbeafe;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const InfoValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  font-family: monospace;
`;

export const ModifiersCard = styled(InfoCard)`
  justify-content: center;
  gap: 1rem;
`;

export const ModifiersList = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ModifierBadge = styled.div<{ $active: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid;
  transition: all 0.2s;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: #2563eb;
          border-color: #3b82f6;
          color: ${theme.colors.white};
        `
      : css`
          background-color: ${theme.colors.slate[800]};
          border-color: ${theme.colors.slate[700]};
          color: ${theme.colors.slate[600]};
        `}
`;

export const HintCard = styled.div`
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const HintIconWrapper = styled.div`
  color: #3b82f6;
  margin-top: 0.125rem;
`;

export const HintText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};

  strong {
    color: ${({ theme }) => theme.colors.slate[200]};
    font-weight: 700;
  }

  code {
    color: #60a5fa;
    font-family: monospace;
  }
`;
