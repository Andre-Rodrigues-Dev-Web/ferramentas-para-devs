import React, { useState, useEffect } from "react";
import { Brackets, Info, AlertCircle } from "lucide-react";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  MainContent,
  InputCard,
  InputGroup,
  FieldWrapper,
  FlagsWrapper,
  Label,
  RegexInputContainer,
  SlashLeft,
  SlashRight,
  RegexInput,
  FlagsInput,
  HighlightCard,
  HighlightHeader,
  HighlightContent,
  ErrorMessage,
  MatchMark,
  Sidebar,
  ResultsCard,
  ResultsHeader,
  MatchCount,
  MatchList,
  MatchItem,
  MatchHeader,
  MatchText,
  EmptyMatches,
  ReferenceCard,
  ReferenceTitle,
  ReferenceList,
  ReferenceCode,
} from "./styles/RegexTester.styles";

const RegexTester: React.FC = () => {
  const [regex, setRegex] = useState("\\d+");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState(
    "Encontrei 42 erros em 3 arquivos diferentes.",
  );
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!regex) {
        setMatches([]);
        setError(null);
        return;
      }
      const re = new RegExp(regex, flags);
      const allMatches = Array.from(testString.matchAll(re));
      setMatches(allMatches as any);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [regex, flags, testString]);

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Brackets size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Regex Tester</Title>
          <Description>
            Teste suas expressões regulares em tempo real com suporte a flags.
          </Description>
        </TitleContainer>
      </Header>

      <Grid>
        <MainContent>
          <InputCard>
            <InputGroup>
              <FieldWrapper>
                <Label>Expressão Regular</Label>
                <RegexInputContainer>
                  <SlashLeft>/</SlashLeft>
                  <RegexInput
                    type="text"
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    placeholder="digite o padrão..."
                  />
                  <SlashRight>/</SlashRight>
                </RegexInputContainer>
              </FieldWrapper>
              <FlagsWrapper>
                <Label>Flags</Label>
                <FlagsInput
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="gim"
                />
              </FlagsWrapper>
            </InputGroup>

            <FieldWrapper>
              <Label>Texto de Teste</Label>
              <Textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Insira o texto para testar a regex..."
                style={{ height: "12rem", borderColor: "#1e293b" }}
              />
            </FieldWrapper>
          </InputCard>

          <HighlightCard>
            <HighlightHeader>Highlight de Matches</HighlightHeader>
            <HighlightContent>
              {error ? (
                <ErrorMessage>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </ErrorMessage>
              ) : (
                testString
                  .split(new RegExp(`(${regex})`, flags))
                  .map((part, i) => {
                    const isMatch = part.match(new RegExp(regex, flags));
                    return isMatch && regex ? (
                      <MatchMark key={i}>{part}</MatchMark>
                    ) : (
                      <span key={i} style={{ color: "#94a3b8" }}>
                        {part}
                      </span>
                    );
                  })
              )}
            </HighlightContent>
          </HighlightCard>
        </MainContent>

        <Sidebar>
          <ResultsCard>
            <ResultsHeader>
              <HighlightHeader style={{ marginBottom: 0 }}>
                Resultados
              </HighlightHeader>
              <MatchCount>{matches.length} matches</MatchCount>
            </ResultsHeader>

            <MatchList>
              {matches.map((match, i) => (
                <MatchItem key={i}>
                  <MatchHeader>
                    <span>MATCH #{i + 1}</span>
                    <span>Index: {match.index}</span>
                  </MatchHeader>
                  <MatchText>"{match[0]}"</MatchText>
                </MatchItem>
              ))}
              {matches.length === 0 && !error && (
                <EmptyMatches>Nenhum match encontrado.</EmptyMatches>
              )}
            </MatchList>
          </ResultsCard>

          <ReferenceCard>
            <ReferenceTitle>
              <Info size={12} style={{ color: "#3b82f6" }} /> Referência Rápida
            </ReferenceTitle>
            <ReferenceList>
              <li>
                <ReferenceCode>\d</ReferenceCode> - Qualquer dígito
              </li>
              <li>
                <ReferenceCode>\w</ReferenceCode> - Alfanumérico e "_"
              </li>
              <li>
                <ReferenceCode>\s</ReferenceCode> - Espaço em branco
              </li>
              <li>
                <ReferenceCode>+</ReferenceCode> - 1 ou mais ocorrências
              </li>
              <li>
                <ReferenceCode>*</ReferenceCode> - 0 ou mais ocorrências
              </li>
              <li>
                <ReferenceCode>?</ReferenceCode> - 0 ou 1 ocorrência
              </li>
            </ReferenceList>
          </ReferenceCard>
        </Sidebar>
      </Grid>
    </Container>
  );
};

export default RegexTester;
