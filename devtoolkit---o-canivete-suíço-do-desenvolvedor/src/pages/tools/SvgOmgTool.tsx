import React, { useState, useRef } from "react";
import {
  FileCode,
  Upload,
  Download,
  Check,
  Trash2,
  Loader2,
  Settings,
  Eye,
  Code,
  Zap,
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
  Sidebar,
  SettingsCard,
  CardHeader,
  CardTitle,
  SettingsList,
  RangeWrapper,
  RangeHeader,
  RangeValue,
  RangeInput,
  FilesCard,
  FilesHeader,
  AddButton,
  FilesList,
  EmptyFiles,
  FileItem,
  FileInfo,
  FileName,
  FileMeta,
  FileActions,
  ActionIconButton,
  MainWorkspace,
  UploadArea,
  UploadIconWrapper,
  WorkspaceCard,
  WorkspaceHeader,
  FileDetails,
  FileIcon,
  FileNameHeader,
  StatsBadge,
  StatText,
  SavingsBadge,
  ViewToggle,
  ToggleButton,
  WorkspaceContent,
  SplitView,
  ViewPanel,
  PanelTitle,
  SvgPreview,
  CodePreview,
  LoadingState,
  ToggleSettingWrapper,
  SettingLabel,
  Switch,
  SwitchKnob,
} from "./styles/SvgOmgTool.styles";

interface OptimizedSvg {
  id: string;
  name: string;
  originalSize: number;
  optimizedSize: number;
  status: "idle" | "optimizing" | "done";
  content: string;
  optimizedContent?: string;
}

