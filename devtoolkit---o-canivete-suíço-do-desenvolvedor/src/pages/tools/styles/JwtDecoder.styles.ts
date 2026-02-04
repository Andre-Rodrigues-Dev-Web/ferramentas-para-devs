import styled from "styled-components";

export const Container = styled.div`
  max-width: 80rem; /* max-w-4xl is too small for 2 columns maybe? using default container but flex/grid */
  margin: 0 auto;
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
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: block;
`;

export const ErrorBox = styled.div`
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 0.75rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #f87171;
`;

export const ErrorText = styled.p`
  font-size: 0.875rem;
`;

export const OutputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DecodedCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  position: relative;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const SectionTitle = styled.h3<{ $color?: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ $color, theme }) => $color || theme.colors.primary[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StatusBadge = styled.div<{ $expired: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.625rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid;

  ${({ $expired }) =>
    $expired
      ? `
    background-color: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.3);
    color: #f87171;
  `
      : `
    background-color: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.3);
    color: #4ade80;
  `}
`;

export const JsonPre = styled.pre<{ $color?: string }>`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.5rem;
  color: ${({ $color, theme }) => $color || theme.colors.primary[300]};
  font-size: 0.875rem;
  overflow-x: auto;
  font-family: monospace;
`;

export const EmptyState = styled.div`
  height: 100%;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  gap: 1rem;
`;

export const EmptyText = styled.p`
  font-size: 0.875rem;
  font-style: italic;
`;
