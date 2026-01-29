import React, { useState } from "react";
import { Copy, Check, RefreshCw, Fingerprint } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  IconWrapper,
  Title,
  Description,
  GeneratorCard,
  Controls,
  InputGroup,
  Label,
  NumberInput,
  ResultsList,
  ResultItem,
  UuidCode,
  CopyButton,
} from "./styles/UuidGenerator.styles";

const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const generateUUID = () => {
    const newUuids = Array.from({ length: count }, () => {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Fingerprint size={48} />
        </IconWrapper>
        <Title>UUID Generator</Title>
        <Description>
          Gere identificadores únicos universais v4 seguros para seus projetos.
        </Description>
      </Header>

      <GeneratorCard>
        <Controls>
          <InputGroup>
            <Label>Quantidade</Label>
            <NumberInput
              type="number"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            />
          </InputGroup>
          <Button onClick={generateUUID} style={{ height: "2.75rem" }}>
            <RefreshCw size={18} style={{ marginRight: "0.5rem" }} /> Gerar
          </Button>
        </Controls>

        {uuids.length > 0 && (
          <ResultsList>
            {uuids.map((uuid, i) => (
              <ResultItem key={i}>
                <UuidCode>{uuid}</UuidCode>
                <CopyButton onClick={() => copyToClipboard(uuid)}>
                  {copiedId === uuid ? <Check size={18} /> : <Copy size={18} />}
                </CopyButton>
              </ResultItem>
            ))}
          </ResultsList>
        )}
      </GeneratorCard>
    </Container>
  );
};

export default UuidGenerator;
