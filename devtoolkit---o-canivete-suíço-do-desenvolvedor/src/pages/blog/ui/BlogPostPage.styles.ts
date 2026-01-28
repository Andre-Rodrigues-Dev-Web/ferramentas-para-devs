import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
`;

export const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
  margin-bottom: 2rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  background: rgba(37, 99, 235, 0.1);
  color: ${({ theme }) => theme.colors.primary[400]};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const Content = styled.div`
  color: ${({ theme }) => theme.colors.slate[300]};
  line-height: 1.8;
  font-size: 1.125rem;
  margin-bottom: 4rem;

  p {
    margin-bottom: 1.5rem;
  }

  h2 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.75rem;
    font-weight: 600;
    margin: 2.5rem 0 1rem;
  }

  h3 {
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.5rem;
    font-weight: 600;
    margin: 2rem 0 1rem;
  }

  ul,
  ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  strong {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 600;
  }
`;

export const ShareSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const ShareTitle = styled.h3`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  font-weight: 500;
`;

export const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[600]};
    transform: translateY(-2px);
  }
`;
