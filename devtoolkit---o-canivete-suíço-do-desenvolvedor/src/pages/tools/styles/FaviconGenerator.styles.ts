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

export const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DropZone = styled.div<{ $isDragging: boolean }>`
  aspect-ratio: 21/9;
  border: 2px dashed
    ${({ $isDragging, theme }) =>
      $isDragging ? "#6366f1" : theme.colors.slate[800]};
  background-color: ${
    ({ $isDragging }) =>
      $isDragging ? "rgba(79, 70, 229, 0.05)" : "rgba(15, 23, 42, 0.5)" // slate-900/50
  };
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  transform: ${({ $isDragging }) => ($isDragging ? "scale(0.99)" : "scale(1)")};

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[900]};
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const HiddenInput = styled.input`
  display: none;
`;

export const UploadIconWrapper = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.slate[600]};
  margin-bottom: 1rem;
  transition: all 0.2s;

  ${DropZone}:hover & {
    color: #818cf8;
    transform: scale(1.1);
  }
`;

export const DropTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const DropText = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  margin-top: 0.5rem;
  max-width: 24rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const PreviewCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #6366f1;
`;

export const PreviewTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const BrowserMockup = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 0.25rem;
  display: flex;
  align-items: center;
`;

export const TabMockup = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  max-width: 240px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

export const FaviconImage = styled.img`
  width: 1rem;
  height: 1rem;
  border-radius: 0.125rem;
  object-fit: contain;
`;

export const TabText = styled.span`
  font-size: 0.6875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[300]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TabControls = styled.div`
  margin-left: auto;
  display: flex;
  gap: 0.25rem;

  div {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const NewTabButton = styled.div`
  margin-left: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
`;

export const HomeScreenMockup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
`;

export const AppIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const IosIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 22%;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(30, 41, 59, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AndroidIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: white;
  border-radius: 50%;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(30, 41, 59, 0.2);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const IconLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;

export const SidebarColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const SizesCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const SizesTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

export const SizesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SizeItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.75rem;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3); /* indigo-500/30 */
  }
`;

export const SizeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const SizeIconPreview = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }
`;

export const SizeText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SizeLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SizeDimensions = styled.p`
  font-size: 0.5625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-family: monospace;
`;

export const CheckWrapper = styled.div`
  color: rgba(34, 197, 94, 0.4);
  transition: color 0.2s;

  ${SizeItemContainer}:hover & {
    color: #22c55e;
  }
`;

export const RecommendationCard = styled.div`
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  border: 1px solid rgba(59, 130, 246, 0.2); /* blue-500/20 */
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.6875rem;
  line-height: 1.625;
`;

export const ChromeIconWrapper = styled.div`
  color: #3b82f6;
  flex-shrink: 0;
`;

export const RecommendationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const RecTitle = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
`;

export const RecText = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};

  code {
    color: #60a5fa;
  }
`;
