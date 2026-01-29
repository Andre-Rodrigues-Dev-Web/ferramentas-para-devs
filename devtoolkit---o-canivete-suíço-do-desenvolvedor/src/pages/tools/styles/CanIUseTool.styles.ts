import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 80rem; /* max-w-7xl */
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
  color: #3b82f6;
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

export const OfficialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: color 0.2s;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  text-decoration: none;

  &:hover {
    color: #60a5fa;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

/* Sidebar Styles */

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;

  &:focus-within svg {
    color: #3b82f6;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.slate[600]};
  transition: color 0.2s;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 0.75rem 1rem 0.75rem 3rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[600]};
  }

  &:focus {
    border-color: #3b82f6;
  }
`;

export const FeatureList = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1rem;
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  /* Custom Scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.slate[700]};
    border-radius: 20px;
  }
`;

export const FeatureButton = styled.button<{ $isActive: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: #2563eb;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.slate[400]};

          &:hover {
            background-color: ${theme.colors.slate[800]};
          }

          /* Group hover effect simulation for text color */
          &:hover div:first-child div:first-child {
            color: white;
          }
        `}
`;

export const FeatureInfo = styled.div`
  overflow: hidden;
`;

export const FeatureTitle = styled.div<{ $isActive: boolean }>`
  font-weight: 700;
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ $isActive, theme }) => ($isActive ? "white" : "inherit")};
`;

export const FeatureUsage = styled.div<{ $isActive: boolean }>`
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ $isActive, theme }) =>
    $isActive ? "#bfdbfe" : theme.colors.slate[600]};
`;

export const EmptyState = styled.div`
  padding: 2.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-size: 0.875rem;
  font-style: italic;
`;

/* Main Details Styles */

export const MainDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const DetailCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
`;

export const DetailBackground = styled.div`
  position: absolute;
  top: -6rem;
  right: -6rem;
  width: 16rem;
  height: 16rem;
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/5 */
  filter: blur(100px);
  border-radius: 9999px;
  pointer-events: none;
`;

export const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    flex-direction: row;
  }
`;

export const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[500]};
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
`;

export const DetailTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.2;
`;

export const DetailDescription = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 36rem;
  line-height: 1.625;
`;

export const UsageCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const UsageValue = styled.span`
  font-size: 1.875rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
`;

export const UsageLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.05em;
`;

export const BrowserGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const BrowserCard = styled.div<{ $status: "y" | "n" | "a" }>`
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.02);
  }

  ${({ $status }) => {
    switch ($status) {
      case "y":
        return css`
          background-color: rgba(34, 197, 94, 0.1);
          color: #4ade80;
          border-color: rgba(34, 197, 94, 0.2);
        `;
      case "a":
        return css`
          background-color: rgba(234, 179, 8, 0.1);
          color: #facc15;
          border-color: rgba(234, 179, 8, 0.2);
        `;
      case "n":
        return css`
          background-color: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
        `;
    }
  }}
`;

export const BrowserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BrowserIcon = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 0.75rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const BrowserStatus = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  opacity: 0.8;
`;

export const BrowserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const BrowserName = styled.h4`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.875rem;
`;

export const BrowserVersion = styled.p`
  font-size: 0.6875rem;
  font-weight: 500;
  opacity: 0.6;
`;

export const InfoBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[400]};

  svg {
    flex-shrink: 0;
    color: #3b82f6;
  }
`;

export const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const LegendIndictator = styled.div<{
  $colorv: string;
  $shadowv: string;
}>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${({ $colorv }) => $colorv};
  box-shadow: 0 10px 15px -3px ${({ $shadowv }) => $shadowv}; /* approximate shadow */
`;

export const LegendLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;
