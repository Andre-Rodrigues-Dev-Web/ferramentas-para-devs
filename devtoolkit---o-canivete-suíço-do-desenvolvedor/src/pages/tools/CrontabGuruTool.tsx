import React, { useState, useMemo } from "react";
import {
  Clock,
  Info,
  HelpCircle,
  ChevronRight,
  Zap,
  Star,
  RefreshCw,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  MainColumn,
  SidebarColumn,
  EditorCard,
  InputsRow,
  PartsContainer,
  InputWrapper,
  InputLabel,
  PartInput,
  ExpressionDisplay,
  ExpressionLabel,
  ExpressionInput,
  ResetButton,
  ExplanationBox,
  ExplanationText,
  LiveTag,
  ReferenceGrid,
  RefItem,
  RefLabel,
  RefValue,
  InfoBox,
  InfoIconWrapper,
  InfoContent,
  InfoTitle,
  InfoText,
  SidebarCard,
  SidebarTitle,
  PresetsList,
  PresetButton,
  PresetLabel,
  PresetValueContainer,
  PresetCode,
  ChevronWrapper,
  SidebarFooter,
} from "./styles/CrontabGuruTool.styles";

const PRESETS = [
  { label: "A cada minuto", value: "* * * * *" },
  { label: "A cada 5 minutos", value: "*/5 * * * *" },
  { label: "A cada hora", value: "0 * * * *" },
  { label: "Todo dia à meia-noite", value: "0 0 * * *" },
  { label: "Toda segunda-feira à meia-noite", value: "0 0 * * 1" },
  { label: "No primeiro dia de cada mês", value: "0 0 1 * *" },
  { label: "Todos os domingos às 04:30", value: "30 4 * * 0" },
  { label: "A cada hora comercial (Mon-Fri)", value: "0 9-17 * * 1-5" },
];

