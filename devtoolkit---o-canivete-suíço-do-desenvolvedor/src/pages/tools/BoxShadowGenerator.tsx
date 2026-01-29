import React, { useState } from "react";
import { Copy, RefreshCw, Check } from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderControls,
  Title,
  Description,
  GridContainer,
  ControlsCard,
  ControlsGroup,
  ColorControl,
  ColorInputGroup,
  ColorLabel,
  ColorInput,
  CheckboxGroup,
  CheckboxLabel,
  CheckboxInput,
  PreviewArea,
  PreviewBoxContainer,
  ShadowElement,
  CodeCard,
  CodeHeader,
  SectionTitle,
  CopyButton,
  CodeBlock,
  SliderContainer,
  SliderHeader,
  SliderLabel,
  SliderValue,
  RangeInput,
} from "./styles/BoxShadowGenerator.styles";

const BoxShadowGenerator: React.FC = () => {
  const [config, setConfig] = useState({
    x: 10,
    y: 10,
    blur: 20,
    spread: 0,
    opacity: 0.2,
    color: "#000000",
    inset: false,
  });
  const [copied, setCopied] = useState(false);

  const boxShadow = `${config.inset ? "inset " : ""}${config.x}px ${config.y}px ${config.blur}px ${config.spread}px ${hexToRgba(config.color, config.opacity)}`;

  function hexToRgba(hex: string, opacity: number) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadow};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <HeaderControls>
          <div>
            <Title>Box Shadow Generator</Title>
            <Description>
              Gere sombras personalizadas com preview em tempo real.
            </Description>
          </div>
          <Button
            variant="outline"
            onClick={() =>
              setConfig({
                x: 10,
                y: 10,
                blur: 20,
                spread: 0,
                opacity: 0.2,
                color: "#000000",
                inset: false,
              })
            }
          >
            <RefreshCw size={16} style={{ marginRight: "0.5rem" }} /> Reset
          </Button>
        </HeaderControls>
      </Header>

      <GridContainer>
        <ControlsCard>
          <ControlsGroup>
            <Slider
              label="Eixo X"
              value={config.x}
              min={-100}
              max={100}
              onChange={(v) => setConfig({ ...config, x: v })}
            />
            <Slider
              label="Eixo Y"
              value={config.y}
              min={-100}
              max={100}
              onChange={(v) => setConfig({ ...config, y: v })}
            />
            <Slider
              label="Blur"
              value={config.blur}
              min={0}
              max={100}
              onChange={(v) => setConfig({ ...config, blur: v })}
            />
            <Slider
              label="Spread"
              value={config.spread}
              min={-100}
              max={100}
              onChange={(v) => setConfig({ ...config, spread: v })}
            />
            <Slider
              label="Opacidade"
              value={config.opacity}
              min={0}
              max={1}
              step={0.01}
              onChange={(v) => setConfig({ ...config, opacity: v })}
            />

            <ColorControl>
              <ColorInputGroup>
                <ColorLabel>Cor da Sombra</ColorLabel>
                <ColorInput
                  type="color"
                  value={config.color}
                  onChange={(e) =>
                    setConfig({ ...config, color: e.target.value })
                  }
                />
              </ColorInputGroup>
              <CheckboxGroup>
                <CheckboxLabel>
                  <CheckboxInput
                    type="checkbox"
                    checked={config.inset}
                    onChange={(e) =>
                      setConfig({ ...config, inset: e.target.checked })
                    }
                  />
                  Sombra Interna (Inset)
                </CheckboxLabel>
              </CheckboxGroup>
            </ColorControl>
          </ControlsGroup>
        </ControlsCard>

        <PreviewArea>
          <PreviewBoxContainer>
            <ShadowElement style={{ boxShadow }} />
          </PreviewBoxContainer>

          <CodeCard>
            <CodeHeader>
              <SectionTitle>Código CSS</SectionTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </CodeHeader>
            <CodeBlock>box-shadow: {boxShadow};</CodeBlock>
          </CodeCard>
        </PreviewArea>
      </GridContainer>
    </Container>
  );
};

const Slider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, onChange }) => (
  <SliderContainer>
    <SliderHeader>
      <SliderLabel>{label}</SliderLabel>
      <SliderValue>{value}</SliderValue>
    </SliderHeader>
    <RangeInput
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  </SliderContainer>
);

export default BoxShadowGenerator;
