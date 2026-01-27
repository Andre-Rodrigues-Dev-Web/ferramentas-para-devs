import * as React from 'react';
import styled from 'styled-components';
import MarketingLayout from '../../landing/ui/MarketingLayout';
import { Title, ContentWrapper, BentoCard, BentoGrid, CardTitle, CardDescription, SectionTitle } from '../../landing/ui/LandingPage.styles';
import { Sparkles, Code, Globe, Zap, Palette, FileText } from 'lucide-react';

const PageHeader = styled.div`
  padding: 8rem 0 4rem;
  text-align: center;
`;

const IconWrapper = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #60a5fa;
`;

const FeatureGrid = styled(BentoGrid)`
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const AboutPage: React.FC = () => {
  return (
    <MarketingLayout title="Sobre a Ferramenta">
      <ContentWrapper>
        <PageHeader>
          <Title>O Canivete Suíço do <br /> <span className="gradient-text">Desenvolvedor</span></Title>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-4">
            Uma coleção de ferramentas essenciais para simplificar o seu workflow. 
            Sem anúncios, sem rastreadores, 100% focado na produtividade.
          </p>
        </PageHeader>

        <SectionTitle>Categorias Principais</SectionTitle>

        <FeatureGrid>
          <BentoCard>
            <IconWrapper><Palette size={32} /></IconWrapper>
            <CardTitle>CSS Gen</CardTitle>
            <CardDescription>
              Geradores de código CSS para sombras, gradientes, bordas e efeitos modernos como Glassmorphism.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper><Code size={32} /></IconWrapper>
            <CardTitle>Formatters</CardTitle>
            <CardDescription>
              Formate e valide JSON, SQL, e outros formatos de dados instantaneamente.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper><Globe size={32} /></IconWrapper>
            <CardTitle>Network</CardTitle>
            <CardDescription>
              Ferramentas de rede como DNS Checker, IP Lookup e análise de headers.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper><Zap size={32} /></IconWrapper>
            <CardTitle>Encoders</CardTitle>
            <CardDescription>
              Conversores Base64, URL Encoder/Decoder, Hash Generator e muito mais.
            </CardDescription>
          </BentoCard>
          
           <BentoCard>
            <IconWrapper><FileText size={32} /></IconWrapper>
            <CardTitle>Text Tools</CardTitle>
            <CardDescription>
              Lorem Ipsum, contadores de caracteres, manipulação de strings e regex.
            </CardDescription>
          </BentoCard>

           <BentoCard>
            <IconWrapper><Sparkles size={32} /></IconWrapper>
            <CardTitle>Open Source</CardTitle>
            <CardDescription>
              Projeto totalmente aberto. Sinta-se livre para auditar o código ou contribuir.
            </CardDescription>
          </BentoCard>
        </FeatureGrid>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default AboutPage;
