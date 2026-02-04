import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 56rem; /* max-w-4xl */
  margin: 0 auto;
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
  background-color: rgba(37, 99, 235, 0.1);
  color: ${({ theme }) => theme.colors.primary[500]};
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

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PermissionsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const RoleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RoleTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const CheckboxGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const PermissionButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;

  ${({ $active, theme }) =>
    $active
      ? css`
          background-color: ${theme.colors.primary[600]};
          border-color: ${theme.colors.primary[500]};
          color: ${theme.colors.white};
          box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2);
        `
      : css`
          background-color: ${theme.colors.slate[800]};
          border-color: ${theme.colors.slate[700]};
          color: ${theme.colors.slate[500]};

          &:hover {
            color: ${theme.colors.slate[300]};
          }
        `}
`;

export const ResultsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const NumericDisplay = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const NumericValue = styled.span`
  font-size: 4.5rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.white};
  line-height: 1;
`;

export const NumericLabel = styled.span`
  color: ${({ theme }) => theme.colors.primary[100]};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.875rem;
  margin-top: 1rem;
  opacity: 0.8;
`;

export const SymbolicDisplay = styled.div`
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
`;

export const SymbolicValue = styled.code`
  font-size: 1.5rem;
  font-family: monospace;
  color: ${({ theme }) => theme.colors.primary[400]};
  font-weight: 700;
`;

export const SymbolicLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.slate[500]};
  margin-top: 0.5rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

export const InfoCard = styled.div`
  background-color: rgba(15, 23, 42, 0.5);
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.slate[500]};

  code {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const InfoIcon = styled.div`
  color: ${({ theme }) => theme.colors.primary[500]};
  flex-shrink: 0;
`;
