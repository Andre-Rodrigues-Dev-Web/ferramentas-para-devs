import * as React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Code,
  Globe,
  Layers,
  Sparkles,
  ChevronDown,
  Quote,
  Zap,
  Users,
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
  SectionSubtitle,
  BentoGrid,
  BentoCard,
  CardIcon,
  CardTitle,
  CardDescription,
  DecorativeBgIcon,
  StatsSection,
  StatItem,
  GridSection,
  TestimonialsGrid,
  TestimonialCard,
  FAQContainer,
  FAQItem,
  CTASection,
} from "./LandingPage.styles";

const LandingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "O DevToolkit é gratuito?",
      answer:
        "Sim! A versão atual é totalmente gratuita e open source. Nossa missão é fornecer as melhores ferramentas para desenvolvedores sem custos ocultos.",
    },
    {
      question: "Meus dados são salvos?",
      answer:
        "A privacidade é nossa prioridade. Todos os processamentos (como formatação de JSON ou conversão de imagens) são feitos localmente no seu navegador. Nenhum dado é enviado para nossos servidores.",
    },
    {
      question: "Posso contribuir com o projeto?",
      answer:
        "Com certeza! O projeto é open source e adoramos receber contribuições da comunidade. Confira nosso repositório no GitHub para começar.",
    },
    {
      question: "Funciona offline?",
      answer:
        "Sim, o DevToolkit é um PWA (Progressive Web App). Uma vez carregado, você pode usá-lo mesmo sem conexão com a internet.",
    },
  ];

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

        <StatsSection>
          <StatItem>
            <h4>15+</h4>
            <p>Ferramentas</p>
          </StatItem>
          <StatItem>
            <h4>100%</h4>
            <p>Privacidade</p>
          </StatItem>
          <StatItem>
            <h4>Local</h4>
            <p>Processamento</p>
          </StatItem>
          <StatItem>
            <h4>Open</h4>
            <p>Source</p>
          </StatItem>
        </StatsSection>

        <GridSection>
          <SectionTitle>
            O que tem na <span>Caixa?</span>
          </SectionTitle>
          <SectionSubtitle>
            Uma coleção curada das ferramentas que você usa todos os dias,
            refinadas para máxima produtividade.
          </SectionSubtitle>

          <BentoGrid>
            {/* Main Feature - Large Card */}
            <BentoCard $span={2}>
              <div className="relative z-10">
                <CardIcon>
                  <Code size={32} />
                </CardIcon>
                <CardTitle>Foco no Desenvolvedor</CardTitle>
                <CardDescription>
                  JSON Formatter, Validadores, Conversores e tudo que você
                  precisa para um workflow otimizado. Sem distrações.
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
                  Crie interfaces incríveis com geradores de CSS, Glassmorphism
                  e sombras modernas.
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
        </GridSection>

        <GridSection>
          <SectionTitle>
            Amado por <span>Devs</span>
          </SectionTitle>
          <TestimonialsGrid>
            <TestimonialCard>
              <Quote className="quote-icon" size={32} />
              <p>
                "Finalmente um conjunto de ferramentas que não parece um site
                dos anos 90. O design é incrível e as ferramentas funcionam
                perfeitamente."
              </p>
              <div className="author">
                <img src="https://i.pravatar.cc/100?img=11" alt="User" />
                <div>
                  <h5>Carlos Silva</h5>
                  <span>Frontend Developer</span>
                </div>
              </div>
            </TestimonialCard>
            <TestimonialCard>
              <Quote className="quote-icon" size={32} />
              <p>
                "O gerador de CSS Glassmorphism me economiza horas de ajuste
                fino. Essencial para meus projetos React."
              </p>
              <div className="author">
                <img src="https://i.pravatar.cc/100?img=32" alt="User" />
                <div>
                  <h5>Ana Martins</h5>
                  <span>UI Designer</span>
                </div>
              </div>
            </TestimonialCard>
            <TestimonialCard>
              <Quote className="quote-icon" size={32} />
              <p>
                "A privacidade de dados é o diferencial. Poder formatar JSONs
                sensíveis sem enviar para um servidor é fundamental."
              </p>
              <div className="author">
                <img src="https://i.pravatar.cc/100?img=59" alt="User" />
                <div>
                  <h5>Pedro Costa</h5>
                  <span>Tech Lead</span>
                </div>
              </div>
            </TestimonialCard>
          </TestimonialsGrid>
        </GridSection>

        <SectionTitle>
          Perguntas <span>Frequentes</span>
        </SectionTitle>
        <FAQContainer>
          {faqs.map((faq, index) => (
            <FAQItem key={index} $isOpen={openFaqIndex === index}>
              <button onClick={() => toggleFaq(index)}>
                {faq.question}
                <ChevronDown size={20} />
              </button>
              <div className="content">
                <p>{faq.answer}</p>
              </div>
            </FAQItem>
          ))}
        </FAQContainer>

        <CTASection>
          <h2>Pronto para Acelerar seu Workflow?</h2>
          <p>
            Junte-se a milhares de desenvolvedores que usam o DevToolkit
            diariamente.
          </p>
          <div className="cta-buttons">
            <Link to="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg">
                <Zap className="mr-2" size={20} /> Acessar Ferramentas
              </Button>
            </Link>
          </div>
        </CTASection>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default LandingPage;
