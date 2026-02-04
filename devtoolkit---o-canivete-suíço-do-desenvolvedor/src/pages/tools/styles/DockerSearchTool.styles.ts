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
  background-color: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
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

export const ExternalLinkButton = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: #60a5fa;
  }
`;

export const ContentWrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    flex-direction: row;
  }
`;

export const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const SearchIcon = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $active, theme }) =>
    $active ? "#3b82f6" : theme.colors.slate[500]};
  transition: color 0.2s;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: #3b82f6;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 2px solid;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: rgba(37, 99, 235, 0.1);
          border-color: #3b82f6;
          color: #60a5fa;
        `
      : css`
          background-color: ${theme.colors.slate[950]};
          border-color: ${theme.colors.slate[800]};
          color: ${theme.colors.slate[500]};

          &:hover {
            border-color: ${theme.colors.slate[700]};
          }
        `}
`;

export const Suggestions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const SuggestionLabel = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const SuggestionList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const SuggestionButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.375rem;
  color: inherit;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[700]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const LoadingState = styled.div`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const LoadingIconWrapper = styled.div`
  position: relative;
  color: rgba(59, 130, 246, 0.2);
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #3b82f6;
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 500;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const ImageCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    border-color: rgba(59, 130, 246, 0.3);
    transform: translateY(-0.25rem);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const CardIcon = styled.div`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  color: #60a5fa;
  transition: transform 0.2s;

  ${ImageCard}:hover & {
    transform: scale(1.1);
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
`;

export const Badge = styled.span<{ $type: "official" | "verified" }>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.5625rem;
  font-weight: 900;
  text-transform: uppercase;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid;

  ${({ $type }) =>
    $type === "official"
      ? css`
          background-color: rgba(37, 99, 235, 0.1);
          color: #60a5fa;
          border-color: rgba(59, 130, 246, 0.2);
        `
      : css`
          background-color: rgba(22, 163, 74, 0.1);
          color: #4ade80;
          border-color: rgba(74, 222, 128, 0.2);
        `}
`;

export const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ImageName = styled.h3`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  transition: color 0.2s;

  ${ImageCard}:hover & {
    color: #60a5fa;
  }
`;

export const ImageDesc = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.625;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StatsGrid = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.slate[300]};
  }
`;

export const CopyCommandButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(59, 130, 246, 0.5);
  }
`;

export const CommandCode = styled.code`
  font-size: 0.625rem;
  font-family: monospace;
  color: #60a5fa;
`;

export const CopyIconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.slate[600]};

  ${CopyCommandButton}:hover & {
    color: #60a5fa;
  }
`;

export const CardFooter = styled.div`
  margin-top: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const DetailsLink = styled.span`
  display: flex;
  align-items: center;
  transition: color 0.2s;
  cursor: pointer;

  ${ImageCard}:hover & {
    color: #3b82f6;
  }
`;

export const EmptyState = styled.div`
  padding: 5rem 0;
  text-align: center;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  items-center: center;
  gap: 1.5rem;
`;

export const InfoCard = styled.div`
  padding: 1.5rem;
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

export const InfoIconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  color: #3b82f6;
  border-radius: 0.75rem;
  flex-shrink: 0;
`;

export const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const InfoText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.625;

  strong {
    color: ${({ theme }) => theme.colors.slate[300]};
    font-weight: 700;
  }
`;
