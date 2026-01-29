import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(234, 88, 12, 0.1); /* orange-600/10 */
  color: #f97316;
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
  letter-spacing: -0.025em;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const OfficialLink = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    color: #f97316;
  }
`;

export const MainContent = styled.div`
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchForm = styled.form`
  position: relative;

  &:focus-within svg {
    color: #f97316;
  }
`;

export const SearchIconWrapper = styled.div<{ $loading: boolean }>`
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme, $loading }) =>
    $loading ? "#f97316" : theme.colors.slate[500]};
  transition: color 0.2s;
  ${({ $loading }) =>
    $loading &&
    css`
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.25rem 8rem 1.25rem 3.5rem;
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  outline: none;
  transition: all 0.2s;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[600]};
  }

  &:focus {
    border-color: rgba(249, 115, 22, 0.5); /* orange-500/50 */
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: #ea580c;
  color: white;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.75rem 1.5rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover:not(:disabled) {
    background-color: #c2410c;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    cursor: not-allowed;
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
`;

export const LoadingState = styled.div`
  padding: 6rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

export const LoadingIconContainer = styled.div`
  position: relative;

  svg:first-child {
    color: rgba(249, 115, 22, 0.1);
    animation: ${bounce} 1s infinite;
  }

  svg:last-child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #f97316;
  }
`;

export const LoadingText = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.025em;
  }

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.slate[500]};
    max-width: 20rem;
    margin: 0 auto;
  }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideIn} 0.5s ease-out;
`;

export const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
`;

export const ResultBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 20rem;
  height: 20rem;
  background-color: rgba(234, 88, 12, 0.05); /* orange-600/5 */
  filter: blur(100px);
  z-index: 0;
  pointer-events: none;
`;

export const ResultHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2.5rem;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1); /* slate-800/50 */
  padding-bottom: 2.5rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    flex-direction: row;
  }
`;

export const PackageInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PackageName = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 3rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.white};
    letter-spacing: -0.05em;
    line-height: 1;
  }

  span {
    padding: 0.25rem 0.75rem;
    background-color: ${({ theme }) => theme.colors.slate[800]};
    color: #fb923c;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-family: monospace;
    font-weight: 700;
    border: 1px solid rgba(249, 115, 22, 0.2);
  }
`;

export const PackageDesc = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 1.125rem;
  max-width: 42rem;
  line-height: 1.625;
`;

export const BadgesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const Badge = styled.div<{ $active: boolean }>`
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  transition: all 0.2s;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          color: #10b981;
        `
      : css`
          background-color: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #f87171;
        `}
`;

export const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  position: relative;
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SectionTitle = styled.h4`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.2em;
  padding: 0 0.25rem;
  margin-bottom: 1rem;
`;

export const SizeCard = styled.div<{ $highlight?: boolean }>`
  padding: 1.5rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  ${({ $highlight, theme }) =>
    $highlight
      ? css`
          background-color: rgba(249, 115, 22, 0.1); /* orange-500/10 */
          border: 2px solid rgba(249, 115, 22, 0.2);
          position: relative;
          overflow: hidden;
          transition: transform 0.2s;

          &:hover {
            transform: scale(1.05);
          }
        `
      : css`
          background-color: rgba(2, 6, 23, 0.5); /* slate-950/50 */
          border: 1px solid ${theme.colors.slate[800]};
        `}
`;

export const SizeLabel = styled.p<{ $highlight?: boolean }>`
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ $highlight, theme }) =>
    $highlight ? "#f97316" : theme.colors.slate[500]};
`;

export const SizeValue = styled.p`
  font-size: 2.25rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
`;

export const DownloadTimeCard = styled.div`
  background-color: rgba(2, 6, 23, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
`;

export const TimeRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TimeMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
`;

export const TimeLabel = styled.span`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const TimeValue = styled.span`
  color: white;
  font-weight: 900;
`;

export const TimeBarBg = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 9999px;
  overflow: hidden;
`;

export const TimeBarFill = styled.div<{ $color: string; $width: number }>`
  height: 100%;
  background-color: ${({ $color }) => $color};
  width: ${({ $width }) => $width}%;
  border-radius: 9999px;
`;

export const CompositionCard = styled.div`
  background-color: rgba(2, 6, 23, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
  height: 100%;
`;

export const CompositionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CompLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  span {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.slate[300]};
  }
`;

export const CompIcon = styled.div<{ $color: string }>`
  padding: 0.5rem;
  background-color: ${({ $color }) => `${$color}1A`}; /* 10% opacity */
  color: ${({ $color }) => $color};
  border-radius: 0.75rem;
`;

export const FooterInfo = styled.div`
  padding: 1.5rem;
  background-color: rgba(234, 88, 12, 0.05);
  border: 1px solid rgba(249, 115, 22, 0.1);
  border-radius: 1.5rem;
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const InfoIcon = styled.div`
  padding: 0.75rem;
  background-color: rgba(249, 115, 22, 0.1);
  border-radius: 1rem;
  height: fit-content;
  color: #f97316;
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p.title {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.slate[200]};
  }

  p.desc {
    line-height: 1.625;
  }
`;

export const InitialStateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const IntroCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
`;

export const IntroIcon = styled.div`
  padding: 1.25rem;
  background-color: rgba(234, 88, 12, 0.1);
  color: #f97316;
  border-radius: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(249, 115, 22, 0.1);
`;

export const RecentList = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RecentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  h3 {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.slate[500]};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0 0.5rem;
  }
`;

export const RecentItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(249, 115, 22, 0.5);
    background-color: ${({ theme }) => theme.colors.slate[900]};
  }
`;

export const RecentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
`;

export const RecentIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: color 0.2s;

  ${RecentItem}:hover & {
    color: #fb923c;
  }
`;
