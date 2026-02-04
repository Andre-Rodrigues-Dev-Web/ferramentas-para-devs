import React, { useState, useRef } from "react";
import {
  Image as ImageIcon,
  Upload,
  Download,
  Check,
  Trash2,
  Loader2,
  Sparkles,
  Layers,
  Zap,
  ArrowRight,
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
  Actions,
  UploadArea,
  UploadContent,
  UploadIcon,
  UploadTitle,
  UploadSubtitle,
  FilesGrid,
  StatsCard,
  StatsInfo,
  StatItem,
  StatLabel,
  StatValue,
  StatValueBlue,
  Divider,
  SavingBadge,
  SavingLabel,
  SavingPercent,
  FileList,
  FileCard,
  FilePreview,
  FileInfo,
  FileName,
  FileMeta,
  FileSize,
  CompressedSize,
  DiscountBadge,
  FileActions as FileActionsContainer,
  LoadingWrapper,
  StatusText,
  SuccessBadge,
  IconButton,
  FeaturesGrid,
  FeatureCardContainer,
  FeatureIcon,
  FeatureTitle,
  FeatureDesc,
} from "./styles/TinyPngTool.styles";

interface CompressedFile {
  id: string;
  name: string;
  originalSize: number;
  compressedSize: number;
  status: "idle" | "compressing" | "done";
  previewUrl: string;
  compressedUrl?: string;
}

