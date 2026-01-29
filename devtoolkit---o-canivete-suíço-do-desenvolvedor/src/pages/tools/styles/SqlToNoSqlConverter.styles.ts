import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: calc(100vh - 100px);
  padding-bottom: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 600px;
`;

export const ConverterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 60px 1fr;
  gap: 1.5rem;
  flex: 1;
  min-height: 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
  }
`;

export const EditorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
  height: 100%;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.slate[200]};
`;

export const TextArea = styled.textarea`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  resize: none;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const ActionsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 1024px) {
    flex-direction: row;
  }
`;

export const ConvertButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: white;
  border: none;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary[600]};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ClearButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.slate[400]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #f87171;
    border-color: #f87171;
    background-color: rgba(248, 113, 113, 0.1);
  }
`;

export const CopyButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[200]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[700]};
    border-color: ${({ theme }) => theme.colors.slate[600]};
  }
`;

export const OutputDisplay = styled.pre`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.5rem;
  padding: 1rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: #4ade80;
  overflow: auto;
  width: 100%;
  height: 100%;
`;
