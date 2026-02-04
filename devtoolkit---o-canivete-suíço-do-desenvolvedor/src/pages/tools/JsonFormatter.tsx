import React, { useState } from "react";
import { Copy, Check, Trash2, AlertCircle } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  Title,
  Description,
  Grid,
  Column,
  Toolbar,
  Label,
  IconButton,
  CopyButton,
  ButtonGroup,
  OutputBox,
  ErrorContainer,
  ErrorTitle,
  ErrorMessage,
  Pre,
  Placeholder,
} from "./styles/JsonFormatter.styles";

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput("");
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setError(null);
  };

  return (
    <Container>
      <Header>
        <Title>JSON Formatter & Validator</Title>
        <Description>
          Embeleze, valide ou minifique seus objetos JSON instantaneamente.
        </Description>
      </Header>

      <Grid>
        <Column>
          <Toolbar>
            <Label>Input</Label>
            <IconButton onClick={clear} title="Limpar">
              <Trash2 size={16} />
            </IconButton>
          </Toolbar>
          <Textarea
            placeholder="Cole seu JSON bruto aqui..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ height: "400px", borderColor: "#1e293b" }}
          />
          <ButtonGroup>
            <Button onClick={handleFormat}>Formatar</Button>
            <Button variant="outline" onClick={handleMinify}>
              Minificar
            </Button>
          </ButtonGroup>
        </Column>

        <Column>
          <Toolbar>
            <Label>Output</Label>
            <CopyButton disabled={!output} onClick={copyOutput}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copiado!" : "Copiar"}
            </CopyButton>
          </Toolbar>

          <div className="relative group">
            <OutputBox $error={!!error}>
              {error ? (
                <ErrorContainer>
                  <AlertCircle
                    size={18}
                    style={{ marginTop: "0.125rem", flexShrink: 0 }}
                  />
                  <div>
                    <ErrorTitle>JSON Inválido</ErrorTitle>
                    <ErrorMessage>{error}</ErrorMessage>
                  </div>
                </ErrorContainer>
              ) : output ? (
                <Pre>{output}</Pre>
              ) : (
                <Placeholder>O resultado aparecerá aqui...</Placeholder>
              )}
            </OutputBox>
          </div>
        </Column>
      </Grid>
    </Container>
  );
};

export default JsonFormatter;
