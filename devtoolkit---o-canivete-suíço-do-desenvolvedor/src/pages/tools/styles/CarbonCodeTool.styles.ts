import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem;
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
  background-color: rgba(219, 39, 119, 0.1); /* pink-600/10 */
  color: #ec4899;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ToolTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToolTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const ToolDescription = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: flex-start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

/* Editor Sidebar Styles */
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
  border-radius: 2.5rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: hidden;
`;

export const SettingsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SettingRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const SettingItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const Select = styled.select`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[300]};
  outline: none;
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    border-color: #ec4899;
  }
`;

export const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RangeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 0.25rem;
`;

export const RangeValue = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: #ec4899;
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
    background-color: #db2777;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.1s;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
`;

export const BackgroundGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
`;

export const ColorButton = styled.button<{ $bg: string; $active: boolean }>`
  aspect-ratio: 1;
  border-radius: 0.75rem;
  border: 2px solid;
  transition: all 0.2s;
  background: ${({ $bg }) => $bg};
  cursor: pointer;

  ${({ $active }) =>
    $active
      ? css`
          border-color: #ec4899;
          transform: scale(1.1);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `
      : css`
          border-color: transparent;
        `}
`;

export const BrandingSection = styled.div`
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TogglesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Input = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[300]};
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #ec4899;
  }
`;

export const IconsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

export const IconButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: #db2777;
          border-color: #ec4899;
          color: white;
        `
      : css`
          background-color: ${theme.colors.slate[950]};
          border-color: ${theme.colors.slate[800]};
          color: ${theme.colors.slate[600]};

          &:hover {
            color: ${theme.colors.slate[400]};
          }
        `}
`;

export const TipCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const TipIconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 1rem;
  height: fit-content;
  color: #3b82f6;
`;

export const TipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const TipTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const TipText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.6;
`;

/* Canvas Area Styles */
export const CanvasArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const CodeEditorCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

export const CardLabel = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CardBadge = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[700]};
  text-transform: uppercase;
`;

export const TextArea = styled.textarea`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #f472b6;
  outline: none;
  min-height: 150px;
  resize: none;
  transition: all 0.2s;

  &:focus {
    border-color: rgba(236, 72, 153, 0.5); /* pink-500/50 */
  }
`;

export const PreviewContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  position: relative;
  overflow: hidden;
`;

export const PreviewPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: radial-gradient(circle, white 1px, transparent 1px);
  background-size: 40px 40px;
`;

export const LiveCanvas = styled.div<{ $bg: string; $padding: number }>`
  transition: all 0.5s;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  background: ${({ $bg }) => $bg};
  padding: ${({ $padding }) => `${$padding}px`};
  border-radius: 12px;
  max-width: 100%;
`;

export const CodeWindow = styled.div<{
  $bg: string;
  $radius: number;
  $shadow: number;
}>`
  overflow: hidden;
  position: relative;
  background-color: ${({ $bg }) => $bg};
  border-radius: ${({ $radius }) => `${$radius}px`};
  box-shadow: ${({ $shadow }) =>
    `0 ${$shadow / 2}px ${$shadow}px rgba(0,0,0,0.4)`};
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

export const WindowControls = styled.div`
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ControlDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const LanguageBadge = styled.div`
  margin-left: 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
  color: rgba(148, 163, 184, 0.8);
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const CodeContent = styled.div<{
  $showControls: boolean;
  $fontSize: number;
}>`
  padding: 2rem;
  padding-top: ${({ $showControls }) => ($showControls ? "1rem" : "2rem")};
  display: flex;
  font-size: ${({ $fontSize }) => `${$fontSize}px`};
  line-height: 1.6;
`;

export const LineNumbers = styled.div`
  padding-right: 1rem;
  margin-right: 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  text-align: right;
  user-select: none;
  opacity: 0.2;
  font-family: monospace;
`;

export const Pre = styled.pre`
  margin: 0;
  font-family: monospace;
  white-space: pre;
  text-align: left;
  flex: 1;
`;

export const CodeBlock = styled.code<{ $color: string }>`
  display: block;
  color: ${({ $color }) => $color};
`;

export const Watermark = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.2;
  filter: grayscale(100%);
  pointer-events: none;
`;

export const WatermarkIcon = styled.div`
  background-color: #ec4899;
  padding: 0.25rem;
  border-radius: 0.375rem;
  display: flex;
`;

export const WatermarkText = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: white;
`;

export const LiveViewBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  pointer-events: none;
`;

export const BadgeContent = styled.div`
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(4px);
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const BadgeText = styled.span`
  font-size: 0.5625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const SmallTip = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const SmallTipIcon = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  color: #f472b6;
`;

export const SmallTipText = styled.p`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

/* Helper Components */
export const ToggleLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:hover span {
    color: ${({ theme }) => theme.colors.slate[200]};
  }
`;

export const ToggleText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
  transition: color 0.2s;
`;

export const ToggleSwitch = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 2.25rem;
  height: 1.25rem;
  border-radius: 9999px;
  transition: background 0.2s;
  background-color: ${({ $checked, theme }) =>
    $checked ? "#db2777" : theme.colors.slate[800]};
`;

export const ToggleKnob = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${({ $checked }) =>
    $checked ? "translateX(1rem)" : "translateX(0)"};
`;
