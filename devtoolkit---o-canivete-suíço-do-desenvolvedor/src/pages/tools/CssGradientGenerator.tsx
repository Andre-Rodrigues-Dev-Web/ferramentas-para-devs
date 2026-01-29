import React, { useState, useRef } from "react";
import {
  Copy,
  RefreshCw,
  Check,
  Plus,
  Trash2,
  Move,
  FileCode,
  Box,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  Title,
  Description,
  Grid,
  ControlPanel,
  SectionLabel,
  ToggleGroup,
  ToggleButton,
  SettingsCard,
  SettingsHeader,
  AngleLabels,
  ShapeGrid,
  PositionContainer,
  PresetsGrid,
  RangeInput,
  Select,
  VisualPicker,
  PickerHandle,
  StopsHeader,
  AddStopButton,
  StopList,
  StopItem,
  ColorInput,
  StopControls,
  StopLabel,
  RemoveStopButton,
  PreviewColumn,
  PreviewBox,
  PreviewGradient,
  LiveBadge,
  CodeBlock,
  CodeHeader,
  CopyCodeButton,
  CodePre,
  PresetButton,
} from "./styles/CssGradientGenerator.styles";
import { ColorStop } from "./CssGradientGenerator.types";

const CssGradientGenerator: React.FC = () => {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(90);

  // Radial specific state
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">(
    "circle",
  );
  const [radialSize, setRadialSize] = useState("farthest-corner");
  const [radialPosX, setRadialPosX] = useState(50);
  const [radialPosY, setRadialPosY] = useState(50);

  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#3b82f6", position: 0 },
    { id: "2", color: "#ef4444", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);
  const [exportMode, setExportMode] = useState<"property" | "class">(
    "property",
  );

  const pickerRef = useRef<HTMLDivElement>(null);

  const sortedStops = [...stops].sort((a, b) => a.position - b.position);
  const stopsString = sortedStops
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(", ");

  const gradientValue =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stopsString})`
      : `radial-gradient(${radialShape} ${radialSize} at ${radialPosX}% ${radialPosY}%, ${stopsString})`;

  const fullCssCode = `.gradient-preview {
  width: 100%;
  height: 300px;
  border-radius: 16px;
  background: ${gradientValue};
}`;

  const currentCode =
    exportMode === "property" ? `background: ${gradientValue};` : fullCssCode;

  const reset = () => {
    setType("linear");
    setAngle(90);
    setRadialShape("circle");
    setRadialSize("farthest-corner");
    setRadialPosX(50);
    setRadialPosY(50);
    setStops([
      { id: "1", color: "#3b82f6", position: 0 },
      { id: "2", color: "#ef4444", position: 100 },
    ]);
  };

  const addStop = () => {
    if (stops.length >= 6) return;
    const newId = Math.random().toString(36).substr(2, 9);
    setStops([...stops, { id: newId, color: "#ffffff", position: 50 }]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((s) => s.id !== id));
  };

  const updateStop = (id: string, updates: Partial<ColorStop>) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const handlePositionPick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!pickerRef.current) return;
    const rect = pickerRef.current.getBoundingClientRect();
    const clientX =
      "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY =
      "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const x = Math.max(
      0,
      Math.min(100, ((clientX - rect.left) / rect.width) * 100),
    );
    const y = Math.max(
      0,
      Math.min(100, ((clientY - rect.top) / rect.height) * 100),
    );

    setRadialPosX(Math.round(x));
    setRadialPosY(Math.round(y));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = [
    { label: "TL", x: 0, y: 0 },
    { label: "T", x: 50, y: 0 },
    { label: "TR", x: 100, y: 0 },
    { label: "L", x: 0, y: 50 },
    { label: "C", x: 50, y: 50 },
    { label: "R", x: 100, y: 50 },
    { label: "BL", x: 0, y: 100 },
    { label: "B", x: 50, y: 100 },
    { label: "BR", x: 100, y: 100 },
  ];

  const radialSizeOptions = [
    { value: "closest-side", label: "Closest Side" },
    { value: "farthest-side", label: "Farthest Side" },
    { value: "closest-corner", label: "Closest Corner" },
    { value: "farthest-corner", label: "Farthest Corner" },
  ];

  return (
    <Container>
      <Header>
        <div>
          <Title>CSS Gradient Generator</Title>
          <Description>
            Crie gradientes incríveis e exporte o código CSS pronto para uso.
          </Description>
        </div>
        <Button variant="outline" onClick={reset}>
          <RefreshCw size={16} style={{ marginRight: "0.5rem" }} /> Reset
        </Button>
      </Header>

      <Grid>
        <ControlPanel>
          <div>
            <SectionLabel>Tipo de Gradiente</SectionLabel>
            <ToggleGroup>
              <ToggleButton
                $active={type === "linear"}
                onClick={() => setType("linear")}
              >
                Linear
              </ToggleButton>
              <ToggleButton
                $active={type === "radial"}
                onClick={() => setType("radial")}
              >
                Radial
              </ToggleButton>
            </ToggleGroup>
          </div>

          {type === "linear" ? (
            <SettingsCard>
              <SettingsHeader>
                <span>Ângulo</span>
                <span>{angle}°</span>
              </SettingsHeader>
              <RangeInput
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={(e) => setAngle(parseInt(e.target.value))}
              />
              <AngleLabels>
                <span>0°</span>
                <span>90°</span>
                <span>180°</span>
                <span>270°</span>
                <span>360°</span>
              </AngleLabels>
            </SettingsCard>
          ) : (
            <SettingsCard>
              <ShapeGrid>
                <div>
                  <SectionLabel>Shape</SectionLabel>
                  <Select
                    value={radialShape}
                    onChange={(e) => setRadialShape(e.target.value as any)}
                  >
                    <option value="circle">Círculo</option>
                    <option value="ellipse">Elipse</option>
                  </Select>
                </div>
                <div>
                  <SectionLabel>Extent Size</SectionLabel>
                  <Select
                    value={radialSize}
                    onChange={(e) => setRadialSize(e.target.value)}
                  >
                    {radialSizeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>
              </ShapeGrid>

              <div>
                <SectionLabel>Position (at X Y)</SectionLabel>
                <PositionContainer>
                  <VisualPicker
                    ref={pickerRef}
                    onMouseDown={handlePositionPick}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage:
                          "radial-gradient(circle, white 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                        pointerEvents: "none",
                      }}
                    ></div>
                    <PickerHandle
                      style={{ left: `${radialPosX}%`, top: `${radialPosY}%` }}
                    >
                      <Move size={12} color="white" />
                    </PickerHandle>
                  </VisualPicker>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                  >
                    <PresetsGrid>
                      {presets.map((p) => (
                        <PresetButton
                          key={p.label}
                          onClick={() => {
                            setRadialPosX(p.x);
                            setRadialPosY(p.y);
                          }}
                          $active={radialPosX === p.x && radialPosY === p.y}
                        >
                          {p.label}
                        </PresetButton>
                      ))}
                    </PresetsGrid>
                  </div>
                </PositionContainer>
              </div>
            </SettingsCard>
          )}

          <div>
            <StopsHeader>
              <SectionLabel style={{ margin: 0 }}>Color Stops</SectionLabel>
              <AddStopButton onClick={addStop} disabled={stops.length >= 6}>
                <Plus size={14} /> Adicionar
              </AddStopButton>
            </StopsHeader>

            <StopList>
              {stops.map((stop) => (
                <StopItem key={stop.id}>
                  <ColorInput
                    type="color"
                    value={stop.color}
                    onChange={(e) =>
                      updateStop(stop.id, { color: e.target.value })
                    }
                  />
                  <StopControls>
                    <StopLabel>
                      <span>Position</span>
                      <span>{stop.position}%</span>
                    </StopLabel>
                    <RangeInput
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) =>
                        updateStop(stop.id, {
                          position: parseInt(e.target.value),
                        })
                      }
                    />
                  </StopControls>
                  <RemoveStopButton onClick={() => removeStop(stop.id)}>
                    <Trash2 size={16} />
                  </RemoveStopButton>
                </StopItem>
              ))}
            </StopList>
          </div>
        </ControlPanel>

        <PreviewColumn>
          <PreviewBox>
            <PreviewGradient $gradient={gradientValue} />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(2, 6, 23, 0.1)",
                pointerEvents: "none",
              }}
            ></div>
            <LiveBadge>Real-time Preview</LiveBadge>
          </PreviewBox>

          <CodeBlock>
            <CodeHeader>
              <ToggleGroup>
                <ToggleButton
                  $active={exportMode === "property"}
                  onClick={() => setExportMode("property")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FileCode size={14} /> Propriedade
                </ToggleButton>
                <ToggleButton
                  $active={exportMode === "class"}
                  onClick={() => setExportMode("class")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Box size={14} /> Classe CSS
                </ToggleButton>
              </ToggleGroup>

              <CopyCodeButton onClick={copyToClipboard}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyCodeButton>
            </CodeHeader>

            <CodePre>
              {exportMode === "property" ? (
                <>
                  <span style={{ color: "#64748b" }}>background:</span>{" "}
                  {gradientValue};
                </>
              ) : (
                <>
                  <span style={{ color: "#c084fc" }}>.gradient-preview</span>{" "}
                  {"{\n"}
                  {"  "}
                  <span style={{ color: "#64748b" }}>width:</span>{" "}
                  <span style={{ color: "#bfdbfe" }}>100%</span>;{"\n"}
                  {"  "}
                  <span style={{ color: "#64748b" }}>height:</span>{" "}
                  <span style={{ color: "#bfdbfe" }}>300px</span>;{"\n"}
                  {"  "}
                  <span style={{ color: "#64748b" }}>border-radius:</span>{" "}
                  <span style={{ color: "#bfdbfe" }}>16px</span>;{"\n"}
                  {"  "}
                  <span style={{ color: "#64748b" }}>background:</span>{" "}
                  {gradientValue};{"\n"}
                  {"}"}
                </>
              )}
            </CodePre>
          </CodeBlock>
        </PreviewColumn>
      </Grid>
    </Container>
  );
};

export default CssGradientGenerator;
