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

export const FilterBar = styled.div`
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
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

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.slate[500]};
    transition: color 0.2s;
  }

  color: #f97316;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 0.75rem 1rem 0.75rem 3rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  outline: none;
  transition: all 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[700]};
  }

  &:focus {
    border-color: rgba(249, 115, 22, 0.5); /* orange-500/50 */
  }
`;

export const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  padding: 0.25rem;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const CategoryButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: #ea580c;
          color: white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        `
      : css`
          background-color: transparent;
          color: ${theme.colors.slate[500]};

          &:hover {
            color: ${theme.colors.slate[300]};
          }
        `}
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  animation: ${slideIn} 0.5s ease-out;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(249, 115, 22, 0.3); /* orange-500/30 */
    box-shadow: 0 25px 50px -12px rgba(249, 115, 22, 0.05);
  }
`;

export const PopularBadge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 1rem;
`;

export const PopularContent = styled.div`
  background-color: rgba(234, 88, 12, 0.2);
  color: #f97316;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
  border: 1px solid rgba(249, 115, 22, 0.3);
  display: flex;
  align-items: center;
  gap: 0.375rem;
  animation: ${pulse} 2s infinite;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const IconContainer = styled.div`
  padding: 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  transition: transform 0.2s;

  ${Card}:hover & {
    transform: scale(1.1);
  }

  svg {
    &.web {
      color: #60a5fa;
    }
    &.mobile {
      color: #34d399;
    }
    &.desktop {
      color: #a78bfa;
    }
    &.backend {
      color: #fb923c;
    }
    &.fullstack {
      color: #f472b6;
    }
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1.25;
`;

export const CardCategory = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  line-height: 1.625;
  margin-bottom: 1.5rem;
  flex: 1;
`;

export const StackWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const StackTag = styled.span`
  padding: 0.125rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const CommandBox = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
  transition: border-color 0.2s;
  margin-bottom: 1rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const CommandHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding: 0 0.25rem;
`;

export const CommandLabel = styled.span`
  font-size: 0.5625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const CopyButton = styled.button<{ $copied: boolean }>`
  font-size: 0.625rem;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;

  ${({ $copied, theme }) =>
    $copied
      ? css`
          color: #22c55e;
        `
      : css`
          color: #f97316;

          &:hover {
            color: #fb923c;
          }
        `}
`;

export const CommandCode = styled.code`
  font-size: 0.75rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.slate[300]};
  word-break: break-all;
  background-color: rgba(15, 23, 42, 0.5);
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: block;
`;

export const EmptyState = styled.div`
  padding: 6rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const EmptyIcon = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 3rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[800]};
`;

export const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.white};
  }

  p {
    color: ${({ theme }) => theme.colors.slate[500]};
  }
`;

export const FooterTip = styled.div`
  padding: 1.5rem;
  background-color: rgba(234, 88, 12, 0.05); /* orange-600/05 */
  border: 1px solid rgba(249, 115, 22, 0.1);
  border-radius: 2rem;
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const TipIcon = styled.div`
  padding: 0.5rem;
  background-color: rgba(249, 115, 22, 0.1);
  border-radius: 0.75rem;
  height: fit-content;
  color: #f97316;
`;
