import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2.5rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1); /* blue-600/10 */
  color: #3b82f6;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ActionButton = styled.button`
  color: ${({ theme }) => theme.colors.slate[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f87171;
  }
`;

export const CopyButton = styled.button`
  font-size: 0.75rem;
  font-weight: 700;
  color: #60a5fa;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  &:hover {
    color: #93c5fd;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const OutputContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const OutputBox = styled.div`
  width: 100%;
  height: 400px;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.75rem;
  color: #93c5fd;
  word-break: break-all;
  overflow: auto;
`;

export const Placeholder = styled.span`
  color: ${({ theme }) => theme.colors.slate[700]};
  font-style: italic;
`;

export const StatsBar = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;
`;

export const StatItem = styled.div`
  background-color: rgba(15, 23, 42, 0.9); /* slate-900/90 */
  backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const StatLabel = styled.div`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.125rem;
`;

export const StatValue = styled.div<{ $isGreen?: boolean }>`
  font-weight: 700;
  color: ${({ $isGreen }) => ($isGreen ? "#4ade80" : "#60a5fa")};
`;
