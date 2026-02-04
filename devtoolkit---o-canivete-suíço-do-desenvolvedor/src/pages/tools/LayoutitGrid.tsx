import React, { useState } from "react";
import {
  Grid,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Minus,
  Layout,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderControls,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  GridContainer,
  Sidebar,
  ControlsCard,
  ControlGroup,
  ControlHeader,
  ControlLabel,
  CounterControls,
  CounterButton,
  CounterValue,
  RangeInput,
  GapControls,
  GapLabelRow,
  GapValue,
  CodeCard,
  CodeHeader,
  CodeTitle,
  CopyButton,
  CodeBlock,
  PreviewArea,
  PreviewBox,
  PreviewBackground,
  PreviewBadge,
  GridCell,
  GridLabel,
  InfoGrid,
  InfoCard,
  InfoIcon,
  InfoContent,
  InfoTitle,
  InfoText,
} from "./styles/LayoutitGrid.styles";

const LayoutitGrid: React.FC = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(10);
  const [rowGap, setRowGap] = useState(10);
  const [copied, setCopied] = useState(false);

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    columnGap: `${columnGap}px`,
    rowGap: `${rowGap}px`,
    width: "100%",
    height: "100%",
  };

  const cssCode = `.container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  grid-column-gap: ${columnGap}px;
  grid-row-gap: ${rowGap}px;
}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setColumns(3);
    setRows(3);
    setColumnGap(10);
    setRowGap(10);
  };

  return (
    <Container>
      <Header>
        <HeaderControls>
          <IconWrapper>
            <Grid size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>CSS Grid Designer</Title>
            <Description>
              Desenhe layouts de grade CSS complexos visualmente.
            </Description>
          </TitleContainer>
        </HeaderControls>
        <Button variant="outline" onClick={reset}>
          <RefreshCw size={16} style={{ marginRight: "0.5rem" }} /> Reset
        </Button>
      </Header>

      <GridContainer>
        {/* Controls Sidebar */}
        <Sidebar>
          <ControlsCard>
            {/* Columns Control */}
            <ControlGroup>
              <ControlHeader>
                <ControlLabel>Colunas</ControlLabel>
                <CounterControls>
                  <CounterButton
                    onClick={() => setColumns(Math.max(1, columns - 1))}
                  >
                    <Minus size={14} />
                  </CounterButton>
                  <CounterValue>{columns}</CounterValue>
                  <CounterButton
                    onClick={() => setColumns(Math.min(12, columns + 1))}
                  >
                    <Plus size={14} />
                  </CounterButton>
                </CounterControls>
              </ControlHeader>
              <RangeInput
                type="range"
                min="1"
                max="12"
                value={columns}
                onChange={(e) => setColumns(parseInt(e.target.value))}
              />
            </ControlGroup>

            {/* Rows Control */}
            <ControlGroup>
              <ControlHeader>
                <ControlLabel>Linhas</ControlLabel>
                <CounterControls>
                  <CounterButton onClick={() => setRows(Math.max(1, rows - 1))}>
                    <Minus size={14} />
                  </CounterButton>
                  <CounterValue>{rows}</CounterValue>
                  <CounterButton
                    onClick={() => setRows(Math.min(12, rows + 1))}
                  >
                    <Plus size={14} />
                  </CounterButton>
                </CounterControls>
              </ControlHeader>
              <RangeInput
                type="range"
                min="1"
                max="12"
                value={rows}
                onChange={(e) => setRows(parseInt(e.target.value))}
              />
            </ControlGroup>

            {/* Gaps Control */}
            <GapControls>
              <ControlGroup>
                <GapLabelRow>
                  <span>Espaçamento Colunas</span>
                  <GapValue>{columnGap}px</GapValue>
                </GapLabelRow>
                <RangeInput
                  type="range"
                  min="0"
                  max="50"
                  value={columnGap}
                  onChange={(e) => setColumnGap(parseInt(e.target.value))}
                />
              </ControlGroup>
              <ControlGroup>
                <GapLabelRow>
                  <span>Espaçamento Linhas</span>
                  <GapValue>{rowGap}px</GapValue>
                </GapLabelRow>
                <RangeInput
                  type="range"
                  min="0"
                  max="50"
                  value={rowGap}
                  onChange={(e) => setRowGap(parseInt(e.target.value))}
                />
              </ControlGroup>
            </GapControls>
          </ControlsCard>

          <CodeCard>
            <CodeHeader>
              <CodeTitle>CSS Output</CodeTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copiado!" : "Copiar CSS"}
              </CopyButton>
            </CodeHeader>
            <CodeBlock>{cssCode}</CodeBlock>
          </CodeCard>
        </Sidebar>

        {/* Preview Area */}
        <PreviewArea>
          <PreviewBox>
            <PreviewBackground />

            <div style={gridStyle}>
              {Array.from({ length: columns * rows }).map((_, i) => (
                <GridCell key={i}>
                  <GridLabel>
                    {Math.floor(i / columns) + 1} : {(i % columns) + 1}
                  </GridLabel>
                </GridCell>
              ))}
            </div>

            <PreviewBadge>
              <Layout size={12} />
              {columns} x {rows} Grid
            </PreviewBadge>
          </PreviewBox>

          <InfoGrid>
            <InfoCard $variant="primary">
              <InfoIcon $variant="primary">
                <Grid size={16} />
              </InfoIcon>
              <InfoContent>
                <InfoTitle>Por que usar CSS Grid?</InfoTitle>
                <InfoText>
                  O Grid permite criar layouts bidimensionais complexos com
                  muito menos código que o Flexbox ou métodos tradicionais.
                </InfoText>
              </InfoContent>
            </InfoCard>
            <InfoCard>
              <InfoIcon>
                <Layout size={16} />
              </InfoIcon>
              <InfoContent>
                <InfoTitle>Áreas nomeadas</InfoTitle>
                <InfoText>
                  Você pode expandir este código usando{" "}
                  <code>grid-template-areas</code> para maior controle
                  semântico.
                </InfoText>
              </InfoContent>
            </InfoCard>
          </InfoGrid>
        </PreviewArea>
      </GridContainer>
    </Container>
  );
};

export default LayoutitGrid;
