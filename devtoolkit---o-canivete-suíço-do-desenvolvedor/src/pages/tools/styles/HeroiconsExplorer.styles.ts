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
  background-color: rgba(79, 70, 229, 0.1);
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
    color: #818cf8;
  }
`;

export const ExplorerCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
`;

export const BlurBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24rem;
  height: 24rem;
  background-color: rgba(79, 70, 229, 0.05); /* indigo-600/05 */
  filter: blur(120px);
  z-index: 0;
  border-radius: 50%;
  pointer-events: none;
`;

export const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 10;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.slate[600]};
  transition: color 0.2s;

  ${SearchWrapper}:focus-within & {
    color: #6366f1;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem 3rem;
  color: ${({ theme }) => theme.colors.slate[200]};
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: #6366f1;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.25rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: rgba(2, 6, 23, 0.5); /* slate-950/50 */
  padding: 0.5rem;
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};

  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: row;
  }
`;

export const FilterLabel = styled.div`
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const FilterText = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StyleButtons = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const StyleButton = styled.button<{ $active: boolean }>`
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: #4f46e5;
          color: ${theme.colors.white};
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.slate[500]};

          &:hover {
            color: ${theme.colors.slate[300]};
            background-color: ${theme.colors.slate[800]};
          }
        `}
`;

export const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  z-index: 10;
`;

export const ResultCount = styled.p`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ResultHint = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const HintItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  z-index: 10;

  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    grid-template-columns: repeat(9, 1fr);
  }
`;

export const IconCard = styled.button<{ $active: boolean }>`
  aspect-ratio: 1;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  border: 2px solid;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: #4f46e5;
          border-color: #818cf8;
          color: ${theme.colors.white};
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        `
      : css`
          background-color: ${theme.colors.slate[950]};
          border-color: ${theme.colors.slate[800]};
          color: ${theme.colors.slate[400]};

          &:hover {
            border-color: rgba(99, 102, 241, 0.5); /* indigo-500/50 */
            background-color: ${theme.colors.slate[900]};
          }
        `}
`;

export const IconPreview = styled.div`
  transition: transform 0.2s;

  ${IconCard}:hover & {
    transform: scale(1.1);
  }
`;

export const IconName = styled.span<{ $active: boolean }>`
  font-size: 0.5625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 0 0.5rem;
  text-align: center;

  color: ${({ $active, theme }) =>
    $active ? theme.colors.white : theme.colors.slate[600]};

  ${IconCard}:hover & {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.white : theme.colors.slate[400]};
  }
`;

export const EmptyState = styled.div`
  padding: 6rem 0;
  text-align: center;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 3rem;
  background-color: rgba(2, 6, 23, 0.2); /* slate-950/20 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const EmptyIconBg = styled.div`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.slate[700]};
`;

export const EmptyTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  max-width: 20rem;
  margin: 0 auto;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(2, 6, 23, 0.9);
  backdrop-filter: blur(8px);
  z-index: 50;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    align-items: center;
  }
`;

export const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 36rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: zoom-in 0.3s ease-out;

  @keyframes zoom-in {
    from {
      opacity: 0;
      transform: scale(0.95) translateY(10%);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }
`;

export const ModalHeader = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  background-color: rgba(15, 23, 42, 0.5);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const LargeIconPreview = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: #4f46e5;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);

  div {
    transform: scale(1.8);
  }
`;

export const IconDetailName = styled.h3`
  font-size: 1.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
`;

export const TagList = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const StyleTag = styled.span`
  padding: 0.125rem 0.5rem;
  background-color: rgba(99, 102, 241, 0.1); /* indigo-500/10 */
  color: #818cf8;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

export const Tag = styled.span`
  padding: 0.125rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[500]};
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
`;

export const CloseModalButton = styled.button`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.slate[400]};
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[700]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: rgba(15, 23, 42, 0.8);
`;

export const CopyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const CopyAction = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    border-color: #6366f1;
  }
`;

export const CopyIcon = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 1rem;
  color: #6366f1;
  transition: transform 0.2s;

  ${CopyAction}:hover & {
    transform: scale(1.1);
  }
`;

export const CopyLabel = styled.div`
  text-center: center;
`;

export const CopyTitle = styled.span`
  display: block;
  font-size: 0.75rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CopyDesc = styled.span`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-weight: 700;
`;

export const CopiedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(22, 163, 74, 0.1); /* green-600/10 */
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 0.2s ease-out;
  color: #22c55e;
`;

export const InstallInfo = styled.div`
  padding: 1.25rem;
  background-color: rgba(79, 70, 229, 0.05); /* indigo-600/05 */
  border: 2px solid rgba(99, 102, 241, 0.1);
  border-radius: 2rem;
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.slate[400]};
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
`;

export const InstallIcon = styled.div`
  padding: 0.5rem;
  background-color: rgba(99, 102, 241, 0.1);
  border-radius: 0.75rem;
  height: fit-content;
  color: #818cf8;
`;

export const InstallTitle = styled.p`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
`;

export const InstallText = styled.p`
  code {
    color: #818cf8;
    font-weight: 700;
  }
`;

export const SearchTips = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(30, 41, 59, 0.5); /* slate-800/50 */
  opacity: 0.4;
  filter: grayscale(100%);
  transition: all 0.2s;

  &:hover {
    filter: grayscale(0%);
    opacity: 1;
  }
`;

export const TipItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const TipCode = styled.code`
  background-color: ${({ theme }) => theme.colors.slate[800]};
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: #818cf8;
`;
