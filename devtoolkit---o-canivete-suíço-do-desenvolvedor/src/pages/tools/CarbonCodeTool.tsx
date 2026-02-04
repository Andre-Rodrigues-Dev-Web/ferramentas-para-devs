import React, { useState, useMemo, useRef } from "react";
import {
  Camera,
  Download,
  Trash2,
  Check,
  Copy,
  Loader2,
  Sparkles,
  Wrench,
  Type,
  Terminal,
  Code2,
  Cpu,
  Globe,
  Zap,
  Package,
  Heart,
  Flame,
  Command,
  Maximize,
  ShieldCheck,
  Hash,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { toPng, toBlob } from "html-to-image";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  ToolTitleWrapper,
  ToolTitle,
  ToolDescription,
  ActionButtons,
  MainGrid,
  Sidebar,
  SettingsCard,
  SettingsGroup,
  SettingRow,
  SettingItem,
  Label,
  Select,
  RangeWrapper,
  RangeHeader,
  RangeValue,
  RangeInput,
  BackgroundGrid,
  ColorButton,
  BrandingSection,
  TogglesList,
  Input,
  IconsGrid,
  IconButton,
  TipCard,
  TipIconWrapper,
  TipContent,
  TipTitle,
  TipText,
  CanvasArea,
  CodeEditorCard,
  CardHeader,
  CardLabel,
  CardBadge,
  TextArea,
  PreviewContainer,
  PreviewPattern,
  LiveCanvas,
  CodeWindow,
  WindowControls,
  ControlDot,
  LanguageBadge,
  CodeContent,
  LineNumbers,
  Pre,
  CodeBlock,
  Watermark,
  WatermarkIcon,
  WatermarkText,
  LiveViewBadge,
  BadgeContent,
  BadgeText,
  TipsGrid,
  SmallTip,
  SmallTipIcon,
  SmallTipText,
  ToggleLabel,
  ToggleText,
  ToggleSwitch,
  ToggleKnob,
} from "./styles/CarbonCodeTool.styles";

interface CarbonSettings {
  language: string;
  theme: string;
  padding: number;
  borderRadius: number;
  showControls: boolean;
  showLineNumbers: boolean;
  showLogo: boolean;
  logoText: string;
  logoIcon: string;
  background: string;
  shadowIntensity: number;
  fontSize: number;
}

const LANGUAGES = [
  "JavaScript",
  "TypeScript",
  "CSS",
  "HTML",
  "Python",
  "React JSX",
];

const THEMES = [
  { name: "Dracula", bg: "#282a36", text: "#f8f8f2" },
  { name: "Night Owl", bg: "#011627", text: "#d6deeb" },
  { name: "One Dark", bg: "#282c34", text: "#abb2bf" },
  { name: "Monokai", bg: "#272822", text: "#f8f8f2" },
  { name: "GitHub Dark", bg: "#0d1117", text: "#c9d1d9" },
  { name: "Synthwave", bg: "#262335", text: "#ffffff" },
];

const BACKGROUNDS = [
  {
    name: "Indigo Mist",
    style: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    name: "Ocean Blue",
    style: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
  },
  {
    name: "Cyber Sunset",
    style: "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
  },
  {
    name: "Deep Space",
    style: "linear-gradient(to right, #434343 0%, #000000 100%)",
  },
  {
    name: "Lush Green",
    style: "linear-gradient(to top, #0ba360 0%, #3cba92 100%)",
  },
  { name: "Pure White", style: "#ffffff" },
  { name: "Slate Dark", style: "#0f172a" },
];

const WATERMARK_ICONS = [
  { id: "Wrench", component: Wrench },
  { id: "Terminal", component: Terminal },
  { id: "Code2", component: Code2 },
  { id: "Cpu", component: Cpu },
  { id: "Globe", component: Globe },
  { id: "Zap", component: Zap },
  { id: "Package", component: Package },
  { id: "Heart", component: Heart },
  { id: "Flame", component: Flame },
  { id: "Command", component: Command },
];

const DEFAULT_CODE = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

