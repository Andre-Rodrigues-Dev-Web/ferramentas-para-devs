import React, { useState } from "react";
import { Copy, ArrowRightLeft, Trash2 } from "lucide-react";
import { Textarea } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderLeft,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  InputGroup,
  Label,
  Actions,
  ResultCard,
  ResultHeader,
  ResultTitle,
  Legend,
  LegendItem,
  Dot,
  DiffContent,
  DiffLine,
  LineNumber,
  LineMarker,
  LineText,
} from "./styles/DiffChecker.styles";

const DiffChecker: React.FC = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [diff, setDiff] = useState<
    { type: "same" | "added" | "removed"; value: string }[] | null
  >(null);

  const handleDiff = () => {
    // Implementação simplificada de diff por linhas
    const lines1 = text1.split("\n");
    const lines2 = text2.split("\n");
    const result: any[] = [];

    // Este é um algoritmo básico de comparação para demonstração UI
    const maxLines = Math.max(lines1.length, lines2.length);
    for (let i = 0; i < maxLines; i++) {
      if (lines1[i] === lines2[i]) {
        result.push({ type: "same", value: lines1[i] });
      } else {
        if (lines1[i] !== undefined)
          result.push({ type: "removed", value: lines1[i] });
        if (lines2[i] !== undefined)
          result.push({ type: "added", value: lines2[i] });
      }
    }
    setDiff(result);
  };

  const clear = () => {
    setText1("");
    setText2("");
    setDiff(null);
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <IconWrapper>
            <Copy size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Diff Checker</Title>
            <Description>
              Compare dois blocos de texto ou código para encontrar alterações.
            </Description>
          </TitleContainer>
        </HeaderLeft>
        <Button variant="outline" size="sm" onClick={clear}>
          <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar
        </Button>
      </Header>

      <Grid>
        <InputGroup>
          <Label>Texto Original</Label>
          <Textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Insira o texto original aqui..."
            style={{ height: "16rem", borderColor: "#1e293b" }}
          />
        </InputGroup>
        <InputGroup>
          <Label>Texto Modificado</Label>
          <Textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Insira o texto alterado aqui..."
            style={{ height: "16rem", borderColor: "#1e293b" }}
          />
        </InputGroup>
      </Grid>

      <Actions>
        <Button
          onClick={handleDiff}
          style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
        >
          <ArrowRightLeft size={18} style={{ marginRight: "0.5rem" }} />{" "}
          Comparar Textos
        </Button>
      </Actions>

      {diff && (
        <ResultCard>
          <ResultHeader>
            <ResultTitle>Resultado da Comparação</ResultTitle>
            <Legend>
              <LegendItem $type="added">
                <Dot $type="added" /> Adicionado
              </LegendItem>
              <LegendItem $type="removed">
                <Dot $type="removed" /> Removido
              </LegendItem>
            </Legend>
          </ResultHeader>
          <DiffContent>
            {diff.map((line, i) => (
              <DiffLine key={i} $type={line.type}>
                <LineNumber>{i + 1}</LineNumber>
                <LineMarker>
                  {line.type === "added"
                    ? "+"
                    : line.type === "removed"
                      ? "-"
                      : " "}
                </LineMarker>
                <LineText>{line.value || " "}</LineText>
              </DiffLine>
            ))}
          </DiffContent>
        </ResultCard>
      )}
    </Container>
  );
};

export default DiffChecker;
