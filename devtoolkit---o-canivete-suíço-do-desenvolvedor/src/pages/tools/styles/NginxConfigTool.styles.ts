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
  background-color: rgba(5, 150, 105, 0.1); /* emerald-600/10 */
  color: #10b981;
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

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
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

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const FormSpace = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ToggleCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(16, 185, 129, 0.3); /* emerald-500/30 */
  }
`;

export const ToggleContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const ToggleLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const ToggleDescription = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

export const ToggleSwitch = styled.div<{ $checked: boolean }>`
  width: 2.5rem;
  height: 1.25rem;
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.2s;
  background-color: ${({ $checked, theme }) =>
    $checked ? "#059669" : theme.colors.slate[800]};
`;

export const ToggleKnob = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  transition: transform 0.2s;
  transform: ${({ $checked }) =>
    $checked ? "translateX(1.25rem)" : "translateX(0)"};
`;

export const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

export const InfoBox = styled.div`
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.slate[400]};
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
  border-radius: 2.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  height: 700px;
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

export const PreviewBadge = styled.span`
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

export const PreviewContent = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 1.5rem;
  overflow: auto;
  position: relative;

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
  color: #34d399;
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.625;
`;

export const GlowEffect = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8rem;
  height: 8rem;
  background-color: rgba(16, 185, 129, 0.05); /* emerald-500/05 */
  filter: blur(64px);
  border-radius: 9999px;
  pointer-events: none;
`;

export const PreviewFooter = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterText = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const StatusDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: #10b981;
`;

// Simple Toggle Item Component for cleaner TSX
export const ToggleItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: rgba(15, 23, 42, 0.5); /* slate-950/50 */
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const SimpleToggleLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[300]};
`;

export const SimpleToggleSwitch = styled.div<{ $checked: boolean }>`
  width: 2rem;
  height: 1rem;
  border-radius: 9999px;
  position: relative;
  transition: background-color 0.2s;
  background-color: ${({ $checked, theme }) =>
    $checked ? "#059669" : theme.colors.slate[800]};
`;

export const SimpleToggleKnob = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 0.125rem;
  left: 0.125rem;
  width: 0.75rem;
  height: 0.75rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 9999px;
  transition: transform 0.2s;
  transform: ${({ $checked }) =>
    $checked ? "translateX(1rem)" : "translateX(0)"};
`;
