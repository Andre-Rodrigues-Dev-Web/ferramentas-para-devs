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
  background-color: rgba(217, 119, 6, 0.1); /* amber-600/10 */
  color: #f59e0b;
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
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const EditorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const PartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    gap: 1rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const InputLabel = styled.label<{ $active?: boolean }>`
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  transition: color 0.2s;
  color: ${({ $active, theme }) =>
    $active ? "#f59e0b" : theme.colors.slate[600]};
`;

export const PartInput = styled.input<{ $active?: boolean }>`
  width: 3rem;
  height: 3rem;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 900;
  border-radius: 1rem;
  border: 2px solid;
  transition: all 0.2s;
  outline: none;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    width: 4rem;
    height: 4rem;
  }

  ${({ $active, theme }) =>
    $active
      ? `
    background-color: #d97706;
    border-color: #fbbf24;
    color: ${theme.colors.white};
    box-shadow: 0 10px 15px -3px rgba(217, 119, 6, 0.2);
    transform: scale(1.1);
  `
      : `
    background-color: ${theme.colors.slate[950]};
    border-color: ${theme.colors.slate[800]};
    color: ${theme.colors.slate[400]};
  `}
`;

export const ExpressionDisplay = styled.div`
  width: 100%;
  max-width: 32rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:focus-within {
    border-color: rgba(245, 158, 11, 0.5);
  }
`;

export const ExpressionLabel = styled.div`
  padding: 0 1rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-family: monospace;
  font-size: 0.75rem;
`;

export const ExpressionInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  font-family: monospace;
  font-size: 1.25rem;
  color: #fbbf24;
  padding: 0.75rem 0;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[800]};
  }
`;

export const ResetButton = styled.button`
  padding: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[700]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const ExplanationBox = styled.div`
  background-color: rgba(217, 119, 6, 0.05);
  border: 1px solid rgba(217, 119, 6, 0.2);
  border-radius: 1.5rem;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ExplanationText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  color: #fef3c7;
  line-height: 1.625;
  font-style: italic;
`;

export const LiveTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: rgba(217, 119, 6, 0.6);
`;

export const ReferenceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const RefItem = styled.div`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    text-align: left;
  }
`;

export const RefLabel = styled.div`
  font-size: 0.5625rem; /* 9px */
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const RefValue = styled.div`
  font-size: 0.75rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[300]};
  margin-top: 0.125rem;
`;

export const InfoBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const InfoIconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  color: #3b82f6;
  border-radius: 0.75rem;
  flex-shrink: 0;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.625;

  code {
    color: #f59e0b;
  }
`;

export const SidebarCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SidebarTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PresetsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  overflow-y: auto;
  padding-right: 0.25rem;
`;

export const PresetButton = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(245, 158, 11, 0.5);
    background-color: ${({ theme }) => theme.colors.slate[900]};
  }
`;

export const PresetLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[300]};
  margin-bottom: 0.5rem;
  transition: color 0.2s;

  ${PresetButton}:hover & {
    color: #fbbf24;
  }
`;

export const PresetValueContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PresetCode = styled.code`
  font-size: 0.625rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[600]};
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: color 0.2s;

  ${PresetButton}:hover & {
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const ChevronWrapper = styled.div`
  color: ${({ theme }) => theme.colors.slate[800]};
  transition: all 0.2s;

  ${PresetButton}:hover & {
    color: #f59e0b;
    transform: translateX(0.25rem);
  }
`;

export const SidebarFooter = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;
