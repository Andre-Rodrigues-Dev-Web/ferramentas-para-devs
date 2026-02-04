import React, { useState } from "react";
import { Copy, Check, RefreshCw, Square } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  GridContainer,
  ControlsCard,
  ControlsGrid,
  SliderGroup,
  SliderLabel,
  SliderValue,
  RangeInput,
  PreviewArea,
  PreviewBoxContainer,
  PreviewBox,
  CodeCard,
  CodeHeader,
  SectionTitle,
  CopyButton,
  CodeBlock,
} from "./styles/FancyBorderGenerator.styles";

const FancyBorderGenerator: React.FC = () => {
  const [borderRadius, setBorderRadius] = useState([
    30, 70, 70, 30, 30, 30, 70, 70,
  ]);
  const [copied, setCopied] = useState(false);

  const radiusString = `${borderRadius[0]}% ${100 - borderRadius[0]}% ${borderRadius[1]}% ${100 - borderRadius[1]}% / ${borderRadius[3]}% ${borderRadius[2]}% ${100 - borderRadius[2]}% ${100 - borderRadius[3]}%`;

  const handleSliderChange = (index: number, value: number) => {
    const newRadius = [...borderRadius];
    newRadius[index] = value;
    setBorderRadius(newRadius);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`border-radius: ${radiusString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Square size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Fancy Border Radius</Title>
          <Description>
            Crie formas orgânicas e complexas para seus elementos UI.
          </Description>
        </TitleContainer>
      </Header>

      <GridContainer>
        <ControlsCard>
          <ControlsGrid>
            {borderRadius.map((val, i) => (
              <SliderGroup key={i}>
                <SliderLabel>
                  <span>Handle #{i + 1}</span>
                  <SliderValue>{val}%</SliderValue>
                </SliderLabel>
                <RangeInput
                  type="range"
                  min="0"
                  max="100"
                  value={val}
                  onChange={(e) =>
                    handleSliderChange(i, parseInt(e.target.value))
                  }
                />
              </SliderGroup>
            ))}
          </ControlsGrid>

          <Button
            variant="outline"
            style={{ width: "100%" }}
            onClick={() => setBorderRadius([30, 70, 70, 30, 30, 30, 70, 70])}
          >
            <RefreshCw size={16} style={{ marginRight: "0.5rem" }} /> Resetar
            Forma
          </Button>
        </ControlsCard>

        <PreviewArea>
          <PreviewBoxContainer>
            <PreviewBox style={{ borderRadius: radiusString }} />
          </PreviewBoxContainer>

          <CodeCard>
            <CodeHeader>
              <SectionTitle>Código CSS</SectionTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </CodeHeader>
            <CodeBlock>border-radius: {radiusString};</CodeBlock>
          </CodeCard>
        </PreviewArea>
      </GridContainer>
    </Container>
  );
};

export default FancyBorderGenerator;
