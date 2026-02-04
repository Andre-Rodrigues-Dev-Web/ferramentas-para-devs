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
  background-color: rgba(13, 148, 136, 0.1); /* teal-600/10 */
  color: #14b8a6;
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

export const ControlsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const ConfigSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 5 / span 5;
  }
`;

export const ConfigCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const ConfigHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AddFieldButton = styled.button`
  font-size: 0.625rem;
  font-weight: 700;
  color: #14b8a6;
  text-transform: uppercase;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2dd4bf;
  }
`;

export const FieldsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.slate[800]};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  transition: all 0.2s;

  &:hover {
    border-color: rgba(20, 184, 166, 0.3); /* teal-500/30 */
  }
`;

export const FieldNameInput = styled.input`
  width: 50%;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #14b8a6;
  }
`;

export const FieldTypeSelect = styled.select`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[300]};
  outline: none;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    border-color: #14b8a6;
  }
`;

export const RemoveFieldButton = styled.button`
  padding: 0.375rem;
  color: ${({ theme }) => theme.colors.slate[700]};
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #f87171;
  }

  &:disabled {
    opacity: 0;
    pointer-events: none;
  }
`;

export const SettingsGrid = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const SettingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SettingLabel = styled.label`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const NumberInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.white};
  outline: none;

  &:focus {
    border-color: #14b8a6;
  }
`;

export const FormatButtonGroup = styled.div`
  display: flex;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  height: 2.25rem;
`;

export const FormatButton = styled.button<{ $active: boolean }>`
  flex: 1;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  background-color: ${({ $active, theme }) =>
    $active ? "#0d9488" : "transparent"};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.slate[500]};

  &:hover {
    color: ${({ $active, theme }) => !$active && theme.colors.slate[300]};
  }
`;

export const PreviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 7 / span 7;
  }
`;

export const PreviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  height: 600px;
`;

export const PreviewHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PreviewTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const HeaderActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const PreviewContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  overflow: auto;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.slate[800]};
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const CodeBlock = styled.pre`
  color: #2dd4bf;
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.625;
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  opacity: 0.3;

  p {
    color: ${({ theme }) => theme.colors.slate[600]};
  }
`;

export const PreviewFooter = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterText = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const StatusDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Dot = styled.div<{ $color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ $color }) => $color};
`;
