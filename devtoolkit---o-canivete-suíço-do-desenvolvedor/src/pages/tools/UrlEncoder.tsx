import React, { useState } from "react";
import { Link } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  EncoderCard,
  InputGroup,
  Label,
  ActionButtons,
  ResultSection,
  ResultHeader,
  CopyButton,
  ResultBox,
  Placeholder,
} from "./styles/UrlEncoder.styles";

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleEncode = () => setOutput(encodeURIComponent(input));
  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput("ERRO: URL malformada.");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Link size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>URL Encoder / Decoder</Title>
          <Description>
            Codifique ou decodifique caracteres especiais para uso seguro em
            URLs.
          </Description>
        </TitleContainer>
      </Header>

      <EncoderCard>
        <InputGroup>
          <Label>Input Text / URL</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole o texto ou URL aqui..."
            style={{ height: "10rem", borderColor: "#1e293b" }}
          />
        </InputGroup>

        <ActionButtons>
          <Button onClick={handleEncode} style={{ flex: 1 }}>
            Encodar
          </Button>
          <Button variant="outline" onClick={handleDecode} style={{ flex: 1 }}>
            Decodar
          </Button>
        </ActionButtons>

        <ResultSection>
          <ResultHeader>
            <Label>Resultado</Label>
            <CopyButton disabled={!output} onClick={copy}>
              {copied ? "Copiado!" : "Copiar"}
            </CopyButton>
          </ResultHeader>
          <ResultBox>
            {output || <Placeholder>O resultado aparecerá aqui...</Placeholder>}
          </ResultBox>
        </ResultSection>
      </EncoderCard>
    </Container>
  );
};

export default UrlEncoder;