// Transformando código em arte
const carbon = {
  isBeautiful: true,
  theme: 'Dark Mode',
  padding: 40
};

greet('Dev');`;

const CarbonCodeTool: React.FC = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [settings, setSettings] = useState<CarbonSettings>({
    language: "JavaScript",
    theme: "Night Owl",
    padding: 48,
    borderRadius: 16,
    showControls: true,
    showLineNumbers: true,
    showLogo: true,
    logoText: "DevToolkit",
    logoIcon: "Wrench",
    background: BACKGROUNDS[0].style,
    shadowIntensity: 40,
    fontSize: 14,
  });

  const [isExporting, setIsExporting] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  const exportRef = useRef<HTMLDivElement>(null);

  const activeTheme = useMemo(
    () => THEMES.find((t) => t.name === settings.theme) || THEMES[1],
    [settings.theme],
  );

  const codeLines = useMemo(() => code.split("\n"), [code]);

  const highlightedCode = useMemo(() => {
    return codeLines.map((line) => {
      let html = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      html = html.replace(
        /(['"`][^'"`]*['"`])(?![^<]*>)/g,
        '<span style="color: #ecc48d">$1</span>',
      );
      html = html.replace(
        /(\/\/.*)(?![^<]*>)/g,
        '<span style="color: #637777; font-style: italic">$1</span>',
      );
      const keywords =
        /\b(function|const|let|var|if|else|return|export|import|from|class|extends|new|true|false|async|await|try|catch)\b(?![^<]*>)/g;
      html = html.replace(keywords, '<span style="color: #c792ea">$1</span>');
      html = html.replace(
        /\b(\d+)\b(?![^<]*>)/g,
        '<span style="color: #f78c6c">$1</span>',
      );
      html = html.replace(
        /\b(\w+)(?=\()(?![^<]*>)/g,
        '<span style="color: #82aaff">$1</span>',
      );

      return html;
    });
  }, [codeLines]);

  const handleExport = async () => {
    if (!exportRef.current) return;
    setIsExporting(true);
    try {
      const dataUrl = await toPng(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });
      const link = document.createElement("a");
      link.download = `carbon-code-${settings.logoText.toLowerCase().replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Falha ao exportar imagem", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!exportRef.current) return;
    setIsCopying(true);
    try {
      const blob = await toBlob(exportRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      });
      if (blob) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
      }
    } catch (err) {
      console.error("Falha ao copiar imagem", err);
    } finally {
      setIsCopying(false);
    }
  };

  const ActiveLogoIcon = useMemo(() => {
    const icon = WATERMARK_ICONS.find((i) => i.id === settings.logoIcon);
    return icon ? icon.component : Wrench;
  }, [settings.logoIcon]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Camera size={32} />
          </IconWrapper>
          <ToolTitleWrapper>
            <ToolTitle>Carbon Code Studio</ToolTitle>
            <ToolDescription>
              Transforme seus trechos de código em imagens deslumbrantes.
            </ToolDescription>
          </ToolTitleWrapper>
        </HeaderContent>
        <ActionButtons>
          <Button
            variant="outline"
            onClick={() => setCode("")}
            style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.2)" }}
          >
            <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar
          </Button>
          <Button
            variant="secondary"
            onClick={handleCopyImage}
            disabled={isCopying}
            style={{ borderRadius: "1rem", borderColor: "#334155" }}
          >
            {isCopying ? (
              <Loader2
                size={18}
                className="animate-spin"
                style={{ marginRight: "0.5rem" }}
              />
            ) : showCopyFeedback ? (
              <Check
                size={18}
                style={{ marginRight: "0.5rem", color: "#22c55e" }}
              />
            ) : (
              <Copy size={18} style={{ marginRight: "0.5rem" }} />
            )}
            {showCopyFeedback ? "Copiado!" : "Copiar Imagem"}
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              backgroundColor: "#db2777",
              boxShadow: "0 20px 25px -5px rgba(219, 39, 119, 0.2)",
            }}
          >
            {isExporting ? (
              <Loader2
                size={18}
                className="animate-spin"
                style={{ marginRight: "0.5rem" }}
              />
            ) : (
              <Download size={18} style={{ marginRight: "0.5rem" }} />
            )}
            {isExporting ? "Exportando..." : "Exportar PNG"}
          </Button>
        </ActionButtons>
      </Header>

      <MainGrid>
        {/* Editor Sidebar */}
        <Sidebar>
          <SettingsCard>
            <SettingsGroup>
              {/* Theme & Language */}
              <SettingRow>
                <SettingItem>
                  <Label>Linguagem</Label>
                  <Select
                    value={settings.language}
                    onChange={(e) =>
                      setSettings({ ...settings, language: e.target.value })
                    }
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </Select>
                </SettingItem>
                <SettingItem>
                  <Label>Tema Code</Label>
                  <Select
                    value={settings.theme}
                    onChange={(e) =>
                      setSettings({ ...settings, theme: e.target.value })
                    }
                  >
                    {THEMES.map((t) => (
                      <option key={t.name}>{t.name}</option>
                    ))}
                  </Select>
                </SettingItem>
              </SettingRow>

              {/* Padding & Radius Sliders */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #1e293b",
                }}
              >
                <RangeWrapper>
                  <RangeHeader>
                    <Label>Padding</Label>
                    <RangeValue>{settings.padding}px</RangeValue>
                  </RangeHeader>
                  <RangeInput
                    type="range"
                    min="16"
                    max="128"
                    value={settings.padding}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        padding: parseInt(e.target.value),
                      })
                    }
                  />
                </RangeWrapper>
                <RangeWrapper>
                  <RangeHeader>
                    <Label>Arredondamento</Label>
                    <RangeValue>{settings.borderRadius}px</RangeValue>
                  </RangeHeader>
                  <RangeInput
                    type="range"
                    min="0"
                    max="40"
                    value={settings.borderRadius}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        borderRadius: parseInt(e.target.value),
                      })
                    }
                  />
                </RangeWrapper>
              </div>

              {/* Backgrounds Selection */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid #1e293b",
                }}
              >
                <Label>Background</Label>
                <BackgroundGrid>
                  {BACKGROUNDS.map((bg) => (
                    <ColorButton
                      key={bg.name}
                      onClick={() =>
                        setSettings({ ...settings, background: bg.style })
                      }
                      $bg={bg.style}
                      $active={settings.background === bg.style}
                      title={bg.name}
                    />
                  ))}
                </BackgroundGrid>
              </div>

              {/* Visibility & Branding */}
              <BrandingSection>
                <Label style={{ marginBottom: "0.5rem" }}>
                  Visibilidade & Branding
                </Label>
                <TogglesList>
                  <ToggleOption
                    label="Controles da Janela"
                    checked={settings.showControls}
                    onChange={(v) =>
                      setSettings({ ...settings, showControls: v })
                    }
                  />
                  <ToggleOption
                    label="Números de Linha"
                    checked={settings.showLineNumbers}
                    onChange={(v) =>
                      setSettings({ ...settings, showLineNumbers: v })
                    }
                  />
                  <ToggleOption
                    label="Marca d'água Logo"
                    checked={settings.showLogo}
                    onChange={(v) => setSettings({ ...settings, showLogo: v })}
                  />
                </TogglesList>

                {settings.showLogo && (
                  <div
                    className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <Label>
                        <Type size={10} style={{ marginRight: "0.25rem" }} />{" "}
                        Texto da Logo
                      </Label>
                      <Input
                        type="text"
                        value={settings.logoText}
                        onChange={(e) =>
                          setSettings({ ...settings, logoText: e.target.value })
                        }
                        placeholder="Digite seu nome ou marca..."
                      />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                      }}
                    >
                      <Label>
                        <Sparkles
                          size={10}
                          style={{ marginRight: "0.25rem" }}
                        />{" "}
                        Ícone da Logo
                      </Label>
                      <IconsGrid>
                        {WATERMARK_ICONS.map((icon) => {
                          const IconComp = icon.component;
                          return (
                            <IconButton
                              key={icon.id}
                              onClick={() =>
                                setSettings({ ...settings, logoIcon: icon.id })
                              }
                              $active={settings.logoIcon === icon.id}
                              title={icon.id}
                            >
                              <IconComp size={14} />
                            </IconButton>
                          );
                        })}
                      </IconsGrid>
                    </div>
                  </div>
                )}
              </BrandingSection>
            </SettingsGroup>
          </SettingsCard>

          <TipCard>
            <TipIconWrapper>
              <Sparkles size={20} />
            </TipIconWrapper>
            <TipContent>
              <TipTitle>Personalização Completa</TipTitle>
              <TipText>
                Personalize ícone, texto e estilo para criar uma identidade
                única para seus snippets.
              </TipText>
            </TipContent>
          </TipCard>
        </Sidebar>

        {/* Studio Canvas */}
        <CanvasArea>
          {/* Code Input Area */}
          <CodeEditorCard>
            <CardHeader>
              <CardLabel>Código Fonte</CardLabel>
              <CardBadge>Input manual</CardBadge>
            </CardHeader>
            <TextArea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Cole seu código aqui..."
              spellCheck={false}
            />
          </CodeEditorCard>

          {/* Live Preview Container */}
          <PreviewContainer>
            <PreviewPattern />

            <LiveCanvas
              ref={exportRef}
              $bg={settings.background}
              $padding={settings.padding}
            >
              {/* The Code Window */}
              <CodeWindow
                $bg={activeTheme.bg}
                $radius={settings.borderRadius}
                $shadow={settings.shadowIntensity}
              >
                {/* Window Controls */}
                {settings.showControls && (
                  <WindowControls>
                    <ControlDot color="#ff5f56" />
                    <ControlDot color="#ffbd2e" />
                    <ControlDot color="#27c93f" />
                    <LanguageBadge>{settings.language}</LanguageBadge>
                  </WindowControls>
                )}

                {/* Code Content */}
                <CodeContent
                  $showControls={settings.showControls}
                  $fontSize={settings.fontSize}
                >
                  {settings.showLineNumbers && (
                    <LineNumbers>
                      {codeLines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </LineNumbers>
                  )}
                  <Pre>
                    <CodeBlock
                      $color={activeTheme.text}
                      dangerouslySetInnerHTML={{
                        __html: highlightedCode
                          .map((line) => `<div>${line || " "}</div>`)
                          .join(""),
                      }}
                    />
                  </Pre>
                </CodeContent>

                {/* Watermark/Logo inside Window */}
                {settings.showLogo && (
                  <Watermark>
                    <WatermarkIcon>
                      <ActiveLogoIcon size={10} style={{ color: "white" }} />
                    </WatermarkIcon>
                    <WatermarkText>{settings.logoText}</WatermarkText>
                  </Watermark>
                )}
              </CodeWindow>
            </LiveCanvas>

            {/* Resolution Badge */}
            <LiveViewBadge>
              <BadgeContent>
                <Maximize size={12} style={{ color: "#ec4899" }} />
                <BadgeText>Canvas Live View</BadgeText>
              </BadgeContent>
            </LiveViewBadge>
          </PreviewContainer>

          {/* Mobile warning / Tips */}
          <TipsGrid>
            <SmallTip>
              <SmallTipIcon>
                <Hash size={16} />
              </SmallTipIcon>
              <SmallTipText>
                Números de linha ajudam na explicação de trechos
              </SmallTipText>
            </SmallTip>
            <SmallTip>
              <SmallTipIcon>
                <ShieldCheck size={16} style={{ color: "#60a5fa" }} />
              </SmallTipIcon>
              <SmallTipText>
                Marca d'água integrada para proteção de autor
              </SmallTipText>
            </SmallTip>
          </TipsGrid>
        </CanvasArea>
      </MainGrid>
    </Container>
  );
};

const ToggleOption = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <ToggleLabel>
    <ToggleText>{label}</ToggleText>
    <ToggleSwitch $checked={checked} onClick={() => onChange(!checked)}>
      <ToggleKnob $checked={checked} />
    </ToggleSwitch>
  </ToggleLabel>
);

export default CarbonCodeTool;
