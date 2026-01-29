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
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  padding: 0.75rem;
  background-color: rgba(37, 99, 235, 0.1); /* blue-600/10 */
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

export const InputCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: flex-end;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
`;

export const FlagsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 6rem;
`;

export const Label = styled.label`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const RegexInputContainer = styled.div`
  position: relative;
`;

export const SlashLeft = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.slate[600]};
  font-family: monospace;
`;

export const SlashRight = styled.span`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.slate[600]};
  font-family: monospace;
`;

export const RegexInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 0.5rem 2rem 0.5rem 1.5rem;
  text-align: left;
  color: #60a5fa;
  font-family: monospace;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const FlagsInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border: 2px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 0.5rem 0.75rem;
  color: #a78bfa;
  font-family: monospace;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #3b82f6;
  }
`;

export const HighlightCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

export const HighlightHeader = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
`;

export const HighlightContent = styled.div`
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.625;
  white-space: pre-wrap;
  word-break: break-all;
  min-height: 120px;
  color: ${({ theme }) => theme.colors.slate[300]};
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ef4444;
`;

export const MatchMark = styled.mark`
  background-color: rgba(37, 99, 235, 0.3); /* blue-600/30 */
  color: #bfdbfe;
  border-bottom: 2px solid #3b82f6;
  padding: 0 0.125rem;
  border-radius: 0.125rem;
`;

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-column: span 4 / span 4;
  }
`;

export const ResultsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1.5rem;
`;

export const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const MatchCount = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: #60a5fa;
  background-color: rgba(59, 130, 246, 0.1); /* blue-500/10 */
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
`;

export const MatchList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.slate[800]};
    border-radius: 3px;
  }
`;

export const MatchItem = styled.div`
  padding: 0.75rem;
  background-color: rgba(30, 41, 59, 0.5); /* slate-800/50 */
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &:hover {
    border-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

export const MatchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const MatchText = styled.div`
  color: #60a5fa;
  font-family: monospace;
  font-weight: 500;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const EmptyMatches = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors.slate[600]};
  font-size: 0.75rem;
  font-style: italic;
`;

export const ReferenceCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1rem;
  padding: 1rem;
  font-size: 0.625rem;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

export const ReferenceTitle = styled.h4`
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
`;

export const ReferenceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ReferenceCode = styled.code`
  color: #60a5fa;
  font-family: monospace;
`;