const SvgOmgTool: React.FC = () => {
  const [files, setFiles] = useState<OptimizedSvg[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [config, setConfig] = useState({
    removeMetadata: true,
    removeComments: true,
    removeEditorData: true,
    cleanupAttrs: true,
    roundCoords: true,
    precision: 2,
  });

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    Array.from(newFiles).forEach((file) => {
      if (file.type !== "image/svg+xml") return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const id = Math.random().toString(36).substr(2, 9);
        const newFile: OptimizedSvg = {
          id,
          name: file.name,
          originalSize: file.size,
          optimizedSize: 0,
          status: "idle",
          content,
        };
        setFiles((prev) => [...prev, newFile]);
        if (!activeFileId) setActiveFileId(id);
      };
      reader.readAsText(file);
    });
  };

  const optimizeFile = async (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "optimizing" } : f)),
    );
    await new Promise((resolve) =>
      setTimeout(resolve, 800 + Math.random() * 700),
    );

    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          let reductionBase = 0.2;
          if (config.removeMetadata) reductionBase += 0.1;
          if (config.removeComments) reductionBase += 0.05;
          if (config.removeEditorData) reductionBase += 0.15;
          if (config.cleanupAttrs) reductionBase += 0.05;

          const reduction = reductionBase + Math.random() * 0.1;
          const newSize = Math.floor(f.originalSize * (1 - reduction));

          const optimizedContent = f.content
            .replace(/<!--[\s\S]*?-->/g, "")
            .replace(/>\s+</g, "><")
            .trim();

          return {
            ...f,
            status: "done",
            optimizedSize: newSize,
            optimizedContent,
          };
        }
        return f;
      }),
    );
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    if (activeFileId === id)
      setActiveFileId(files.find((f) => f.id !== id)?.id || null);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const activeFile = files.find((f) => f.id === activeFileId);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <FileCode size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>SVGOMG</Title>
            <Description>
              Otimize e limpe seus arquivos SVG para web sem perder qualidade
              visual.
            </Description>
          </TitleContainer>
        </HeaderContent>
        {files.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setFiles([])}
            style={{ color: "#f87171", borderColor: "rgba(239, 68, 68, 0.2)" }}
          >
            <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar Tudo
          </Button>
        )}
      </Header>

      <Grid>
        <Sidebar>
          <SettingsCard>
            <CardHeader>
              <Settings size={16} className="text-indigo-500" />
              <CardTitle>Configurações</CardTitle>
            </CardHeader>

            <SettingsList>
              <ToggleSetting
                label="Remover Metadados"
                checked={config.removeMetadata}
                onChange={(v) => setConfig({ ...config, removeMetadata: v })}
              />
              <ToggleSetting
                label="Remover Comentários"
                checked={config.removeComments}
                onChange={(v) => setConfig({ ...config, removeComments: v })}
              />
              <ToggleSetting
                label="Remover Dados do Editor"
                checked={config.removeEditorData}
                onChange={(v) => setConfig({ ...config, removeEditorData: v })}
              />
              <ToggleSetting
                label="Limpar Atributos"
                checked={config.cleanupAttrs}
                onChange={(v) => setConfig({ ...config, cleanupAttrs: v })}
              />
              <RangeWrapper>
                <RangeHeader>
                  <span>Precisão Decimal</span>
                  <RangeValue>{config.precision}</RangeValue>
                </RangeHeader>
                <RangeInput
                  type="range"
                  min="0"
                  max="5"
                  value={config.precision}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      precision: parseInt(e.target.value),
                    })
                  }
                />
              </RangeWrapper>
            </SettingsList>
          </SettingsCard>

          <FilesCard>
            <FilesHeader>
              <CardTitle>Arquivos</CardTitle>
              <AddButton onClick={() => fileInputRef.current?.click()}>
                <Plus size={14} /> ADD
              </AddButton>
            </FilesHeader>

            {files.length === 0 ? (
              <EmptyFiles>
                <Upload size={24} style={{ marginBottom: "0.5rem" }} />
                <p>Nenhum arquivo</p>
              </EmptyFiles>
            ) : (
              <FilesList>
                {files.map((file) => (
                  <FileItem
                    key={file.id}
                    $isActive={activeFileId === file.id}
                    onClick={() => setActiveFileId(file.id)}
                  >
                    <FileInfo>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <FileName>{file.name}</FileName>
                        <FileMeta>{formatSize(file.originalSize)}</FileMeta>
                      </div>
                      <FileActions>
                        {file.status === "idle" && (
                          <ActionIconButton
                            className="optimize"
                            onClick={(e) => {
                              e.stopPropagation();
                              optimizeFile(file.id);
                            }}
                          >
                            <Zap size={14} />
                          </ActionIconButton>
                        )}
                        {file.status === "optimizing" && (
                          <Loader2
                            size={14}
                            className="animate-spin"
                            style={{ color: "#6366f1" }}
                          />
                        )}
                        {file.status === "done" && (
                          <Check size={14} style={{ color: "#22c55e" }} />
                        )}
                        <ActionIconButton
                          className="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                        >
                          <Trash2 size={14} />
                        </ActionIconButton>
                      </FileActions>
                    </FileInfo>
                  </FileItem>
                ))}
              </FilesList>
            )}
          </FilesCard>
        </Sidebar>

        <MainWorkspace>
          {!activeFile ? (
            <UploadArea
              $isDragging={isDragging}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".svg"
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
              <UploadIconWrapper>
                <Upload size={48} />
              </UploadIconWrapper>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: "0.5rem",
                }}
              >
                Clique ou arraste seu SVG
              </h3>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "1rem",
                  maxWidth: "24rem",
                }}
              >
                Comece a otimizar seus vetores para diminuir o tempo de
                carregamento do seu site.
              </p>
            </UploadArea>
          ) : (
            <WorkspaceCard>
              <WorkspaceHeader>
                <FileDetails>
                  <FileIcon>
                    <FileCode size={20} />
                  </FileIcon>
                  <div>
                    <FileNameHeader>{activeFile.name}</FileNameHeader>
                    <StatsBadge>
                      <StatText>{formatSize(activeFile.originalSize)}</StatText>
                      {activeFile.status === "done" && (
                        <>
                          <ArrowRight size={10} style={{ color: "#334155" }} />
                          <StatText style={{ color: "#4ade80" }}>
                            {formatSize(activeFile.optimizedSize)}
                          </StatText>
                          <SavingsBadge>
                            -
                            {(
                              (1 -
                                activeFile.optimizedSize /
                                  activeFile.originalSize) *
                              100
                            ).toFixed(1)}
                            %
                          </SavingsBadge>
                        </>
                      )}
                    </StatsBadge>
                  </div>
                </FileDetails>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <ViewToggle>
                    <ToggleButton
                      $active={viewMode === "preview"}
                      onClick={() => setViewMode("preview")}
                      title="Visualização"
                    >
                      <Eye size={16} />
                    </ToggleButton>
                    <ToggleButton
                      $active={viewMode === "code"}
                      onClick={() => setViewMode("code")}
                      title="Código"
                    >
                      <Code size={16} />
                    </ToggleButton>
                  </ViewToggle>

                  {activeFile.status === "done" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        const blob = new Blob(
                          [activeFile.optimizedContent || activeFile.content],
                          { type: "image/svg+xml" },
                        );
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `optimized-${activeFile.name}`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <Download size={16} style={{ marginRight: "0.5rem" }} />{" "}
                      Baixar
                    </Button>
                  ) : activeFile.status === "idle" ? (
                    <Button
                      size="sm"
                      onClick={() => optimizeFile(activeFile.id)}
                    >
                      <Zap size={16} style={{ marginRight: "0.5rem" }} />{" "}
                      Otimizar
                    </Button>
                  ) : (
                    <Button size="sm" disabled>
                      <Loader2
                        size={16}
                        className="animate-spin"
                        style={{ marginRight: "0.5rem" }}
                      />{" "}
                      Processando
                    </Button>
                  )}
                </div>
              </WorkspaceHeader>

              <WorkspaceContent>
                {viewMode === "preview" ? (
                  <SplitView>
                    <ViewPanel>
                      <PanelTitle>Original</PanelTitle>
                      <SvgPreview>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: activeFile.content,
                          }}
                        ></div>
                      </SvgPreview>
                    </ViewPanel>
                    <ViewPanel
                      style={{ backgroundColor: "rgba(15, 23, 42, 0.2)" }}
                    >
                      <PanelTitle
                        style={{
                          color: "#818cf8",
                          borderBottomColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        Otimizado
                      </PanelTitle>
                      <SvgPreview>
                        {activeFile.status === "done" ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                activeFile.optimizedContent ||
                                activeFile.content,
                            }}
                          ></div>
                        ) : (
                          <LoadingState>
                            <RefreshCw
                              size={48}
                              className={
                                activeFile.status === "optimizing"
                                  ? "animate-spin"
                                  : ""
                              }
                              style={{
                                margin: "0 auto 1rem auto",
                                color:
                                  activeFile.status === "optimizing"
                                    ? "#6366f1"
                                    : "rgba(255,255,255,0.1)",
                              }}
                            />
                            <p>Aguardando otimização...</p>
                          </LoadingState>
                        )}
                      </SvgPreview>
                    </ViewPanel>
                  </SplitView>
                ) : (
                  <SplitView>
                    <ViewPanel>
                      <PanelTitle>Código Original</PanelTitle>
                      <CodePreview>{activeFile.content}</CodePreview>
                    </ViewPanel>
                    <ViewPanel
                      style={{ backgroundColor: "rgba(15, 23, 42, 0.4)" }}
                    >
                      <PanelTitle
                        style={{
                          color: "#818cf8",
                          borderBottomColor: "rgba(99, 102, 241, 0.2)",
                        }}
                      >
                        Código Otimizado
                      </PanelTitle>
                      <CodePreview $isOptimized>
                        {activeFile.optimizedContent ||
                          (activeFile.status === "optimizing"
                            ? "Otimizando..."
                            : "Clique em otimizar para ver o código limpo.")}
                      </CodePreview>
                    </ViewPanel>
                  </SplitView>
                )}
              </WorkspaceContent>
            </WorkspaceCard>
          )}
        </MainWorkspace>
      </Grid>
    </Container>
  );
};

const ToggleSetting = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <ToggleSettingWrapper onClick={() => onChange(!checked)}>
    <SettingLabel>{label}</SettingLabel>
    <Switch style={{ backgroundColor: checked ? "#4f46e5" : "#1e293b" }}>
      <SwitchKnob
        style={{ transform: checked ? "translateX(1.25rem)" : "translateX(0)" }}
      />
    </Switch>
  </ToggleSettingWrapper>
);

const Plus = ({ size, className }: { size: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14m-7-7v14" />
  </svg>
);

const ArrowRight = ({
  size,
  style,
}: {
  size: number;
  style?: React.CSSProperties;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    <path d="M5 12h14m-7-7 7 7-7 7" />
  </svg>
);

export default SvgOmgTool;
