import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  items-align: center;
  justify-content: center;
  text-align: center;
  padding: 5rem 0;
  gap: 1.5rem;
  max-width: 42rem;
  margin: 0 auto;
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const IconContainer = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[700]};
  margin-bottom: 1rem;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  align-self: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 28rem;
  align-self: center;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.colors.slate[500]};
  line-height: 1.6;
`;

export const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
  text-align: left;
  opacity: 0.4;
  filter: grayscale(100%);
  width: 100%;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PlaceholderCard = styled.div`
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
`;

export const SkeletonTitle = styled.div`
  height: 1rem;
  width: 6rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

export const SkeletonLine = styled.div<{ $width: string }>`
  height: 0.5rem;
  width: ${({ $width }) => $width};
  background-color: ${({ theme }) => theme.colors.slate[800]};
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
`;
