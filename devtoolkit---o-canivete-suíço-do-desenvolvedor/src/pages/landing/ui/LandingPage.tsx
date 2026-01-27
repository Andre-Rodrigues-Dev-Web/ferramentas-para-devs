import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Code, Globe, Layers, Sparkles } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import MarketingLayout from './MarketingLayout';

import {
  ContentWrapper,
  HeroSection,
  Badge,
  Title,
  Subtitle,
  ButtonGroup,
  SectionTitle,
  BentoGrid,
  BentoCard,
  CardIcon,
  CardTitle,
  CardDescription,
  DecorativeBgIcon
} from './LandingPage.styles';

const LandingPage: React.FC = () => {
  return (
    <MarketingLayout title="Home">
      <ContentWrapper>
        <HeroSection>
          <Badge>
            <span className="dot"></span>
            v2.0 Beta • Open Source
          </Badge>
          
          <Title>
            DevToolkit <br />
            <span className="gradient-text">Beyond Logic</span>
          </Title>
          
          <Subtitle>
            Uma suíte de ferramentas desenvolvida para a era da web moderna. 
            Design fluído, performance instantânea e código aberto.
          </Subtitle>
          
          <ButtonGroup>
            <Link to="/dashboard" style={{ zIndex: 10 }}>
              <Button size="lg" className="h-14 px-8 text-lg hover:shadow-2xl hover:shadow-blue-500/20">
                Explorar Ferramentas <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <a href="https://github.com/Andre-Rodrigues-Dev-Web/ferramentas-para-devs" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="h-14 px-8 text-lg bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-md">
                <Github size={20} className="mr-2" /> GitHub
              </Button>
            </a>
          </ButtonGroup>
        </HeroSection>

        <SectionTitle>
          O que tem na <span>Caixa?</span>
        </SectionTitle>

        <BentoGrid>
          {/* Main Feature - Large Card */}
          <BentoCard $span={2}>
            <div className="relative z-10">
              <CardIcon>
                <Code size={32} />
              </CardIcon>
              <CardTitle>Developer First</CardTitle>
              <CardDescription>
                JSON Formatter, Validadores, Conversores e tudo que você precisa no dia a dia. 
                Construído por devs, para devs, com foco total na usabilidade e sem distrações.
              </CardDescription>
            </div>
            <DecorativeBgIcon className="icon-bg">
              <Code />
            </DecorativeBgIcon>
          </BentoCard>

          {/* Secondary Feature */}
          <BentoCard>
            <div className="relative z-10">
              <CardIcon>
                <Sparkles size={32} />
              </CardIcon>
              <CardTitle>UI Generators</CardTitle>
              <CardDescription>
                Crie Glassmorphism, Neumorphism e animações CSS complexas com cliques. Copie e cole.
              </CardDescription>
            </div>
            <DecorativeBgIcon className="icon-bg">
              <Sparkles />
            </DecorativeBgIcon>
          </BentoCard>

          {/* Third Feature */}
          <BentoCard>
            <div className="relative z-10">
              <CardIcon>
                <Globe size={32} />
              </CardIcon>
              <CardTitle>Network Tools</CardTitle>
              <CardDescription>
                Analise DNS, verifique IPs e headers de requisição instantaneamente.
              </CardDescription>
            </div>
            <DecorativeBgIcon className="icon-bg">
              <Globe />
            </DecorativeBgIcon>
          </BentoCard>

          {/* Fourth Feature - Wide */}
          <BentoCard $span={2}>
             <div className="relative z-10">
              <CardIcon>
                <Layers size={32} />
              </CardIcon>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Totalmente construído com React, TypeScript e Vite. Arquitetura limpa e escalável.
                Sinta a velocidade de uma Single Page Application otimizada.
              </CardDescription>
            </div>
            <DecorativeBgIcon className="icon-bg">
              <Layers />
            </DecorativeBgIcon>
          </BentoCard>
        </BentoGrid>

      </ContentWrapper>
    </MarketingLayout>
  );
};

export default LandingPage;
