import React, { useState } from "react";
import { Copy, Check, AlignLeft } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  Title,
  Description,
  GeneratorCard,
  Controls,
  InputGroup,
  Label,
  NumberInput,
  ResultSection,
  ResultHeader,
  ResultTitle,
  CopyButton,
  OutputBox,
} from "./styles/LoremIpsumGenerator.styles";

const LOREM_WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "dolor",
  "in",
  "reprehenderit",
  "in",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "dolore",
  "eu",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "in",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
];

const LoremIpsumGenerator: React.FC = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let result = [];
    for (let p = 0; p < paragraphs; p++) {
      let sentenceCount = Math.floor(Math.random() * 4) + 4;
      let paragraph = [];
      for (let s = 0; s < sentenceCount; s++) {
        let wordCount = Math.floor(Math.random() * 8) + 10;
        let sentence = [];
        for (let w = 0; w < wordCount; w++) {
          sentence.push(
            LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)],
          );
        }
        let str = sentence.join(" ");
        paragraph.push(str.charAt(0).toUpperCase() + str.slice(1) + ".");
      }
      result.push(paragraph.join(" "));
    }
    setOutput(result.join("\n\n"));
  };

  const copy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <Title>Lorem Ipsum Generator</Title>
        <Description>
          Gere textos de preenchimento para seus layouts e designs.
        </Description>
      </Header>

      <GeneratorCard>
        <Controls>
          <InputGroup>
            <Label>Parágrafos</Label>
            <NumberInput
              type="number"
              min="1"
              max="20"
              value={paragraphs}
              onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
            />
          </InputGroup>
          <Button onClick={generate} style={{ height: "2.75rem" }}>
            <AlignLeft size={18} style={{ marginRight: "0.5rem" }} /> Gerar
            Texto
          </Button>
        </Controls>

        {output && (
          <ResultSection>
            <ResultHeader>
              <ResultTitle>Resultado</ResultTitle>
              <CopyButton onClick={copy}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </ResultHeader>
            <OutputBox>{output}</OutputBox>
          </ResultSection>
        )}
      </GeneratorCard>
    </Container>
  );
};

export default LoremIpsumGenerator;
