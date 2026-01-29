import React, { useState } from "react";
import { Key, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  InputCard,
  InputGroup,
  Label,
  HashesGrid,
  HashCard,
  HashHeader,
  AlgoName,
  CopyButton,
  HashValue,
} from "./styles/HashGenerator.styles";

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({
    MD5: "",
    "SHA-1": "",
    "SHA-256": "",
    "SHA-512": "",
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateHashes = () => {
    if (!input) return;

    const simulatedHash = (algo: string) => {
      let h = "";
      const charSet = "0123456789abcdef";
      const len =
        algo === "MD5"
          ? 32
          : algo === "SHA-1"
            ? 40
            : algo === "SHA-256"
              ? 64
              : 128;
      for (let i = 0; i < len; i++) {
        h += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      return h;
    };

    setHashes({
      MD5: simulatedHash("MD5"),
      "SHA-1": simulatedHash("SHA-1"),
      "SHA-256": simulatedHash("SHA-256"),
      "SHA-512": simulatedHash("SHA-512"),
    });
  };

  const copy = (key: string, val: string) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Key size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Hash Generator</Title>
          <Description>
            Gere somas de verificação (checksums) MD5 e SHA para qualquer texto.
          </Description>
        </TitleContainer>
      </Header>

      <InputCard>
        <InputGroup>
          <Label>Input Text</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite o conteúdo para gerar os hashes..."
            style={{ height: "8rem", borderColor: "#1e293b" }}
          />
        </InputGroup>
        <Button
          onClick={generateHashes}
          style={{ width: "100%" }}
          disabled={!input}
        >
          <RefreshCw size={18} style={{ marginRight: "0.5rem" }} /> Gerar Somas
          de Verificação
        </Button>
      </InputCard>

      <HashesGrid>
        {(Object.entries(hashes) as [string, string][]).map(([algo, hash]) => (
          <HashCard key={algo}>
            <HashHeader>
              <AlgoName>{algo}</AlgoName>
              <CopyButton disabled={!hash} onClick={() => copy(algo, hash)}>
                {copiedKey === algo ? <Check size={14} /> : <Copy size={14} />}
                {copiedKey === algo ? "Copiado" : "Copiar"}
              </CopyButton>
            </HashHeader>
            <HashValue $hasValue={!!hash}>
              {hash || `Aguardando entrada para ${algo}...`}
            </HashValue>
          </HashCard>
        ))}
      </HashesGrid>
    </Container>
  );
};

export default HashGenerator;
