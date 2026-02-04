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
  background-color: rgba(79, 70, 229, 0.1);
  color: #818cf8;
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
  align-items: start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const SelectionColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 5 / span 5;
  }
`;

export const SelectionCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchIcon = styled.div<{ $active: boolean }>`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ $active, theme }) =>
    $active ? "#818cf8" : theme.colors.slate[500]};
  transition: color 0.2s;
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 3rem;
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

export const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 50;
  overflow: hidden;
`;

export const DropdownList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  background: transparent;
  border: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(79, 70, 229, 0.2); /* indigo-600/20 */
  }
`;

export const TechInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TechIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};

  ${DropdownItem}:hover & {
    color: #818cf8;
  }
`;

export const TechName = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-align: left;
`;

export const TechCategory = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  text-align: left;
`;

export const AddIcon = styled.div`
  color: ${({ theme }) => theme.colors.slate[600]};

  ${DropdownItem}:hover & {
    color: #818cf8;
  }
`;

export const SelectedSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0.5rem;
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const EmptySelection = styled.div`
  width: 100%;
  padding: 2rem;
  border: 2px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  margin-top: 0.5rem;
`;

export const TechTag = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(79, 70, 229, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #818cf8;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const RemoveTagButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CommonSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const CommonButton = styled.button`
  padding: 0.375rem 0.75rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #818cf8;
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

export const RecommendationCard = styled.div`
  background-color: rgba(37, 99, 235, 0.05); /* blue-600/05 */
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  line-height: 1.625;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

export const InfoIconWrapper = styled.div`
  padding: 0.5rem;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 0.75rem;
  height: fit-content;
  color: #60a5fa;
`;

export const PreviewColumn = styled.div`
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
  height: 650px;
`;

export const PreviewHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

export const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const HeaderIcon = styled.div`
  padding: 0.5rem;
  background-color: rgba(79, 70, 229, 0.1);
  border-radius: 0.75rem;
  color: #818cf8;
`;

export const HeaderTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const CodeContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  overflow-y: auto;
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

export const CodeContent = styled.pre`
  color: #a5b4fc;
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.625;
`;

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  opacity: 0.2;
`;

export const PreviewFooter = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const FooterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const TemplateDots = styled.div`
  display: flex;
  margin-right: -0.5rem;

  div {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.slate[950]};
    margin-right: -0.5rem;
  }
`;

export const FooterText = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
  margin-left: 0.5rem;
`;

export const VersionBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const VersionDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: #6366f1;
`;

export const VersionText = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;
