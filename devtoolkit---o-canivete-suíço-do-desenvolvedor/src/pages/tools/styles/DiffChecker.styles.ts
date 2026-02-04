import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2.5rem;
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
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
`;

export const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${slideIn} 0.3s ease-out;
`;

export const ResultHeader = styled.div`
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[700]};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ResultTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[300]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const Legend = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.625rem;
  font-weight: 700;
`;

export const LegendItem = styled.span<{ $type: "added" | "removed" }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${({ $type }) => ($type === "added" ? "#4ade80" : "#f87171")};
`;

export const Dot = styled.span<{ $type: "added" | "removed" }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ $type }) =>
    $type === "added" ? "#22c55e" : "#ef4444"};
`;

export const DiffContent = styled.div`
  padding: 1.5rem;
  font-family: "Fira Code", monospace;
  font-size: 0.75rem;
  overflow: auto;
  max-height: 600px;
  background-color: ${({ theme }) => theme.colors.slate[950]};
`;

export const DiffLine = styled.div<{ $type: "same" | "added" | "removed" }>`
  display: flex;
  gap: 1rem;
  padding: 0.125rem 0.5rem;
  margin: 0 -0.5rem;

  ${({ $type }) =>
    $type === "added" &&
    `
    background-color: rgba(34, 197, 94, 0.1);
    color: #4ade80;
  `}

  ${({ $type }) =>
    $type === "removed" &&
    `
    background-color: rgba(239, 68, 68, 0.1);
    color: #f87171;
  `}
  
  ${({ $type }) =>
    $type === "same" &&
    `
    color: #64748b;
  `}
`;

export const LineNumber = styled.span`
  width: 2rem;
  text-align: right;
  user-select: none;
  opacity: 0.3;
`;

export const LineMarker = styled.span`
  user-select: none;
  width: 1rem;
`;

export const LineText = styled.span`
  white-space: pre-wrap;
`;
