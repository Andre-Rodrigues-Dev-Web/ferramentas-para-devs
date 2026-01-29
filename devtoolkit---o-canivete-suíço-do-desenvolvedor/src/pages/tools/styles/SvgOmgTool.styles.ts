import styled, { css } from "styled-components";

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
  background-color: rgba(79, 70, 229, 0.1); /* indigo-600/10 */
  color: #6366f1;
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
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const SettingsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RangeWrapper = styled.div`
  padding-top: 0.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

export const RangeValue = styled.span`
  color: #818cf8;
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    background-color: #6366f1;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const FilesCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const FilesHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const AddButton = styled.button`
  color: #818cf8;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #a5b4fc;
  }
`;

export const FilesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 0.25rem;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    border-radius: 2px;
  }
`;

export const EmptyFiles = styled.div`
  padding: 2.5rem 0;
  text-align: center;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const FileItem = styled.div<{ $isActive: boolean }>`
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid
    ${({ $isActive, theme }) =>
      $isActive ? "rgba(99, 102, 241, 0.3)" : theme.colors.slate[800]};
  background-color: ${({ $isActive, theme }) =>
    $isActive ? "rgba(99, 102, 241, 0.1)" : "rgba(30, 41, 59, 0.5)"};
  transition: all 0.2s;
  cursor: pointer;
  position: relative;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const FileName = styled.p`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FileMeta = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const FileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ActionIconButton = styled.button`
  padding: 0.375rem;
  border-radius: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &.delete {
    color: ${({ theme }) => theme.colors.slate[600]};
    opacity: 0;

    ${FileItem}:hover & {
      opacity: 1;
    }

    &:hover {
      color: #f87171;
    }
  }

  &.optimize {
    background-color: #4f46e5;
    color: white;

    &:hover {
      background-color: #4338ca;
    }
  }
`;

export const MainWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const UploadArea = styled.div<{ $isDragging: boolean }>`
  aspect-ratio: 16/9;
  border: 2px dashed
    ${({ $isDragging, theme }) =>
      $isDragging ? "#6366f1" : theme.colors.slate[800]};
  background-color: ${({ $isDragging, theme }) =>
    $isDragging ? "rgba(79, 70, 229, 0.05)" : "rgba(15, 23, 42, 0.5)"};
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[900]};
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const UploadIconWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.slate[600]};
  margin-bottom: 1rem;
  transition: all 0.2s;

  ${UploadArea}:hover & {
    color: #818cf8;
    transform: scale(1.1);
  }
`;

export const WorkspaceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  height: 600px;
`;

export const WorkspaceHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FileIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(79, 70, 229, 0.1);
  color: #6366f1;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FileNameHeader = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const StatsBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.125rem;
`;

export const StatText = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

export const SavingsBadge = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
  padding: 0 0.25rem;
  border-radius: 0.25rem;
`;

export const ViewToggle = styled.div`
  display: flex;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  margin-right: 0.5rem;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ $active, theme }) =>
    $active ? "#4f46e5" : "transparent"};

  color: ${({ $active, theme }) =>
    $active ? "white" : theme.colors.slate[500]};

  &:hover {
    color: ${({ $active, theme }) => !$active && theme.colors.slate[300]};
  }
`;

export const WorkspaceContent = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
`;

export const SplitView = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  divide-x: 1px;
  border-right-color: ${({ theme }) => theme.colors.slate[800]};
`;

export const ViewPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PanelTitle = styled.div`
  padding: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  background-color: rgba(15, 23, 42, 0.5);
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  text-center;
`;

export const SvgPreview = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
  overflow: auto;

  div {
    max-width: 100%;
    max-height: 100%;
    filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.03))
      drop-shadow(0 8px 5px rgba(0, 0, 0, 0.08));
  }
`;

export const CodePreview = styled.pre<{ $isOptimized?: boolean }>`
  flex: 1;
  padding: 1.5rem;
  font-size: 0.6875rem;
  font-family: monospace;
  color: ${({ $isOptimized }) =>
    $isOptimized ? "#a5b4fc" : ({ theme }) => theme.colors.slate[500]};
  overflow: auto;
  white-space: pre-wrap;
  background-color: ${({ $isOptimized }) =>
    $isOptimized ? "rgba(15, 23, 42, 0.4)" : "transparent"};
`;

export const LoadingState = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.slate[700]};

  p {
    font-size: 0.75rem;
    font-style: italic;
    margin-top: 1rem;
  }
`;

export const ToggleSettingWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover span {
    color: ${({ theme }) => theme.colors.slate[200]};
  }
`;

export const SettingLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  transition: color 0.2s;
`;

export const Switch = styled.div`
  position: relative;
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
`;

export const SwitchKnob = styled.div`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background-color: white;
  border-radius: 9999px;
  transition: transform 0.2s;
`;
