import * as React from "react";
import QRCode from "react-qr-code";
import MarketingLayout from "../../landing/ui/MarketingLayout";
import {
  Title,
  ContentWrapper,
  SectionTitle,
} from "../../landing/ui/LandingPage.styles";
import { Button } from "../../../shared/ui/Button";
import { Github, GitPullRequest, MessagesSquare, Bug } from "lucide-react";
import {
  PageHeader,
  ContributionContainer,
  StepList,
  StepItem,
} from "./ContributionPage.styles";

const ContributionPage: React.FC = () => {
  return (
    <MarketingLayout
      title="Contribua"
      description="Ajude a construir o DevToolkit. Veja como contribuir com código, reportar bugs ou apoiar o projeto."
    >
      <ContentWrapper>
        <PageHeader>
          <Title>
            Faça Parte do <span className="gradient-text">Projeto</span>
          </Title>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-4">
            DevToolkit é construído pela comunidade, para a comunidade. Sua
            contribuição é bem-vinda, seja código, design ou ideias.
          </p>
        </PageHeader>

        <ContributionContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800"
            >
              <GitPullRequest size={24} className="text-green-400" />
              <span className="font-bold">Pull Requests</span>
              <span className="text-xs text-slate-400 font-normal">
                Envie suas correções
              </span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800"
            >
              <Bug size={24} className="text-red-400" />
              <span className="font-bold">Reportar Bug</span>
              <span className="text-xs text-slate-400 font-normal">
                Encontrou um erro?
              </span>
            </Button>

            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 border-slate-700 hover:bg-slate-800"
            >
              <MessagesSquare size={24} className="text-blue-400" />
              <span className="font-bold">Discutir</span>
              <span className="text-xs text-slate-400 font-normal">
                Ideias e Sugestões
              </span>
            </Button>
          </div>

          <SectionTitle>Como Começar</SectionTitle>

          <StepList>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Fork o Repositório
                </h3>
                <p className="text-slate-400">
                  Crie uma cópia do projeto na sua conta GitHub para começar a
                  trabalhar.
                </p>
              </div>
            </StepItem>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Instale as Dependências
                </h3>
                <p className="text-slate-400">
                  Use <code>npm install</code> para baixar tudo que o projeto
                  precisa para rodar.
                </p>
              </div>
            </StepItem>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Crie sua Feature
                </h3>
                <p className="text-slate-400">
                  Desenvolva sua melhoria ou correção em uma nova branch.
                </p>
              </div>
            </StepItem>
            <StepItem>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  Abra um Pull Request
                </h3>
                <p className="text-slate-400">
                  Envie suas alterações para revisão. Nós ficaremos felizes em
                  fazer o merge!
                </p>
              </div>
            </StepItem>
          </StepList>

          <div className="mt-10 text-center">
            <a
              href="https://github.com/Andre-Rodrigues-Dev-Web/ferramentas-para-devs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="px-8">
                Ir para o GitHub <Github className="ml-2" size={20} />
              </Button>
            </a>
          </div>

          <SectionTitle className="mt-16">Apoie o Projeto</SectionTitle>
          <div className="flex flex-col items-center justify-center gap-6 mt-8 p-8 bg-slate-800/50 rounded-xl border border-slate-700">
            <h3 className="text-xl font-bold text-white">Contribua via PIX</h3>
            <p className="text-slate-400 text-center max-w-md">
              Ajude a manter o projeto ativo e com novas funcionalidades.
              Qualquer valor é bem-vindo!
            </p>

            <div className="bg-white p-4 rounded-lg">
              <QRCode value="xor2018@gmail.com" size={200} />
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-slate-400">
                Chave PIX (E-mail):
              </span>
              <code className="bg-slate-900 px-4 py-2 rounded text-blue-400 font-mono text-lg select-all">
                xor2018@gmail.com
              </code>
            </div>
          </div>
        </ContributionContainer>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default ContributionPage;
