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
  background-color: rgba(124, 58, 237, 0.1); /* violet-600/10 */
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"};
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
  height: 700px;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  height: 100%;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const CanvasColumn = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const GridBackground = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image:
    linear-gradient(#fff 1px, transparent 1px),
    linear-gradient(90deg, #fff 1px, transparent 1px);
  background-size: 40px 40px;
`;

export const CanvasContent = styled.div`
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-content: flex-start;
  overflow: auto;
`;

export const SidebarCard = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
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

export const EmptySelection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  gap: 1rem;
`;

export const EmptyIcon = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const EmptyText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const TableEditor = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 1.5rem;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TableNameInputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ColorDot = styled.div<{ $color: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
`;

export const TableNameInput = styled.input`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 0.25rem 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  transition: border-color 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"};
  }
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ColumnsList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ColumnItem = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ColumnNameInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  border-bottom: 1px solid transparent;
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
  outline: none;

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"}80;
  }
`;

export const RemoveColumnButton = styled.button`
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.slate[700]};
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;

  ${ColumnItem}:hover & {
    opacity: 1;
  }

  &:hover {
    color: #f87171;
  }
`;

export const ColumnControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Select = styled.select`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[400] : "#a78bfa"};
  outline: none;
  cursor: pointer;
`;

export const ToggleButton = styled.button<{ $active: boolean; $color: string }>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $active, $color, theme }) =>
    $active
      ? `
    background-color: ${$color}1a; /* 10% opacity */
    border-color: ${$color}80; /* 50% opacity */
    color: ${$color};
  `
      : `
    background-color: ${theme.colors.slate[900]};
    border-color: ${theme.colors.slate[800]};
    color: ${theme.colors.slate[600]};
    
    &:hover {
      color: ${theme.colors.slate[400]};
    }
  `}
`;

export const AddColumnButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[400] : "#a78bfa"};
    border-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"}4d;
  }
`;

export const OutputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const OutputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OutputTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CopyButton = styled.button`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"};
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[400] : "#a78bfa"};
  }
`;

export const CodePre = styled.pre`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: 0.75rem;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[400] : "#60a5fa"};
  font-family: monospace;
  font-size: 0.625rem;
  height: 8rem;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const TableNode = styled.div<{ $active: boolean; $color: string }>`
  min-width: 240px;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px solid
    ${({ theme, $active, $color }) =>
      $active ? $color : theme.colors.slate[800]};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  ${({ $active, $color }) =>
    $active &&
    `
    box-shadow: 0 0 0 4px ${$color}1a;
  `}
`;

export const TableNodeHeader = styled.div<{ $color: string }>`
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid ${({ $color }) => $color};
`;

export const TableName = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-weight: 900;
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.white};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    max-width: 150px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const DeleteTableButton = styled.button`
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.slate[700]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f87171;
  }
`;

export const TableNodeFields = styled.div`
  padding: 0.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const FieldRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(30, 41, 59, 0.5);
  }
`;

export const FieldInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FieldName = styled.span<{ $isPk?: boolean }>`
  font-size: 0.6875rem;
  font-weight: 500;
  color: ${({ $isPk, theme }) => ($isPk ? "#f59e0b" : theme.colors.slate[300])};
`;

export const FieldType = styled.span`
  font-size: 0.5625rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[600]};

  ${FieldRow}:hover & {
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

export const TableNodeFooter = styled.div`
  background-color: rgba(2, 6, 23, 0.5);
  padding: 0.375rem 0.75rem;
  border-top: 1px solid rgba(30, 41, 59, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FieldsCount = styled.span`
  font-size: 0.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
`;

export const AddFieldLink = styled.button`
  font-size: 0.5rem;
  font-weight: 900;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#8b5cf6"};
  background: none;
  border: none;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[400] : "#a78bfa"};
  }
`;

export const EmptyCanvas = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1.5rem;
  opacity: 0.2;
  transition: opacity 0.2s;
  pointer-events: none; /* Make click-through */

  ${CanvasColumn}:hover & {
    opacity: 0.4;
  }
`;

export const EmptyCanvasIcon = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 3rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const EmptyCanvasText = styled.div`
  max-width: 20rem;

  h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.slate[400]};
  }
`;

export const FloatButtonContainer = styled.div`
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const AddTableFloatButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[600] : "#7c3aed"};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const WorkspaceBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  pointer-events: none;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const PulseDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#22c55e"};

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const BadgeText = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
