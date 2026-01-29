import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem;
`;

export const Header = styled.div`
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
  background-color: rgba(34, 197, 94, 0.1); /* green-500/10 */
  color: #22c55e;
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
  align-items: center;
  gap: 1rem;
`;

export const UploadArea = styled.div<{ $isDragging: boolean }>`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px dashed
    ${({ theme, $isDragging }) =>
      $isDragging ? "#22c55e" : theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #22c55e;
    background-color: rgba(30, 41, 59, 0.5);
  }
`;

export const UploadContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const UploadIcon = styled.div<{ $isDragging: boolean }>`
  color: ${({ $isDragging, theme }) =>
    $isDragging ? "#22c55e" : theme.colors.slate[600]};
  transition: color 0.2s;

  ${UploadArea}:hover & {
    color: #22c55e;
  }
`;

export const UploadTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`;

export const UploadSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const FilesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: 1fr 300px;
  }
`;

export const StatsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  height: fit-content;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    order: 2;
  }
`;

export const StatsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StatLabel = styled.span`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
`;

export const StatValue = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;

export const StatValueBlue = styled.span`
  color: #3b82f6;
  font-weight: 700;
`;

export const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  margin: 0.5rem 0;
`;

export const SavingBadge = styled.div`
  margin-top: 1.5rem;
  background-color: rgba(34, 197, 94, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SavingLabel = styled.span`
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const SavingPercent = styled.span`
  color: #22c55e;
  font-size: 2rem;
  font-weight: 900;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FileCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FilePreview = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const FileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FileName = styled.h4`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 0.875rem;
`;

export const FileMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const FileSize = styled.span``;

export const CompressedSize = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-weight: 700;
`;

export const DiscountBadge = styled.span`
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-weight: 700;
`;

export const FileActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const StatusText = styled.span``;

export const SuccessBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.slate[400]};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    color: ${({ theme }) => theme.colors.white};
  }

  &.download {
    color: #3b82f6;
    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
    }
  }

  &.delete {
    color: #ef4444;
    &:hover {
      background-color: rgba(239, 68, 68, 0.1);
    }
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const FeatureCardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const FeatureDesc = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  line-height: 1.5;
`;
