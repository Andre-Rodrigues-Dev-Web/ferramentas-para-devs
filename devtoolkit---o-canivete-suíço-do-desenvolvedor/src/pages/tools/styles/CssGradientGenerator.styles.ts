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

export const ControlPanel = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  overflow: hidden;
`;

export const SectionLabel = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.75rem;
  display: block;
`;

export const ToggleGroup = styled.div`
  display: flex;
  padding: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  width: fit-content;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  padding: 0.375rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary[600]};
          color: ${theme.colors.white};
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.slate[400]};
          &:hover {
            color: ${theme.colors.slate[200]};
          }
        `}
`;

export const SettingsCard = styled.div`
  padding: 1rem;
  background-color: rgba(30, 41, 59, 0.3);
  border-radius: 0.75rem;
  border: 1px solid rgba(30, 41, 59, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Added gap for radial items */
`;

export const SettingsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;

  span:first-child {
    color: #94a3b8;
    font-weight: 500;
  }

  span:last-child {
    color: #60a5fa;
    font-weight: 700;
  }
`;

export const AngleLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  color: #475569;
  font-weight: 700;
  padding: 0 0.25rem;
  margin-top: 0.25rem;
`;

export const ShapeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const PositionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

export const PresetsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
`;

export const RangeInput = styled.input`
  width: 100%;
  height: 0.375rem;
  background-color: ${({ theme }) => theme.colors.slate[700]};
  border-radius: 9999px;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 1rem;
    height: 1rem;
    background-color: ${({ theme }) => theme.colors.primary[600]};
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  }
`;

export const Select = styled.select`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 0.5rem 0.75rem;
  color: ${({ theme }) => theme.colors.slate[200]};
  font-size: 0.875rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const VisualPicker = styled.div`
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  position: relative;
  cursor: crosshair;
  overflow: hidden;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const PickerHandle = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  margin-left: -0.75rem;
  margin-top: -0.75rem;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  border-radius: 9999px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: all 0.075s;
`;

export const StopsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const AddStopButton = styled.button`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #60a5fa;
  font-weight: 700;
  border: none;
  background: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const StopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(30, 41, 59, 0.5);
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const ColorInput = styled.input`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
`;

export const StopControls = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StopLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;

  span:last-child {
    color: #3b82f6;
  }
`;

export const RemoveStopButton = styled.button`
  padding: 0.5rem;
  color: #475569;
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #f87171;
  }
`;

export const PreviewColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewBox = styled.div`
  flex: 1;
  min-height: 350px;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  overflow: hidden;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const PreviewGradient = styled.div<{ $gradient: string }>`
  position: absolute;
  inset: 0;
  transition: all 0.3s;
  background: ${({ $gradient }) => $gradient};
`;

export const LiveBadge = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #94a3b8;
  border: 1px solid rgba(51, 65, 85, 1);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const CodeBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const CodeHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const CopyCodeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #60a5fa;
  background-color: rgba(59, 130, 246, 0.1);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(59, 130, 246, 0.2);
  cursor: pointer;
  transition: all 0.2s;
`;

export const CodePre = styled.pre`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: "Fira Code", monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary[400]};
  border: 1px solid rgba(30, 41, 59, 0.5);
  white-space: pre-wrap;
  word-break: break-all;
`;

export const PresetButton = styled.button<{ $active?: boolean }>`
  height: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.625rem;
  font-weight: 700;
  border: 1px solid
    ${({ theme, $active }) =>
      $active ? theme.colors.primary[500] : theme.colors.slate[700]};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.primary[600] : theme.colors.slate[800]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.slate[500]};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.colors.primary[600] : theme.colors.slate[700]};
    color: ${({ theme, $active }) =>
      $active ? theme.colors.white : theme.colors.slate[300]};
  }
`;
