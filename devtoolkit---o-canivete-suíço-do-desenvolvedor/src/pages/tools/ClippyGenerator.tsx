import React, { useState, useRef, useEffect } from "react";
import {
  Copy,
  Check,
  RefreshCw,
  Layers,
  Image as ImageIcon,
  HelpCircle,
  Info,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  TitleContainer,
  Title,
  Description,
  Controls,
  GridLayout,
  Sidebar,
  SidebarHeader,
  SectionTitle,
  GridList,
  PresetButton,
  PresetIcon,
  TooltipContent,
  PresetTooltipArrow,
  EditorArea,
  CanvasContainer,
  CanvasBackground,
  CanvasInteractive,
  SvgLayer,
  OutputArea,
  CodeBlock,
  CopyButton,
  CodeContent,
  PointsList,
  PointItem,
} from "./styles/ClippyGenerator.styles";

interface Point {
  x: number;
  y: number;
}

interface Shape {
  name: string;
  points: Point[];
  description: string;
}

const PRESETS: Shape[] = [
  {
    name: "Triângulo",
    points: [
      { x: 50, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
    ],
    description:
      "Um polígono simples de três lados, ideal para setas ou indicadores de direção.",
  },
  {
    name: "Trapézio",
    points: [
      { x: 20, y: 0 },
      { x: 80, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
    description:
      "Um quadrilátero com um par de lados paralelos. Ótimo para abas de navegação.",
  },
  {
    name: "Paralelogramo",
    points: [
      { x: 25, y: 0 },
      { x: 100, y: 0 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
    ],
    description:
      "Um quadrilátero com dois pares de lados paralelos, criando um efeito de inclinação dinâmico.",
  },
  {
    name: "Losango",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
    description:
      "Uma forma de diamante equilibrada, perfeita para selos ou destaques visuais.",
  },
  {
    name: "Pentágono",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 38 },
      { x: 82, y: 100 },
      { x: 18, y: 100 },
      { x: 0, y: 38 },
    ],
    description:
      "Polígono de cinco lados que oferece uma estética moderna e geométrica.",
  },
  {
    name: "Hexágono",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 25 },
      { x: 100, y: 75 },
      { x: 50, y: 100 },
      { x: 0, y: 75 },
      { x: 0, y: 25 },
    ],
    description:
      "A forma da colmeia, excelente para layouts modulares e grids criativos.",
  },
  {
    name: "Heptágono",
    points: [
      { x: 50, y: 0 },
      { x: 90, y: 20 },
      { x: 100, y: 60 },
      { x: 75, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 60 },
      { x: 10, y: 20 },
    ],
    description:
      "Um polígono de sete lados menos comum, garantindo um visual único ao elemento.",
  },
  {
    name: "Octógono",
    points: [
      { x: 30, y: 0 },
      { x: 70, y: 0 },
      { x: 100, y: 30 },
      { x: 100, y: 70 },
      { x: 70, y: 100 },
      { x: 30, y: 100 },
      { x: 0, y: 70 },
      { x: 0, y: 30 },
    ],
    description:
      "Forma clássica de sinalização, útil para botões de parada ou containers robustos.",
  },
  {
    name: "Seta Direita",
    points: [
      { x: 0, y: 20 },
      { x: 60, y: 20 },
      { x: 60, y: 0 },
      { x: 100, y: 50 },
      { x: 60, y: 100 },
      { x: 60, y: 80 },
      { x: 0, y: 80 },
    ],
    description:
      "Seta clássica apontando para a direita, ideal para botões de próximo ou links.",
  },
  {
    name: "Seta Esquerda",
    points: [
      { x: 40, y: 0 },
      { x: 40, y: 20 },
      { x: 100, y: 20 },
      { x: 100, y: 80 },
      { x: 40, y: 80 },
      { x: 40, y: 100 },
      { x: 0, y: 50 },
    ],
    description:
      "Seta clássica apontando para a esquerda, perfeita para navegação de retorno.",
  },
  {
    name: "Chevron",
    points: [
      { x: 75, y: 0 },
      { x: 100, y: 50 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
      { x: 25, y: 50 },
      { x: 0, y: 0 },
    ],
    description:
      "Forma de chevron ou espinha de peixe, dinâmica para indicadores de fluxo.",
  },
  {
    name: "Estrela 5",
    points: [
      { x: 50, y: 0 },
      { x: 61, y: 35 },
      { x: 98, y: 35 },
      { x: 68, y: 57 },
      { x: 79, y: 91 },
      { x: 50, y: 70 },
      { x: 21, y: 91 },
      { x: 32, y: 57 },
      { x: 2, y: 35 },
      { x: 39, y: 35 },
    ],
    description:
      "Estrela de cinco pontas clássica. Ideal para ícones de favoritos ou avaliações.",
  },
  {
    name: "Estrela 8",
    points: [
      { x: 50, y: 0 },
      { x: 61, y: 39 },
      { x: 100, y: 50 },
      { x: 61, y: 61 },
      { x: 50, y: 100 },
      { x: 39, y: 61 },
      { x: 0, y: 50 },
      { x: 39, y: 39 },
    ],
    description:
      "Estrela de oito pontas, garantindo um visual de destaque e brilho.",
  },
  {
    name: "Cruz",
    points: [
      { x: 10, y: 25 },
      { x: 35, y: 25 },
      { x: 35, y: 0 },
      { x: 65, y: 0 },
      { x: 65, y: 25 },
      { x: 90, y: 25 },
      { x: 90, y: 50 },
      { x: 65, y: 50 },
      { x: 65, y: 100 },
      { x: 35, y: 100 },
      { x: 35, y: 50 },
      { x: 10, y: 50 },
    ],
    description:
      "Símbolo universal de adição ou cruz, útil para interfaces médicas ou botões de novo item.",
  },
  {
    name: "Mensagem",
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 75 },
      { x: 75, y: 75 },
      { x: 75, y: 100 },
      { x: 50, y: 75 },
      { x: 0, y: 75 },
    ],
    description:
      "Formato de balão de fala com cauda centralizada. Perfeito para tooltips ou chat.",
  },
  {
    name: "Balão Canto",
    points: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 75 },
      { x: 25, y: 75 },
      { x: 0, y: 100 },
    ],
    description:
      "Balão de fala com ponta direcionada para o canto inferior esquerdo.",
  },
  {
    name: "Chanfro",
    points: [
      { x: 20, y: 0 },
      { x: 80, y: 0 },
      { x: 100, y: 20 },
      { x: 100, y: 80 },
      { x: 80, y: 100 },
      { x: 20, y: 100 },
      { x: 0, y: 80 },
      { x: 0, y: 20 },
    ],
    description:
      "Bordas cortadas em 45 graus, criando uma estética de design industrial ou futurista.",
  },
  {
    name: "Tag Preço",
    points: [
      { x: 25, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 25, y: 100 },
      { x: 0, y: 50 },
    ],
    description:
      "Formato clássico de etiqueta ou tag, excelente para e-commerce e promoções.",
  },
  {
    name: "Moldura",
    points: [
      { x: 0, y: 0 },
      { x: 0, y: 100 },
      { x: 25, y: 100 },
      { x: 25, y: 25 },
      { x: 75, y: 25 },
      { x: 75, y: 75 },
      { x: 25, y: 75 },
      { x: 25, y: 100 },
      { x: 100, y: 100 },
      { x: 100, y: 0 },
    ],
    description:
      "Cria uma moldura vazada, permitindo efeitos de overlay interessantes.",
  },
];

