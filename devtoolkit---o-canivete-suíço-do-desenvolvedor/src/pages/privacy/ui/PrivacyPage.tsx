import React from "react";
import styled from "styled-components";
import MarketingLayout from "../../landing/ui/MarketingLayout";
import {
  Title,
  ContentWrapper,
  SectionTitle,
} from "../../landing/ui/LandingPage.styles";

const LegalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto 6rem;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const PolicyText = styled.div`
  color: #cbd5e1;
  line-height: 1.8;

  h2 {
    color: white;
    font-size: 1.5rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: disc;
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`;

const PrivacyPage: React.FC = () => {
  return (
    <MarketingLayout title="Política de Privacidade">
      <ContentWrapper>
        <div className="pt-32 pb-16 text-center">
          <Title>
            Política de <span className="gradient-text">Privacidade</span>
          </Title>
        </div>

        <LegalContainer>
          <PolicyText>
            <p>
              Sua privacidade é nossa prioridade absoluta. O DevToolkit foi
              construído seguindo o princípio de "Privacy First". Esta política
              explica como tratamos seus dados.
            </p>

            <h3>1. Coleta de Dados</h3>
            <p>
              <strong>Nós não coletamos dados pessoais.</strong> O DevToolkit é
              uma aplicação majoritariamente client-side. Isso significa que as
              ferramentas (como conversores, formatadores, e geradores) rodam
              diretamente no seu navegador.
            </p>
            <p>
              Os dados que você cola ou digita nas ferramentas (como JSON, SQL,
              chaves PIX) nunca deixam o seu dispositivo. Eles não são enviados
              para nenhum servidor nosso.
            </p>

            <h3>2. Cookies e Armazenamento Local</h3>
            <p>
              Utilizamos `localStorage` e `cookies` estritamente necessários
              para funcionalidades básicas, tais como:
            </p>
            <ul>
              <li>Salvar suas preferências de tema (Dark/Light mode).</li>
              <li>Lembrar se você já aceitou o aviso de cookies.</li>
              <li>
                Salvar o estado das ferramentas (se aplicável) para sua
                conveniência.
              </li>
            </ul>
            <p>
              Não utilizamos cookies de rastreamento, analytics de terceiros
              invasivos ou pixels de publicidade.
            </p>

            <h3>3. Projetos de Terceiros</h3>
            <p>
              O código fonte do DevToolkit é aberto e está disponível no GitHub.
              Encorajamos a auditoria do código pela comunidade para garantir
              que mantemos nossos padrões de transparência e segurança.
            </p>

            <h3>4. Contato</h3>
            <p>
              Se tiver dúvidas sobre esta política, você pode abrir uma issue em
              nosso repositório no GitHub ou entrar em contato através dos
              canais de contribuição.
            </p>

            <p className="mt-8 text-sm text-slate-500">
              Última atualização: 28 de Janeiro de 2026.
            </p>
          </PolicyText>
        </LegalContainer>
      </ContentWrapper>
    </MarketingLayout>
  );
};

export default PrivacyPage;
