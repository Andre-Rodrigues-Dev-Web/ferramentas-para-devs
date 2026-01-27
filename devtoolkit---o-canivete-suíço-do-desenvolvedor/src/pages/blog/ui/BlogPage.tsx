import * as React from 'react';
import styled from 'styled-components';
import MarketingLayout from '../../landing/ui/MarketingLayout';
import { Title, ContentWrapper } from '../../landing/ui/LandingPage.styles';

const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto 6rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BlogPost = styled.article`
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

const PostDate = styled.div`
  font-size: 0.875rem;
  color: #60a5fa;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const PostTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
`;

const PostExcerpt = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #fff;
  margin-right: 0.5rem;
`;

const BlogPage: React.FC = () => {
  return (
    <MarketingLayout title="Blog & Novidades">
      <ContentWrapper>
        <PageHeader>
          <Title>Novidades do <span className="gradient-text">Toolkit</span></Title>
        </PageHeader>

        <BlogGrid>
          <BlogPost>
            <PostDate>27 de Janeiro, 2026</PostDate>
            <PostTitle>Lançamento do DevToolkit 2.0 Beta</PostTitle>
            <PostExcerpt>
              Estamos felizes em anunciar a versão 2.0 do DevToolkit. 
              Com um design totalmente renovado, novas ferramentas de CSS e performance otimizada.
              Agora open source para todos.
            </PostExcerpt>
            <div className="flex gap-2">
              <Tag>Release</Tag>
              <Tag>v2.0</Tag>
            </div>
          </BlogPost>

          <BlogPost>
            <PostDate>15 de Janeiro, 2026</PostDate>
            <PostTitle>Novas Ferramentas de Glassmorphism</PostTitle>
            <PostExcerpt>
              Adicionamos um gerador completo de Glassmorphism. 
              Crie efeitos de vidro fosco com controle total sobre desfoque, transparência e cor.
            </PostExcerpt>
             <div className="flex gap-2">
              <Tag>CSS</Tag>
              <Tag>Tool</Tag>
            </div>
          </BlogPost>

          <BlogPost>
            <PostDate>10 de Dezembro, 2025</PostDate>
            <PostTitle>Melhorias de Performance</PostTitle>
            <PostExcerpt>
              Otimizamos o carregamento inicial da aplicação em 40% usando code splitting e lazy loading.
            </PostExcerpt>
             <div className="flex gap-2">
              <Tag>Performance</Tag>
              <Tag>Engineering</Tag>
            </div>
          </BlogPost>
        </BlogGrid>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default BlogPage;
