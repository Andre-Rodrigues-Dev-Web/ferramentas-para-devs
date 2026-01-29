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

export const ErrorBanner = styled.div`
  background-color: rgba(245, 158, 11, 0.1); /* amber-500/10 */
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  color: #fde68a;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  animation: slideInDown 0.3s ease-out;

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const IpDisplayCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 300px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

export const GlowDecorationBlue = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 16rem;
  height: 16rem;
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  filter: blur(100px);
  z-index: -1;
  border-radius: 9999px;
`;

export const GlowDecorationPurple = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 12rem;
  height: 12rem;
  background-color: rgba(147, 51, 234, 0.05); /* purple-600/05 */
  filter: blur(80px);
  z-index: -1;
  border-radius: 9999px;
`;

export const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
`;

export const IpContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  animation: zoomIn 0.3s ease-out;

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const IpLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.3em;
`;

export const IpAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const IpAddress = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -0.05em;
  font-family: monospace;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    font-size: 4.5rem;
  }
`;

export const CopyButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[400]};
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[600] : "#2563eb"};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const InfoBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-top: 1rem;
`;

export const InfoBadge = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const InfoBadgeText = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[600]};

  p {
    font-size: 0.875rem;
    font-style: italic;
  }
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DetailsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CardTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const DetailsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const LocationCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const LocationHeader = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 1rem;
`;

export const LocationPlaceholder = styled.div`
  text-align: center;
  padding: 2.5rem 0;
  opacity: 0.3;
  font-style: italic;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  p {
    color: ${({ theme }) => theme.colors.slate[600]};
  }
`;

export const MapPlaceholder = styled.div`
  aspect-ratio: 16/9;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  pointer-events: none;
`;

export const MapText = styled.p`
  position: absolute;
  bottom: 0.75rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
`;

export const PrivacyCard = styled.div`
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const ShieldWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1); /* blue-600/10 */
  border-radius: 1rem;
  height: fit-content;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
`;

export const PrivacyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const PrivacyTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
`;

export const PrivacyText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.625;
`;

export const DetailRowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DetailLabel = styled.p`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.05em;
`;

export const DetailValue = styled.p<{ $isTruncated?: boolean }>`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[300]};

  ${({ $isTruncated }) =>
    $isTruncated &&
    css`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

export const LocationInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
