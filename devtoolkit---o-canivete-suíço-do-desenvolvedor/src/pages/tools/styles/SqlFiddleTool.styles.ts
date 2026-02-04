import styled from "styled-components";
import { Textarea } from "../../../shared/ui/Input";

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
  background-color: rgba(37, 99, 235, 0.1); /* blue-600/10 */
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
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

export const DialectSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  outline: none;
  transition: all 0.2s;
  cursor: pointer;
  appearance: none;

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  }
`;

export const EditorsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  height: 500px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const EditorColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  height: 100%;
`;

export const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

export const Label = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SqlEditor = styled(Textarea)`
  flex: 1;
  height: 100%;

  textarea {
    height: 100% !important;
    min-height: 0 !important;
    resize: none;
    font-family: monospace;
    font-size: 0.75rem;
    border-color: ${({ theme }) => theme.colors.slate[800]};
    background-color: ${({ theme }) => theme.colors.slate[950]};

    &:focus {
      border-color: ${({ theme }) =>
        theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
    }
  }
`;

export const ResultsContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

export const ResultsHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  backdrop-filter: blur(12px);
`;

export const Tabs = styled.div`
  display: flex;
  gap: 1rem;
`;

export const TabButton = styled.button<{ $active: boolean }>`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  position: relative;
  padding-bottom: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;

  color: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary
        ? theme.colors.primary[400]
        : "#60a5fa"
      : theme.colors.slate[500]};

  &:hover {
    color: ${({ $active, theme }) => !$active && theme.colors.slate[300]};
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    right: 0;
    height: 0.125rem;
    background-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
    border-radius: 9999px;
    opacity: ${({ $active }) => ($active ? 1 : 0)};
    transition: opacity 0.2s;
  }
`;

export const ExportButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ResultsContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow: auto;

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
    font-size: 0.875rem;
    font-style: italic;
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

export const ErrorBox = styled.div`
  background-color: rgba(239, 68, 68, 0.1); /* red-500/10 */
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  color: #f87171;
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  width: fit-content;
  color: ${({ theme }) => theme.colors.slate[500]};

  svg {
    color: #22c55e;
  }
`;

export const TableContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.colors.slate[950]};
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.slate[400]};
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[300]};
  border-bottom: 1px solid rgba(30, 41, 59, 0.5); /* slate-800/50 */
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(30, 41, 59, 0.5); /* slate-900/50 */
  }

  &:last-child ${Td} {
    border-bottom: none;
  }
`;

export const SchemaView = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const TableCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 0.5rem;
`;

export const TableName = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[400] : "#60a5fa"};
`;

export const RowCount = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const FieldItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.625rem;

  &:hover span:last-child {
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

export const FieldName = styled.div<{ $isPk?: boolean }>`
  font-weight: 700;
  color: ${({ $isPk, theme }) => ($isPk ? "#f59e0b" : theme.colors.slate[300])};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PkBadge = styled.span`
  font-size: 0.5rem;
  font-weight: 900;
  background-color: rgba(245, 158, 11, 0.1);
  color: #d97706;
  padding: 0 0.25rem;
  border-radius: 0.25rem;
`;

export const FieldType = styled.span`
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const Footer = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};

  p {
    font-size: 0.625rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: -0.025em;
  }
`;