const TinyPngTool: React.FC = () => {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileList = Array.from(newFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalSize: file.size,
      compressedSize: 0,
      status: "idle" as const,
      previewUrl: URL.createObjectURL(file),
      file: file,
    }));

    setFiles((prev) => [...prev, ...fileList]);
  };

  const compressFile = async (id: string) => {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "compressing" } : f)),
    );

    // Simulate network/compression delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1500 + Math.random() * 1000),
    );

    setFiles((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          // Simulated compression: between 40% and 75% reduction
          const reduction = 0.4 + Math.random() * 0.35;
          const newSize = Math.floor(f.originalSize * (1 - reduction));
          return {
            ...f,
            status: "done",
            compressedSize: newSize,
            compressedUrl: f.previewUrl, // In a real app, this would be the new blob
          };
        }
        return f;
      }),
    );
  };

  const compressAll = async () => {
    const idleFiles = files.filter((f) => f.status === "idle");
    for (const file of idleFiles) {
      await compressFile(file.id);
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const filtered = prev.filter((f) => f.id !== id);
      const removed = prev.find((f) => f.id === id);
      if (removed) URL.revokeObjectURL(removed.previewUrl);
      return filtered;
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.previewUrl));
    setFiles([]);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const totalOriginal = files.reduce((acc, f) => acc + f.originalSize, 0);
  const totalCompressed = files.reduce(
    (acc, f) => acc + (f.status === "done" ? f.compressedSize : f.originalSize),
    0,
  );
  const totalSaved = totalOriginal - totalCompressed;
  const savingPercentage =
    totalOriginal > 0 ? ((totalSaved / totalOriginal) * 100).toFixed(1) : 0;

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <ImageIcon size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>TinyPNG (Simulado)</Title>
            <Description>
              Otimize suas imagens PNG e JPEG reduzindo o tamanho do arquivo sem
              perda de qualidade visual.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <Actions>
          {files.length > 0 && (
            <>
              <Button
                variant="outline"
                onClick={clearAll}
                style={{
                  color: "#f87171",
                  borderColor: "rgba(239, 68, 68, 0.2)",
                }}
              >
                <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar
                Tudo
              </Button>
              <Button
                onClick={compressAll}
                disabled={files.every((f) => f.status !== "idle")}
              >
                <Sparkles size={16} style={{ marginRight: "0.5rem" }} />{" "}
                Comprimir Todos
              </Button>
            </>
          )}
        </Actions>
      </Header>

      <UploadArea
        $isDragging={isDragging}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept="image/png, image/jpeg"
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: "none" }}
        />
        <UploadContent>
          <UploadIcon $isDragging={isDragging}>
            <Upload size={48} />
          </UploadIcon>
          <div>
            <UploadTitle>Arraste e solte suas imagens aqui</UploadTitle>
            <UploadSubtitle>
              Suporta PNG e JPEG até 5MB por arquivo.
            </UploadSubtitle>
          </div>
          <Button
            variant="secondary"
            size="sm"
            style={{ pointerEvents: "none" }}
          >
            Selecionar Arquivos
          </Button>
        </UploadContent>
      </UploadArea>

      {files.length > 0 && (
        <FilesGrid>
          {/* Summary Stats */}
          {files.some((f) => f.status === "done") && (
            <StatsCard>
              <StatsInfo>
                <StatItem>
                  <StatLabel>Total Original</StatLabel>
                  <StatValue>{formatSize(totalOriginal)}</StatValue>
                </StatItem>
                <Divider />
                <StatItem>
                  <StatLabel>Total Otimizado</StatLabel>
                  <StatValueBlue>{formatSize(totalCompressed)}</StatValueBlue>
                </StatItem>
              </StatsInfo>
              <SavingBadge>
                <SavingLabel>Você economizou</SavingLabel>
                <SavingPercent>{savingPercentage}%</SavingPercent>
              </SavingBadge>
            </StatsCard>
          )}

          {/* File List */}
          <FileList>
            {files.map((file) => (
              <FileCard key={file.id}>
                <FilePreview>
                  <img src={file.previewUrl} alt={file.name} />
                </FilePreview>

                <FileInfo>
                  <FileName>{file.name}</FileName>
                  <FileMeta>
                    <FileSize>{formatSize(file.originalSize)}</FileSize>
                    {file.status === "done" && (
                      <>
                        <ArrowRight size={12} style={{ color: "#334155" }} />
                        <CompressedSize>
                          {formatSize(file.compressedSize)}
                        </CompressedSize>
                        <DiscountBadge>
                          -
                          {(
                            (1 - file.compressedSize / file.originalSize) *
                            100
                          ).toFixed(0)}
                          %
                        </DiscountBadge>
                      </>
                    )}
                  </FileMeta>
                </FileInfo>

                <FileActionsContainer>
                  {file.status === "idle" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => compressFile(file.id)}
                    >
                      Comprimir
                    </Button>
                  )}
                  {file.status === "compressing" && (
                    <LoadingWrapper>
                      <Loader2 size={16} className="animate-spin" />
                      <StatusText>Processando</StatusText>
                    </LoadingWrapper>
                  )}
                  {file.status === "done" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <SuccessBadge>
                        <Check size={14} /> Pronto
                      </SuccessBadge>
                      <IconButton
                        as="a"
                        href={file.compressedUrl}
                        download={`compressed-${file.name}`}
                        className="download"
                      >
                        <Download size={18} />
                      </IconButton>
                    </div>
                  )}
                  <IconButton
                    onClick={() => removeFile(file.id)}
                    className="delete"
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </FileActionsContainer>
              </FileCard>
            ))}
          </FileList>
        </FilesGrid>
      )}

      {files.length === 0 && (
        <FeaturesGrid>
          <FeatureCard
            icon={<Zap size={20} />}
            title="Compressão Inteligente"
            description="Algoritmos avançados que removem metadados e cores desnecessárias."
          />
          <FeatureCard
            icon={<Layers size={20} />}
            title="Processamento Batch"
            description="Adicione múltiplos arquivos de uma vez e processe todos simultaneamente."
          />
          <FeatureCard
            icon={<ImageIcon size={20} />}
            title="Preview em Tempo Real"
            description="Visualize suas imagens antes e depois da compressão instantaneamente."
          />
        </FeaturesGrid>
      )}
    </Container>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <FeatureCardContainer>
    <FeatureIcon>{icon}</FeatureIcon>
    <FeatureTitle>{title}</FeatureTitle>
    <FeatureDesc>{description}</FeatureDesc>
  </FeatureCardContainer>
);

export default TinyPngTool;
