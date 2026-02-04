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
  background-color: rgba(16, 185, 129, 0.1); /* emerald-600/10 */
  color: #10b981;
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

export const CorsBadge = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
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

export const RequestArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 8 / span 8;
  }
`;

export const RequestCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const RequestBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: row;
  }
`;

export const MethodSelect = styled.select`
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #34d399;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;
  text-align: center;
  appearance: none;

  &:focus {
    border-color: #10b981;
  }
`;

export const UrlInputWrapper = styled.div`
  flex: 1;
  position: relative;
`;

export const UrlInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 2px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  transition: all 0.2s;
  outline: none;

  &:focus {
    border-color: #10b981;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

export const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  color: ${({ $active, theme }) =>
    $active ? "#34d399" : theme.colors.slate[500]};

  &:hover {
    color: ${({ $active, theme }) => !$active && theme.colors.slate[300]};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: #10b981;
        border-radius: 9999px;
      }
    `}
`;

export const TabContent = styled.div`
  min-height: 250px;
`;

export const HeadersHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  margin-bottom: 0.75rem;
`;

export const HeadersTitle = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
`;

export const AddHeaderButton = styled.button`
  font-size: 0.625rem;
  font-weight: 700;
  color: #10b981;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: pointer;

  &:hover {
    color: #34d399;
  }
`;

export const HeadersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Checkbox = styled.input`
  width: 1rem;
  height: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.25rem;
  accent-color: #059669;
  cursor: pointer;
`;

export const HeaderInput = styled.input`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[200]};
  outline: none;

  &:focus {
    border-color: rgba(16, 185, 129, 0.5); /* emerald-500/50 */
  }
`;

export const RemoveHeaderButton = styled.button`
  padding: 0.375rem;
  color: ${({ theme }) => theme.colors.slate[600]};
  background: none;
  border: none;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s;

  ${HeaderRow}:hover & {
    opacity: 1;
  }

  &:hover {
    color: #f87171;
  }
`;

export const BodyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  margin-bottom: 0.75rem;
`;

export const ContentTypeLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const ResponseCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 2rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  min-height: 400px;
`;

export const ResponseHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-bottom: 1rem;
`;

export const ResponseTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const ResponseStats = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
  text-transform: uppercase;
`;

export const StatusValue = styled.span<{ $status: number }>`
  font-size: 0.75rem;
  font-weight: 900;
  color: ${({ $status }) =>
    $status >= 200 && $status < 300 ? "#22c55e" : "#ef4444"};
`;

export const TimeValue = styled.span`
  font-size: 0.75rem;
  font-weight: 900;
  color: #34d399;
`;

export const CopyResponseButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const ResponseBody = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  height: 400px;
  overflow: auto;

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

export const LoadingState = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
`;

export const LoadingText = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const CodeBlock = styled.pre<{ $isError?: boolean }>`
  font-size: 0.75rem;
  line-height: 1.625;
  font-family: monospace;
  white-space: pre-wrap;
  color: ${({ $isError }) => ($isError ? "#f87171" : "#60a5fa")};
`;

export const EmptyResponse = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.slate[600]};
    font-style: italic;
  }
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const HistoryCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  height: 100%;
`;

export const HistoryTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const HistoryItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: rgba(16, 185, 129, 0.5); /* emerald-500/50 */
    background-color: ${({ theme }) => theme.colors.slate[900]};
  }
`;

export const HistoryItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const MethodBadge = styled.span<{ $method: string }>`
  font-size: 0.625rem;
  font-weight: 900;
  text-transform: uppercase;

  color: ${({ $method }) => {
    switch ($method) {
      case "GET":
        return "#10b981";
      case "POST":
        return "#3b82f6";
      case "PUT":
        return "#f97316";
      case "DELETE":
        return "#ef4444";
      default:
        return "#a855f7";
    }
  }};
`;

export const HistoryTime = styled.span`
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[600]};
`;

export const HistoryUrl = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[300]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

export const HistoryMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SecurityCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SecurityTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SecurityText = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  line-height: 1.625;

  code {
    color: #34d399;
  }
`;

export const EmptyHistory = styled.div`
  padding: 5rem 0;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;

  p {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.slate[600]};
  }
`;
