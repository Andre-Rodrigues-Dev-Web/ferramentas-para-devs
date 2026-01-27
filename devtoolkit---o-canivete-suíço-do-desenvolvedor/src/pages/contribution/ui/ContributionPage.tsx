import * as React from 'react';
import styled from 'styled-components';
import MarketingLayout from '../../landing/ui/MarketingLayout';
import { Title, ContentWrapper, SectionTitle } from '../../landing/ui/LandingPage.styles';
import { Button } from '../../../shared/ui/Button';
import { Github, GitPullRequest, MessagesSquare, Bug } from 'lucide-react';

const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

const ContributionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 6rem;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  padding: 3rem;
`;

const StepList = styled.ol`
  list-style: none;
  counter-reset: steps;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const StepItem = styled.li`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
  
  &::before {
    counter-increment: steps;
    content: counter(steps);
    width: 2rem;
    height: 2rem;
    background: #3b82f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
`;

const ContributionPage: React.FC = () => {
  return (
    <MarketingLayout title="Contribua">
      <ContentWrapper>
        <PageHeader>
          <Title>Faça Parte do <span className="gradient-text">Projeto</span></Title>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-4">
            DevToolkit é construído pela comunidade, para a comunidade. 
            Sua contribuição é bem-vinda, seja código, design ou ideias.
          </p>
        </PageHeader>

        <ContributionContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
             <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800">
               <GitPullRequest size={24} className="text-green-400" />
               <span className="font-bold">Pull Requests</span>
               <span className="text-xs text-slate-400 font-normal">Envie suas correções</span>
             </Button>
             
             <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800">
               <Bug size={24} className="text-red-400" />
               <span className="font-bold">Reportar Bug</span>
               <span className="text-xs text-slate-400 font-normal">Encontrou um erro?</span>
             </Button>
             
             <Button variant="outline" className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800">
               <MessagesSquare size={24} className="text-blue-400" />
               <span className="font-bold">Discutir</span>
               <span className="text-xs text-slate-400 font-normal">Ideias e Sugestões</span>
             </Button>
          </div>

          <SectionTitle>Como Começar</SectionTitle>
          
          <StepList>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Fork o Repositório</h3>
                <p className="text-slate-400">Crie uma cópia do projeto na sua conta GitHub para começar a trabalhar.</p>
              </div>
            </StepItem>
             <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Instale as Dependências</h3>
                <p className="text-slate-400">Use <code>npm install</code> para baixar tudo que o projeto precisa para rodar.</p>
              </div>
            </StepItem>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Crie sua Feature</h3>
                <p className="text-slate-400">Desenvolva sua melhoria ou correção em uma nova branch.</p>
              </div>
            </StepItem>
             <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">Abra um Pull Request</h3>
                <p className="text-slate-400">Envie suas alterações para revisão. Nós ficaremos felizes em fazer o merge!</p>
              </div>
            </StepItem>
          </StepList>

          <div className="mt-10 text-center">
            <a href="https://github.com/Andre-Rodrigues-Dev-Web/ferramentas-para-devs" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="px-8">
                Ir para o GitHub <Github className="ml-2" size={20} />
              </Button>
            </a>
          </div>

        </ContributionContainer>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default ContributionPage;
