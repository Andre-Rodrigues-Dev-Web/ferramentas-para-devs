
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS, CATEGORIES } from '../../../entities/tool/model';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.white};
  
  span {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 42rem;
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid ${({ $isActive, theme }) => $isActive ? 'transparent' : theme.colors.slate[800]};

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
        background-color: ${theme.colors.primary[600]};
        color: ${theme.colors.white};
        box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
      `
      : css`
        background-color: ${theme.colors.slate[900]};
        color: ${theme.colors.slate[400]};
        &:hover {
          border-color: ${theme.colors.slate[700]};
        }
      `}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${({ theme }) => theme.screens.xl}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ToolCard = styled(Link)`
  position: relative;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1.5rem;
  transition: all 0.2s;
  display: block;

  &:hover {
    transform: translateY(-0.25rem);
    border-color: rgba(59, 130, 246, 0.5); /* blue-500/50 */
    box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.05); /* blue-500/5 */
  }

  /* Group hover implementation for children */
  &:hover h3 {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
  
  &:hover svg.arrow-icon {
    transform: translateX(0.25rem);
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div<{ $isImplemented: boolean }>`
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: background-color 0.2s;
  
  ${({ $isImplemented, theme }) =>
    $isImplemented
      ? css`
        background-color: rgba(37, 99, 235, 0.1);
        color: ${theme.colors.primary[500]};
      `
      : css`
        background-color: ${theme.colors.slate[800]};
        color: ${theme.colors.slate[600]};
      `}
`;

const Badge = styled.span`
  font-size: 0.625rem;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem;
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[500]};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const ToolTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 0.5rem;
  transition: color 0.2s;
`;

const ToolDescription = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
  line-height: 1.625;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ToolFooter = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CategoryLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

const Dashboard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tudo');

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={24} /> : <Icons.HelpCircle size={24} />;
  };

  const filteredTools = activeCategory === 'Tudo' 
    ? TOOLS 
    : TOOLS.filter(t => t.category === activeCategory);

  return (
    <Container>
      <Header>
        <Title>
          Sua Caixa de Ferramentas <span>Digital</span>
        </Title>
        <Description>
          Tudo o que você precisa para acelerar seu desenvolvimento em um só lugar. Moderno, rápido e 100% gratuito.
        </Description>
      </Header>

      {/* Categories Filter */}
      <CategoryFilter>
        <CategoryButton
          onClick={() => setActiveCategory('Tudo')}
          $isActive={activeCategory === 'Tudo'}
        >
          Tudo
        </CategoryButton>
        {CATEGORIES.map(cat => (
          <CategoryButton
            key={cat}
            onClick={() => setActiveCategory(cat)}
            $isActive={activeCategory === cat}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryFilter>

      {/* Tools Grid */}
      <Grid>
        {filteredTools.map(tool => (
          <ToolCard
            key={tool.id}
            to={`/tool/${tool.slug}`}
          >
            <ToolHeader>
              <IconWrapper $isImplemented={tool.isImplemented}>
                {getIcon(tool.icon)}
              </IconWrapper>
              {!tool.isImplemented && (
                <Badge>
                  Em Breve
                </Badge>
              )}
            </ToolHeader>
            <ToolTitle>
              {tool.title}
            </ToolTitle>
            <ToolDescription>
              {tool.description}
            </ToolDescription>
            <ToolFooter>
               <CategoryLabel>{tool.category}</CategoryLabel>
               <Icons.ArrowRight 
                 size={16} 
                 className="arrow-icon" // Targeted by ToolCard:hover
                 style={{ transition: 'all 0.2s', color: '#475569' }} 
               />
            </ToolFooter>
          </ToolCard>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