const CrontabGuruTool: React.FC = () => {
  const [expression, setExpression] = useState("*/15 * * * *");
  const [parts, setParts] = useState(["*/15", "*", "*", "*", "*"]);
  const [activePart, setActivePart] = useState<number | null>(null);

  const handleInputChange = (val: string) => {
    setExpression(val);
    const split = val.trim().split(/\s+/);
    if (split.length <= 5) {
      setParts([...split, ...Array(5 - split.length).fill("")].slice(0, 5));
    }
  };

  const handlePartChange = (index: number, val: string) => {
    const newParts = [...parts];
    newParts[index] = val;
    setParts(newParts);
    setExpression(newParts.join(" "));
  };

  const explanation = useMemo(() => {
    try {
      const [m, h, dom, mon, dow] = parts;

      const explainPart = (val: string, type: string) => {
        if (val === "*") return `cada ${type}`;
        if (val.includes("*/")) return `a cada ${val.split("/")[1]} ${type}s`;
        if (val.includes("-"))
          return `de ${val.split("-")[0]} a ${val.split("-")[1]} (${type})`;
        if (val.includes(","))
          return `nos ${type}s ${val.split(",").join(" e ")}`;
        return `no ${type} ${val}`;
      };

      // Simple pseudo-parser for human explanation
      let text = "“A tarefa será executada ";

      if (m === "*" && h === "*" && dom === "*" && mon === "*" && dow === "*") {
        return "“A tarefa será executada a cada minuto de cada dia.”";
      }

      const minuteText = m === "*" ? "cada minuto" : `no minuto ${m}`;
      const hourText = h === "*" ? "de cada hora" : `na hora ${h}`;
      const dayOfMonthText = dom === "*" ? "" : ` no dia do mês ${dom}`;
      const monthText = mon === "*" ? "" : ` em ${getMonthName(mon)}`;
      const dayOfWeekText = dow === "*" ? "" : ` nas ${getWeekdayName(dow)}`;

      text += `${minuteText} ${hourText}${dayOfMonthText}${monthText}${dayOfWeekText}.”`;

      return text;
    } catch (e) {
      return "Expressão inválida ou não suportada para tradução simples.";
    }
  }, [parts]);

  function getMonthName(m: string) {
    const months = [
      "",
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    return months[parseInt(m)] || `mês ${m}`;
  }

  function getWeekdayName(d: string) {
    const days = [
      "Domingos",
      "Segundas",
      "Terças",
      "Quartas",
      "Quintas",
      "Sextas",
      "Sábados",
    ];
    return days[parseInt(d)] || `dia da semana ${d}`;
  }

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Clock size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Crontab Guru</Title>
            <Description>
              Editor visual e explicador de expressões cron para agendamento de
              tarefas.
            </Description>
          </TitleContainer>
        </HeaderContent>
      </Header>

      <Grid>
        {/* Editor Main Section */}
        <MainColumn>
          <EditorCard>
            {/* Expression Inputs */}
            <InputsRow>
              <PartsContainer>
                <CronInputPart
                  label="Minuto"
                  value={parts[0]}
                  index={0}
                  active={activePart === 0}
                  onFocus={() => setActivePart(0)}
                  onChange={(v) => handlePartChange(0, v)}
                />
                <CronInputPart
                  label="Hora"
                  value={parts[1]}
                  index={1}
                  active={activePart === 1}
                  onFocus={() => setActivePart(1)}
                  onChange={(v) => handlePartChange(1, v)}
                />
                <CronInputPart
                  label="Dia (Mês)"
                  value={parts[2]}
                  index={2}
                  active={activePart === 2}
                  onFocus={() => setActivePart(2)}
                  onChange={(v) => handlePartChange(2, v)}
                />
                <CronInputPart
                  label="Mês"
                  value={parts[3]}
                  index={3}
                  active={activePart === 3}
                  onFocus={() => setActivePart(3)}
                  onChange={(v) => handlePartChange(3, v)}
                />
                <CronInputPart
                  label="Dia (Semana)"
                  value={parts[4]}
                  index={4}
                  active={activePart === 4}
                  onFocus={() => setActivePart(4)}
                  onChange={(v) => handlePartChange(4, v)}
                />
              </PartsContainer>

              <ExpressionDisplay>
                <ExpressionLabel>cron</ExpressionLabel>
                <ExpressionInput
                  type="text"
                  value={expression}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="* * * * *"
                />
                <ResetButton onClick={() => setExpression("* * * * *")}>
                  <RefreshCw size={18} />
                </ResetButton>
              </ExpressionDisplay>
            </InputsRow>

            {/* Human Explanation */}
            <ExplanationBox>
              <ExplanationText>{explanation}</ExplanationText>
              <LiveTag>
                <Zap size={14} /> Tradução em tempo real
              </LiveTag>
            </ExplanationBox>

            {/* Documentation/Reference */}
            <ReferenceGrid>
              <RefPart label="Minutos" range="0-59" />
              <RefPart label="Horas" range="0-23" />
              <RefPart label="Dia do Mês" range="1-31" />
              <RefPart label="Mês" range="1-12" />
              <RefPart label="Dia da Semana" range="0-6 (Dom-Sab)" />
            </ReferenceGrid>
          </EditorCard>

          <InfoBox>
            <InfoIconWrapper>
              <Info size={20} />
            </InfoIconWrapper>
            <InfoContent>
              <InfoTitle>Como funciona?</InfoTitle>
              <InfoText>
                As expressões cron seguem o padrão Unix. Os caracteres especiais
                permitidos incluem: <code>*</code> (qualquer), <code>,</code>{" "}
                (lista), <code>-</code> (intervalo) e <code>/</code>{" "}
                (incremento).
              </InfoText>
            </InfoContent>
          </InfoBox>
        </MainColumn>

        {/* Presets Sidebar */}
        <SidebarColumn>
          <SidebarCard>
            <SidebarTitle>
              <Star size={14} style={{ color: "#f59e0b" }} /> Expressões Comuns
            </SidebarTitle>
            <PresetsList>
              {PRESETS.map((p) => (
                <PresetButton
                  key={p.value}
                  onClick={() => handleInputChange(p.value)}
                >
                  <PresetLabel>{p.label}</PresetLabel>
                  <PresetValueContainer>
                    <PresetCode>{p.value}</PresetCode>
                    <ChevronWrapper>
                      <ChevronRight size={14} />
                    </ChevronWrapper>
                  </PresetValueContainer>
                </PresetButton>
              ))}
            </PresetsList>

            <SidebarFooter>
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => window.open("https://crontab.guru", "_blank")}
              >
                <HelpCircle size={14} className="mr-2" /> Documentação Completa
              </Button>
            </SidebarFooter>
          </SidebarCard>
        </SidebarColumn>
      </Grid>
    </Container>
  );
};

const CronInputPart = ({
  label,
  value,
  active,
  onFocus,
  onChange,
}: {
  label: string;
  value: string;
  active: boolean;
  index: number;
  onFocus: () => void;
  onChange: (v: string) => void;
}) => (
  <InputWrapper>
    <InputLabel $active={active}>{label}</InputLabel>
    <PartInput
      type="text"
      value={value}
      onFocus={onFocus}
      onChange={(e) => onChange(e.target.value)}
      $active={active}
    />
  </InputWrapper>
);

const RefPart = ({ label, range }: { label: string; range: string }) => (
  <RefItem>
    <RefLabel>{label}</RefLabel>
    <RefValue>{range}</RefValue>
  </RefItem>
);

export default CrontabGuruTool;
