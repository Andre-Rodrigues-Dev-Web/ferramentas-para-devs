import styled from "styled-components";

export const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

export const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto 6rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BlogPost = styled.article`
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

export const PostDate = styled.div`
  font-size: 0.875rem;
  color: #60a5fa;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const PostTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
`;

export const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const Tag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #fff;
  margin-right: 0.5rem;
`;
