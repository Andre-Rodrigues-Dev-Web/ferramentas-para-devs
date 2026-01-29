import React, { useState } from "react";
import { Minimize, Copy, Check, Trash2, Zap } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  Column,
  Toolbar,
  Label,
  ActionButton,
  CopyButton,
  OutputContainer,
  OutputBox,
  Placeholder,
  StatsBar,
  StatItem,
  StatLabel,
  StatValue,
} from "./styles/MinifierTool.styles";

const MinifierTool: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState<{
    original: number;
    minified: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    if (!input.trim()) return;

    // Logic for minification (remove comments and extra spaces)
    const minified = input
      .replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, "") // Remove comments
      .replace(/\s+/g, " ") // Collapse multiple spaces
      .replace(/\s*([{};,:])\s*/g, "$1") // Remove spaces around symbols
      .trim();

    setOutput(minified);
    setStats({
      original: new Blob([input]).size,
      minified: new Blob([minified]).size,
    });
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const compressionRate = stats
    ? ((1 - stats.minified / stats.original) * 100).toFixed(1)
    : 0;

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Minimize size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>JS & CSS Minifier</Title>
          <Description>
            Reduza o tamanho dos seus arquivos de estilo e script para produção.
          </Description>
        </TitleContainer>
      </Header>

      <Grid>
        <Column>
          <Toolbar>
            <Label>Código Fonte</Label>
            <ActionButton onClick={() => setInput("")}>
              <Trash2 size={16} />
            </ActionButton>
          </Toolbar>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole seu CSS ou JavaScript aqui..."
            style={{ height: "400px", borderColor: "#1e293b" }}
          />
          <Button
            onClick={handleMinify}
            style={{ width: "100%" }}
            disabled={!input}
          >
            <Zap size={18} style={{ marginRight: "0.5rem" }} /> Minificar Código
          </Button>
        </Column>

        <Column>
          <Toolbar>
            <Label>Resultado Minificado</Label>
            <CopyButton disabled={!output} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "COPIADO" : "COPIAR"}
            </CopyButton>
          </Toolbar>
          <OutputContainer>
            <OutputBox>
              {output || (
                <Placeholder>
                  O resultado aparecerá aqui após a minificação...
                </Placeholder>
              )}
            </OutputBox>

            {stats && (
              <StatsBar>
                <StatItem>
                  <StatLabel>Economia</StatLabel>
                  <StatValue $isGreen>{compressionRate}% menor</StatValue>
                </StatItem>
                <StatItem>
                  <StatLabel>Tamanho Final</StatLabel>
                  <StatValue>{(stats.minified / 1024).toFixed(2)} KB</StatValue>
                </StatItem>
              </StatsBar>
            )}
          </OutputContainer>
        </Column>
      </Grid>
    </Container>
  );
};

export default MinifierTool;