const ClippyGenerator: React.FC = () => {
  const [points, setPoints] = useState<Point[]>(PRESETS[0].points);
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const clipPathString = `polygon(${points.map((p) => `${p.x}% ${p.y}%`).join(", ")})`;

  const handleMouseDown = (idx: number) => {
    setDraggingIdx(idx);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (draggingIdx === null || !svgRef.current) return;

    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.round(
      Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)),
    );
    const y = Math.round(
      Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)),
    );

    const newPoints = [...points];
    newPoints[draggingIdx] = { x, y };
    setPoints(newPoints);
  };

  const handleMouseUp = () => {
    setDraggingIdx(null);
  };

  useEffect(() => {
    if (draggingIdx !== null) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchend", handleMouseUp);
      return () => {
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [draggingIdx]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`clip-path: ${clipPathString};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <TitleContainer>
          <Title>Clippy - CSS clip-path</Title>
          <Description>
            Crie formas complexas usando a propriedade clip-path com polígonos.
          </Description>
        </TitleContainer>
        <Controls>
          <Button variant="outline" onClick={() => setShowImage(!showImage)}>
            <ImageIcon size={16} className="mr-2" />{" "}
            {showImage ? "Cor Sólida" : "Imagem de Fundo"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setPoints(PRESETS[0].points)}
          >
            <RefreshCw size={16} className="mr-2" /> Reset
          </Button>
        </Controls>
      </Header>

      <GridLayout>
        {/* Presets Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <SectionTitle>Presets</SectionTitle>
            <Info size={14} className="text-slate-600" />
          </SidebarHeader>
          <GridList>
            {PRESETS.map((shape) => (
              <div key={shape.name} style={{ position: "relative" }}>
                <PresetButton onClick={() => setPoints(shape.points)}>
                  <PresetIcon
                    style={{
                      clipPath: `polygon(${shape.points.map((p) => `${p.x}% ${p.y}%`).join(", ")})`,
                    }}
                  ></PresetIcon>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {shape.name}
                  </span>

                  {/* Custom Tooltip */}
                  <TooltipContent>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "2rem",
                          height: "2rem",
                          background: "rgba(37, 99, 235, 0.4)",
                          borderRadius: "0.25rem",
                          clipPath: `polygon(${shape.points.map((p) => `${p.x}% ${p.y}%`).join(", ")})`,
                        }}
                      ></div>
                      <p
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#fff",
                          textTransform: "uppercase",
                        }}
                      >
                        {shape.name}
                      </p>
                    </div>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        color: "#cbd5e1",
                        lineHeight: 1.6,
                      }}
                    >
                      {shape.description}
                    </p>
                    <PresetTooltipArrow />
                  </TooltipContent>
                </PresetButton>
              </div>
            ))}
          </GridList>
        </Sidebar>

        {/* Editor Area */}
        <EditorArea>
          <CanvasContainer>
            <CanvasBackground />

            <CanvasInteractive
              $showImage={showImage}
              $clipPath={clipPathString}
            />

            {/* Interaction Layer */}
            <SvgLayer
              ref={svgRef}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
            >
              <polygon
                points={points.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="rgba(59, 130, 246, 0.2)"
                stroke="#3b82f6"
                strokeWidth="0.5"
              />
              {points.map((p, idx) => (
                <g
                  key={idx}
                  onMouseEnter={() => setHoveredPointIdx(idx)}
                  onMouseLeave={() => setHoveredPointIdx(null)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={draggingIdx === idx ? "4" : "2.5"}
                    fill={draggingIdx === idx ? "#3b82f6" : "#ffffff"}
                    stroke="#2563eb"
                    strokeWidth="0.8"
                    onMouseDown={() => handleMouseDown(idx)}
                    onTouchStart={() => handleMouseDown(idx)}
                    style={{ transition: "r 0.2s, fill 0.2s" }}
                  />
                  {/* Coordinate Tooltip */}
                  {(hoveredPointIdx === idx || draggingIdx === idx) && (
                    <g transform={`translate(${p.x}, ${p.y - 8})`}>
                      <rect
                        x="-12"
                        y="-8"
                        width="24"
                        height="10"
                        rx="2"
                        fill="rgba(15, 23, 42, 0.9)"
                        stroke="#334155"
                        strokeWidth="0.2"
                      />
                      <text
                        textAnchor="middle"
                        fontSize="4"
                        fill="#60a5fa"
                        fontWeight="bold"
                        pointerEvents="none"
                        y="-1.5"
                      >
                        {p.x}%, {p.y}%
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </SvgLayer>

            <div
              style={{
                position: "absolute",
                bottom: "1rem",
                left: "1rem",
                backgroundColor: "rgba(2, 6, 23, 0.8)",
                backdropFilter: "blur(4px)",
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                color: "#94a3b8",
                border: "1px solid #334155",
                pointerEvents: "none",
              }}
            >
              Canvas Interativo
            </div>
          </CanvasContainer>
        </EditorArea>

        {/* Output Area */}
        <OutputArea>
          <CodeBlock>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <SectionTitle>Código CSS</SectionTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </div>
            <div className="relative group">
              <CodeContent>clip-path: {clipPathString};</CodeContent>
            </div>
          </CodeBlock>

          <PointsList>
            <SectionTitle style={{ marginBottom: "1rem" }}>Pontos</SectionTitle>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                paddingRight: "0.5rem",
              }}
            >
              {points.map((p, idx) => (
                <PointItem key={idx}>
                  <span style={{ fontWeight: 700, color: "#64748b" }}>
                    #{idx + 1}
                  </span>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <span style={{ color: "#cbd5e1" }}>
                      X: <span style={{ color: "#60a5fa" }}>{p.x}%</span>
                    </span>
                    <span style={{ color: "#cbd5e1" }}>
                      Y: <span style={{ color: "#60a5fa" }}>{p.y}%</span>
                    </span>
                  </div>
                </PointItem>
              ))}
            </div>
          </PointsList>
        </OutputArea>
      </GridLayout>
    </Container>
  );
};

export default ClippyGenerator;
