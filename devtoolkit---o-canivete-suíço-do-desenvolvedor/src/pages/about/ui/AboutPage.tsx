import * as React from "react";

import MarketingLayout from "../../landing/ui/MarketingLayout";
import {
  Title,
  ContentWrapper,
  BentoCard,
  CardTitle,
  CardDescription,
  SectionTitle,
} from "../../landing/ui/LandingPage.styles";
import { Sparkles, Code, Globe, Zap, Palette, FileText } from "lucide-react";

import { PageHeader, IconWrapper, FeatureGrid } from "./AboutPage.styles";

const AboutPage: React.FC = () => {
  return (
    <MarketingLayout
      title="Sobre a Ferramenta"
      description="Saiba mais sobre o DevToolkit, um projeto open source focado em privacidade e produtividade para desenvolvedores."
    >
      <ContentWrapper>
        <PageHeader>
          <Title>
            O Canivete Suíço do <br />{" "}
            <span className="gradient-text">Desenvolvedor</span>
          </Title>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-4">
            Uma coleção completa de utilitários para simplificar seu dia a dia.
            Privacidade em primeiro lugar: sem rastreadores, sem anúncios, 100%
            Open Source.
          </p>
        </PageHeader>

        <SectionTitle>Categorias Principais</SectionTitle>

        <FeatureGrid>
          <BentoCard>
            <IconWrapper>
              <Palette size={32} />
            </IconWrapper>
            <CardTitle>CSS Gen</CardTitle>
            <CardDescription>
              Geradores de código CSS para sombras, gradientes, bordas e efeitos
              modernos como Glassmorphism.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper>
              <Code size={32} />
            </IconWrapper>
            <CardTitle>Formatters</CardTitle>
            <CardDescription>
              Formate e valide JSON, SQL, e outros formatos de dados
              instantaneamente.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper>
              <Globe size={32} />
            </IconWrapper>
            <CardTitle>Network</CardTitle>
            <CardDescription>
              Ferramentas de rede como DNS Checker, IP Lookup e análise de
              headers.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper>
              <Zap size={32} />
            </IconWrapper>
            <CardTitle>Encoders</CardTitle>
            <CardDescription>
              Conversores Base64, URL Encoder/Decoder, Hash Generator e muito
              mais.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper>
              <FileText size={32} />
            </IconWrapper>
            <CardTitle>Text Tools</CardTitle>
            <CardDescription>
              Lorem Ipsum, contadores de caracteres, manipulação de strings e
              regex.
            </CardDescription>
          </BentoCard>

          <BentoCard>
            <IconWrapper>
              <Sparkles size={32} />
            </IconWrapper>
            <CardTitle>Open Source</CardTitle>
            <CardDescription>
              Projeto totalmente aberto. Sinta-se livre para auditar o código ou
              contribuir.
            </CardDescription>
          </BentoCard>
        </FeatureGrid>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default AboutPage;
