import React, { useState, useEffect } from "react";
import { History, Clock, Calendar, RefreshCw, Copy } from "lucide-react";
import { Input } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  ConverterCard,
  InputSection,
  InputHeader,
  Label,
  UseNowButton,
  InputRow,
  Hint,
  ResultsGrid,
  ResultBox,
  ResultLabel,
  ResultValue,
  CopyButton,
  UnitsGrid,
  UnitCard,
  UnitLabel,
  UnitValue,
} from "./styles/TimestampConverter.styles";

const TimestampConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState<string>(
    Math.floor(Date.now() / 1000).toString(),
  );
  const [dateStr, setDateStr] = useState<string>("");
  const [isoStr, setIsoStr] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    handleTimestampChange(timestamp);
  }, []);

  const handleTimestampChange = (val: string) => {
    setTimestamp(val);
    if (!val) {
      setDateStr("");
      setIsoStr("");
      return;
    }

    try {
      let num = parseInt(val);
      // Determine if ms or s
      if (val.length >= 13) {
        // Assume ms
      } else {
        num = num * 1000;
      }

      const date = new Date(num);
      if (isNaN(date.getTime())) throw new Error();

      setDateStr(date.toLocaleString());
      setIsoStr(date.toISOString());
    } catch {
      setDateStr("Data Inválida");
      setIsoStr("Data Inválida");
    }
  };

  const setNow = () => {
    handleTimestampChange(Math.floor(Date.now() / 1000).toString());
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <History size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Unix Timestamp Converter</Title>
          <Description>
            Converta timestamps do Unix em datas legíveis e vice-versa.
          </Description>
        </TitleContainer>
      </Header>

      <ConverterCard>
        <InputSection>
          <InputHeader>
            <Label>Unix Timestamp</Label>
            <UseNowButton onClick={setNow}>
              <RefreshCw size={12} /> USAR AGORA
            </UseNowButton>
          </InputHeader>
          <InputRow>
            <Input
              value={timestamp}
              onChange={(e) => handleTimestampChange(e.target.value)}
              placeholder="Ex: 1715856000"
              style={{
                flex: 1,
                fontSize: "1.5rem",
                fontWeight: 700,
                fontFamily: "monospace",
                padding: "1.5rem",
              }}
            />
          </InputRow>
          <Hint>
            Suporta Segundos (10 dígitos) e Milissegundos (13 dígitos)
          </Hint>
        </InputSection>

        <ResultsGrid>
          <ResultBox>
            <ResultLabel>
              <Calendar size={12} /> Local Time
            </ResultLabel>
            <ResultValue>{dateStr}</ResultValue>
            <CopyButton onClick={() => copy(dateStr)}>
              <Copy size={18} />
            </CopyButton>
          </ResultBox>

          <ResultBox>
            <ResultLabel>
              <Clock size={12} /> ISO 8601
            </ResultLabel>
            <ResultValue>{isoStr}</ResultValue>
            <CopyButton onClick={() => copy(isoStr)}>
              <Copy size={18} />
            </CopyButton>
          </ResultBox>
        </ResultsGrid>
      </ConverterCard>

      <UnitsGrid>
        <UnitCard>
          <UnitLabel>Minuto</UnitLabel>
          <UnitValue>60 s</UnitValue>
        </UnitCard>
        <UnitCard>
          <UnitLabel>Hora</UnitLabel>
          <UnitValue>3,600 s</UnitValue>
        </UnitCard>
        <UnitCard>
          <UnitLabel>Dia</UnitLabel>
          <UnitValue>86,400 s</UnitValue>
        </UnitCard>
      </UnitsGrid>
    </Container>
  );
};

export default TimestampConverter;
