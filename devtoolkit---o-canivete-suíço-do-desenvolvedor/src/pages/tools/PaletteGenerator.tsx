import React, { useState, useEffect, useCallback } from "react";
import {
  Paintbrush,
  RefreshCw,
  Lock,
  Unlock,
  Copy,
  Check,
  Download,
  Share2,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import {
  Container,
  Header,
  HeaderLeft,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Kbd,
  Actions,
  PaletteContainer,
  ColorColumn,
  ColorContent,
  LockButton,
  HexButton,
  CopyHint,
  ColorActions,
  CopiedTooltip,
  Footer,
  LegendItem,
  LegendDot,
} from "./styles/PaletteGenerator.styles";

interface ColorItem {
  id: string;
  hex: string;
  isLocked: boolean;
}

const generateRandomHex = () => {
  const chars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += chars[Math.floor(Math.random() * 16)];
  }
  return color;
};

const PaletteGenerator: React.FC = () => {
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generatePalette = useCallback((forceAll = false) => {
    setColors((prev) => {
      if (prev.length === 0 || forceAll) {
        return Array.from({ length: 5 }, () => ({
          id: Math.random().toString(36).substr(2, 9),
          hex: generateRandomHex(),
          isLocked: false,
        }));
      }
      return prev.map((c) =>
        c.isLocked ? c : { ...c, hex: generateRandomHex() },
      );
    });
  }, []);

  useEffect(() => {
    generatePalette(true);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        generatePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generatePalette]);

  const toggleLock = (id: string) => {
    setColors((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isLocked: !c.isLocked } : c)),
    );
  };

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const getBrightness = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000;
  };

  return (
    <Container>
      <Header>
        <HeaderLeft>
          <IconWrapper>
            <Paintbrush size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Gerador de Paletas</Title>
            <Description>
              Pressione <Kbd>Espaço</Kbd> para gerar novas cores.
            </Description>
          </TitleContainer>
        </HeaderLeft>
        <Actions>
          <Button variant="outline" onClick={() => generatePalette(true)}>
            <RefreshCw size={16} style={{ marginRight: "0.5rem" }} /> Nova
            Paleta
          </Button>
          <Button>
            <Download size={16} style={{ marginRight: "0.5rem" }} /> Exportar
          </Button>
        </Actions>
      </Header>

      <PaletteContainer>
        {colors.map((color) => {
          const brightness = getBrightness(color.hex);
          const isDark = brightness < 128;
          const iconColor = isDark
            ? "rgba(255,255,255,0.4)"
            : "rgba(0,0,0,0.3)";
          const activeIconColor = isDark ? "white" : "black";

          return (
            <ColorColumn key={color.id} $hex={color.hex}>
              <ColorContent $isDark={isDark}>
                <LockButton
                  onClick={() => toggleLock(color.id)}
                  $isLocked={color.isLocked}
                  $isDark={isDark}
                >
                  {color.isLocked ? <Lock size={28} /> : <Unlock size={28} />}
                </LockButton>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <HexButton onClick={() => copyColor(color.hex)}>
                    {color.hex}
                  </HexButton>
                  <CopyHint>Clique para Copiar</CopyHint>
                </div>

                <ColorActions $iconColor={iconColor}>
                  <button onClick={() => {}}>
                    <Share2 size={20} />
                  </button>
                  <button onClick={() => copyColor(color.hex)}>
                    {copiedHex === color.hex ? (
                      <Check size={20} style={{ color: "#4ade80" }} />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </ColorActions>
              </ColorContent>

              {/* Feedback de cópia individual */}
              {copiedHex === color.hex && (
                <CopiedTooltip>Copiado!</CopiedTooltip>
              )}
            </ColorColumn>
          );
        })}
      </PaletteContainer>

      <Footer>
        <LegendItem>
          <LegendDot />
          <span>Auto-ajuste de contraste</span>
        </LegendItem>
        <LegendItem>
          <Lock size={12} />
          <span>Trave cores que você gostou</span>
        </LegendItem>
      </Footer>
    </Container>
  );
};

export default PaletteGenerator;
