import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Code,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { Button } from "../../../shared/ui/Button";
import MarketingLayout from "./MarketingLayout";
import { LaptopMockup } from "./LaptopMockup";

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
  DecorativeBgIcon,
} from "./LandingPage.styles";

const LandingPage: React.FC = () => {
  return (
    <MarketingLayout
      title="Home"
      description="DevToolkit é sua caixa de ferramentas essencial. Conversores, formatadores, e geradores de código para desenvolvedores web."
      keywords="dev tools, json formatter, css generator, react, vite, developer productivity"
    >
      <ContentWrapper>
        <HeroSection>
          <Badge>
            <span className="dot"></span>
            v2.0 Beta • Open Source
          </Badge>

          <Title>
            DevToolkit <br />
            <span className="gradient-text">O Canivete Suíço Digital</span>
          </Title>

          <Subtitle>
            Ferramentas essenciais para desenvolvedores modernos. Design
            premium, privacidade total e código aberto.
          </Subtitle>

          <ButtonGroup>
            <Link to="/dashboard" style={{ zIndex: 10 }}>
              <Button
                size="lg"
                className="h-14 px-8 text-lg hover:shadow-2xl hover:shadow-blue-500/20"
              >
                Começar Agora <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <a
              href="https://github.com/Andre-Rodrigues-Dev-Web/ferramentas-para-devs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-8 text-lg bg-white/5 border-white/10 hover:bg-white/10 backdrop-blur-md"
              >
                <Github size={20} className="mr-2" /> GitHub
              </Button>
            </a>
          </ButtonGroup>

          <LaptopMockup />
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
              <CardTitle>Foco no Desenvolvedor</CardTitle>
              <CardDescription>
                JSON Formatter, Validadores, Conversores e tudo que você precisa
                para um workflow otimizado. Sem distrações.
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
              <CardTitle>Geradores de UI/UX</CardTitle>
              <CardDescription>
                Crie interfaces incríveis com geradores de CSS, Glassmorphism e
                sombras modernas.
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
              <CardTitle>Diagnósticos de Rede</CardTitle>
              <CardDescription>
                Verifique DNS, IPs e headers de requisição com rapidez e
                precisão.
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
              <CardTitle>Alta Performance</CardTitle>
              <CardDescription>
                Tecnologia de ponta com React e Vite. Uma experiência fluída e
                instantânea.
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
