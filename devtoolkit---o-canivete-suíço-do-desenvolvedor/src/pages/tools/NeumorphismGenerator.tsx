import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  Title,
  Description,
  GridContainer,
  ControlsCard,
  ControlsGroup,
  ControlRow,
  LabelRow,
  Label,
  ValueDisplay,
  RangeInput,
  ColorInput,
  ShapeButtonsContainer,
  ShapeButton,
  PreviewArea,
  PreviewContainer,
  NeumorphicBox,
  CodeCard,
  CodeHeader,
  SectionTitle,
  CopyButton,
  CodeBlock,
} from "./styles/NeumorphismGenerator.styles";

const NeumorphismGenerator: React.FC = () => {
  const [size, setSize] = useState(200);
  const [radius, setRadius] = useState(40);
  const [distance, setDistance] = useState(20);
  const [intensity, setIntensity] = useState(0.15);
  const [blur, setBlur] = useState(40);
  const [color, setColor] = useState("#0f172a");
  const [shape, setShape] = useState<"flat" | "concave" | "convex" | "pressed">(
    "flat",
  );
  const [copied, setCopied] = useState(false);

  const getLightColor = (hex: string, intensity: number) => {
    const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + intensity * 255);
    const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + intensity * 255);
    const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + intensity * 255);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
  };

  const getDarkColor = (hex: string, intensity: number) => {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - intensity * 255);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - intensity * 255);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - intensity * 255);
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
  };

  const darkShadow = getDarkColor(color, intensity);
  const lightShadow = getLightColor(color, intensity);

  const shadows =
    shape === "pressed"
      ? `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`
      : `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;

  const neuStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${radius}px`,
    background: color,
    boxShadow: shadows,
  };

  const cssCode = `border-radius: ${radius}px;
background: ${color};
box-shadow: ${shadows};`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <Title>Neumorphism Generator</Title>
        <Description>
          Gere estilos de UI suave com sombras baseadas em luz natural.
        </Description>
      </Header>

      <GridContainer>
        <ControlsCard>
          <ControlsGroup>
            <ControlRow>
              <LabelRow>
                <Label>Cor de Fundo</Label>
              </LabelRow>
              <ColorInput
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </ControlRow>
            <ControlRow>
              <LabelRow>
                <Label>Tamanho</Label>
                <ValueDisplay>{size}px</ValueDisplay>
              </LabelRow>
              <RangeInput
                type="range"
                min="50"
                max="400"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
            </ControlRow>
            <ControlRow>
              <LabelRow>
                <Label>Raio (Border Radius)</Label>
                <ValueDisplay>{radius}px</ValueDisplay>
              </LabelRow>
              <RangeInput
                type="range"
                min="0"
                max="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
              />
            </ControlRow>
            <ControlRow>
              <LabelRow>
                <Label>Distância</Label>
                <ValueDisplay>{distance}px</ValueDisplay>
              </LabelRow>
              <RangeInput
                type="range"
                min="1"
                max="50"
                value={distance}
                onChange={(e) => setDistance(parseInt(e.target.value))}
              />
            </ControlRow>
            <ControlRow>
              <LabelRow>
                <Label>Intensidade</Label>
                <ValueDisplay>{intensity}</ValueDisplay>
              </LabelRow>
              <RangeInput
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={intensity}
                onChange={(e) => setIntensity(parseFloat(e.target.value))}
              />
            </ControlRow>
            <ControlRow>
              <LabelRow>
                <Label>Blur</Label>
                <ValueDisplay>{blur}px</ValueDisplay>
              </LabelRow>
              <RangeInput
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value))}
              />
            </ControlRow>

            <ShapeButtonsContainer>
              {(["flat", "pressed"] as const).map((s) => (
                <ShapeButton
                  key={s}
                  onClick={() => setShape(s)}
                  $isActive={shape === s}
                >
                  {s.toUpperCase()}
                </ShapeButton>
              ))}
            </ShapeButtonsContainer>
          </ControlsGroup>
        </ControlsCard>

        <PreviewArea>
          <PreviewContainer $previewColor={color}>
            <NeumorphicBox style={neuStyle}></NeumorphicBox>
          </PreviewContainer>

          <CodeCard>
            <CodeHeader>
              <SectionTitle>Código CSS</SectionTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </CodeHeader>
            <CodeBlock>{cssCode}</CodeBlock>
          </CodeCard>
        </PreviewArea>
      </GridContainer>
    </Container>
  );
};

export default NeumorphismGenerator;
