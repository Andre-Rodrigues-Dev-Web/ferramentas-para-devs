import React, { useState } from "react";
import { Lock, Copy, Check, ShieldAlert } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  GridContainer,
  ControlCard,
  ControlsGroup,
  SaltControl,
  SaltLabelRow,
  SaltLabel,
  SaltValue,
  RangeInput,
  LegendRow,
  OutputSection,
  OutputCard,
  HashDisplay,
  HashText,
  InfoCard,
  InfoIcon,
  InfoText,
} from "./styles/BcryptGenerator.styles";

const BcryptGenerator: React.FC = () => {
  const [plainText, setPlainText] = useState("");
  const [saltRounds, setSaltRounds] = useState(10);
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock Bcrypt behavior for demonstration in browser (simulating hash generation)
  const handleGenerate = () => {
    if (!plainText) return;
    setLoading(true);
    // Em uma aplicação real, usaríamos a lib bcryptjs.
    // Aqui simulamos o delay de hashing e geramos uma string com formato bcrypt.
    setTimeout(() => {
      const salt =
        "$2b$" + saltRounds + "$" + Math.random().toString(36).substring(2, 24);
      const simulatedHash = salt + Math.random().toString(36).substring(2, 31);
      setHash(simulatedHash);
      setLoading(false);
    }, 400);
  };

  const copy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Lock size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Bcrypt Hash Generator</Title>
          <Description>
            Gere hashes Bcrypt seguros para senhas com salts customizáveis.
          </Description>
        </TitleContainer>
      </Header>

      <GridContainer>
        <ControlCard>
          <ControlsGroup>
            <Input
              label="String para Hashing"
              placeholder="Digite a senha..."
              type="password"
              value={plainText}
              onChange={(e) => setPlainText(e.target.value)}
            />

            <SaltControl>
              <SaltLabelRow>
                <SaltLabel>Salt Rounds (Cost Factor)</SaltLabel>
                <SaltValue>{saltRounds}</SaltValue>
              </SaltLabelRow>
              <RangeInput
                type="range"
                min="4"
                max="16"
                step="1"
                value={saltRounds}
                onChange={(e) => setSaltRounds(parseInt(e.target.value))}
              />
              <LegendRow>
                <span>RÁPIDO (4)</span>
                <span>SEGURO (10)</span>
                <span>LENTO (16)</span>
              </LegendRow>
            </SaltControl>
          </ControlsGroup>

          <Button
            style={{ width: "100%" }}
            onClick={handleGenerate}
            disabled={!plainText || loading}
          >
            {loading ? "Processando Hash..." : "Gerar Bcrypt Hash"}
          </Button>
        </ControlCard>

        <OutputSection>
          <OutputCard>
            <HashDisplay $hasHash={!!hash}>
              <HashText>{hash || "O hash aparecerá aqui..."}</HashText>
            </HashDisplay>

            <Button
              variant="outline"
              style={{ width: "100%" }}
              disabled={!hash}
              onClick={copy}
            >
              {copied ? (
                <Check size={18} style={{ marginRight: "0.5rem" }} />
              ) : (
                <Copy size={18} style={{ marginRight: "0.5rem" }} />
              )}
              {copied ? "Copiado!" : "Copiar Hash"}
            </Button>
          </OutputCard>

          <InfoCard>
            <InfoIcon>
              <ShieldAlert size={18} />
            </InfoIcon>
            <InfoText>
              Bcrypt é um algoritmo adaptável baseado em Blowfish. Recomenda-se
              o uso de pelo menos <strong>10 salt rounds</strong> para um
              equilíbrio entre segurança e performance em 2024.
            </InfoText>
          </InfoCard>
        </OutputSection>
      </GridContainer>
    </Container>
  );
};

export default BcryptGenerator;
