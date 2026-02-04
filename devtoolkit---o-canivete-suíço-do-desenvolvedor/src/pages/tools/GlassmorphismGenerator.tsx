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
  ControlGroup,
  ControlHeader,
  ControlLabel,
  ControlValue,
  RangeInput,
  ColorInput,
  PreviewArea,
  PreviewBackgroundContainer,
  BackgroundBlob,
  PreviewBoxContainer,
  GlassBox,
  GlassDecoration,
  CodeCard,
  CodeHeader,
  SectionTitle,
  CopyButton,
  CodeBlock,
} from "./styles/GlassmorphismGenerator.styles";

const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [color, setColor] = useState("#ffffff");
  const [borderOpacity, setBorderOpacity] = useState(0.1);
  const [saturation, setSaturation] = useState(100);
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const glassStyle: React.CSSProperties = {
    background: `rgba(${hexToRgb(color)}, ${transparency})`,
    backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
    border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
    borderRadius: "24px",
  };

  const cssCode = `background: rgba(${hexToRgb(color)}, ${transparency});
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
border-radius: 24px;`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <Title>Glassmorphism Generator</Title>
        <Description>
          Crie efeitos de vidro fosco elegantes com filtros de backdrop.
        </Description>
      </Header>

      <GridContainer>
        <ControlsCard>
          <ControlGroup>
            <ControlHeader>
              <ControlLabel>Blur</ControlLabel>
              <ControlValue>{blur}px</ControlValue>
            </ControlHeader>
            <RangeInput
              type="range"
              min="0"
              max="40"
              value={blur}
              onChange={(e) => setBlur(parseInt(e.target.value))}
            />
          </ControlGroup>

          <ControlGroup>
            <ControlHeader>
              <ControlLabel>Transparência</ControlLabel>
              <ControlValue>{transparency}</ControlValue>
            </ControlHeader>
            <RangeInput
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={transparency}
              onChange={(e) => setTransparency(parseFloat(e.target.value))}
            />
          </ControlGroup>

          <ControlGroup>
            <ControlHeader>
              <ControlLabel>Saturação</ControlLabel>
              <ControlValue>{saturation}%</ControlValue>
            </ControlHeader>
            <RangeInput
              type="range"
              min="0"
              max="200"
              value={saturation}
              onChange={(e) => setSaturation(parseInt(e.target.value))}
            />
          </ControlGroup>

          <ControlGroup>
            <ControlHeader>
              <ControlLabel>Opacidade da Borda</ControlLabel>
              <ControlValue>{borderOpacity}</ControlValue>
            </ControlHeader>
            <RangeInput
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={borderOpacity}
              onChange={(e) => setBorderOpacity(parseFloat(e.target.value))}
            />
          </ControlGroup>

          <ControlGroup>
            <ControlLabel style={{ fontSize: "0.875rem" }}>
              Cor Principal
            </ControlLabel>
            <ColorInput
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </ControlGroup>
        </ControlsCard>

        <PreviewArea>
          <PreviewBackgroundContainer>
            {/* Background for preview */}
            <div>
              <BackgroundBlob
                $color="#2563eb"
                $position="top: -10%; left: -10%; opacity: 0.4;"
              />
              <BackgroundBlob
                $color="#9333ea"
                $position="bottom: -10%; right: -10%; opacity: 0.4; animation-delay: 2s;"
              />
            </div>

            <PreviewBoxContainer>
              <GlassBox style={glassStyle}>
                <GlassDecoration $width="12" $opacity={0.2} />
                <GlassDecoration $width="4" $opacity={0.2} />
                <GlassDecoration $width="3/4" $opacity={0.1} />
              </GlassBox>
            </PreviewBoxContainer>
          </PreviewBackgroundContainer>

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

export default GlassmorphismGenerator;
