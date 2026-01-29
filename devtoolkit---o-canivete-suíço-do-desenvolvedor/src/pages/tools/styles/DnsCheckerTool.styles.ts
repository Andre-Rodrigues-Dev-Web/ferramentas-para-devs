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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const SearchPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const SearchCard = styled.form`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  position: relative;

  &:focus-within svg {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[100]};
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: color 0.2s;
  pointer-events: none;
`;

export const RecordTypeGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const GroupLabel = styled.label`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0.5rem;
`;

export const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const TypeButton = styled.button<{ $active: boolean }>`
  padding: 0.625rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
  border: 2px solid;
  cursor: pointer;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary
            ? theme.colors.primary[600]
            : "#2563eb"};
          border-color: ${theme.colors.primary
            ? theme.colors.primary[500]
            : "#3b82f6"};
          color: ${theme.colors.white};
          box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.3);
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

export const InfoSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InfoTitle = styled.h4`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  }
`;

export const InfoText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.625;
`;

export const SecurityCard = styled.div`
  background-color: rgba(37, 99, 235, 0.05);
  border: 1px solid rgba(37, 99, 235, 0.1);
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
`;

export const SecurityIconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 1rem;
  height: fit-content;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
`;

export const SecurityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SecurityTitle = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[200]};
`;

export const ResultsPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const ResultsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  min-height: 600px;
`;

export const ResultsHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResultsTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ResultsIcon = styled.div`
  padding: 0.5rem;
  background-color: rgba(37, 99, 235, 0.1);
  border-radius: 0.75rem;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[400] : "#60a5fa"};
`;

export const ResultsTitleText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainResultsTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const SubResultsTitle = styled.p`
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 700;
  text-transform: uppercase;
`;

export const RefreshButton = styled.button`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) =>
      theme.colors.primary ? theme.colors.primary[400] : "#60a5fa"};
  }
`;

export const ResultsList = styled.div`
  flex: 1;
  overflow-y: auto;

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

export const EmptyState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem;
  opacity: 0.3;
  transition: all 0.2s;
  cursor: default;

  &:hover {
    opacity: 0.5;
  }
`;

export const EmptyIconBg = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 50%;
  margin-bottom: 1.5rem;
`;

export const EmptyTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: rgba(2, 6, 23, 0.5); /* slate-950/50 */
`;

export const TableHeaderCell = styled.th`
  padding: 1rem 1.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: 0.1em;

  &:last-child {
    text-align: right;
  }
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(30, 41, 59, 0.5); /* slate-800/50 */
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(30, 41, 59, 0.3);
  }
`;

export const TableCell = styled.td`
  padding: 1rem 1.5rem;

  &:last-child {
    text-align: right;
  }
`;

export const LocationInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const CountryFlag = styled.span`
  font-size: 1.125rem;
`;

export const NamesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CityName = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const RegionName = styled.span`
  font-size: 0.5625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 700;
  text-transform: uppercase;
`;

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;
`;

export const LoadingStatus = styled(StatusBadge)`
  color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
`;

export const SuccessStatus = styled(StatusBadge)`
  color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  width: fit-content;
`;

export const ValueCode = styled.code<{ $success?: boolean }>`
  font-size: 0.75rem;
  font-family: monospace;
  word-break: break-all;
  color: ${({ $success, theme }) =>
    $success
      ? theme.colors.primary
        ? theme.colors.primary[400]
        : "#60a5fa"
      : theme.colors.slate[700]};
`;

export const TtlValue = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const ResultsFooter = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  items-center: center;
  justify-content: space-between;
`;

export const ServersInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ServerDots = styled.div`
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

export const ServerText = styled.span`
  font-size: 0.5625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
  letter-spacing: -0.025em;
  margin-left: 0.5rem;
`;

export const LiveIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PulseDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.colors.primary ? theme.colors.primary[500] : "#3b82f6"};
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
`;

export const LiveText = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
`;
