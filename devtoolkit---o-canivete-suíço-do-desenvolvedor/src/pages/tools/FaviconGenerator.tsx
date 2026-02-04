import React, { useState, useRef } from "react";
import {
  Bookmark,
  Upload,
  Download,
  Smartphone,
  Monitor,
  Trash2,
  Check,
  Chrome,
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
  DropZone,
  HiddenInput,
  UploadIconWrapper,
  DropTitle,
  DropText,
  Grid,
  MainColumn,
  PreviewCard,
  PreviewHeader,
  PreviewTitle,
  BrowserMockup,
  TabMockup,
  FaviconImage,
  TabText,
  TabControls,
  NewTabButton,
  HomeScreenMockup,
  AppIconWrapper,
  IosIcon,
  AndroidIcon,
  IconLabel,
  SidebarColumn,
  SizesCard,
  SizesTitle,
  SizesList,
  SizeItemContainer,
  SizeInfo,
  SizeIconPreview,
  SizeText,
  SizeLabel,
  SizeDimensions,
  CheckWrapper,
  RecommendationCard,
  ChromeIconWrapper,
  RecommendationContent,
  RecTitle,
  RecText,
} from "./styles/FaviconGenerator.styles";

const FaviconGenerator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Bookmark size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Favicon Generator</Title>
            <Description>
              Converta qualquer imagem em um conjunto completo de favicons
              otimizados.
            </Description>
          </TitleContainer>
        </HeaderContent>
        {image && (
          <Actions>
            <Button
              variant="outline"
              onClick={() => setImage(null)}
              style={{
                color: "#f87171",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Resetar
            </Button>
            <Button>
              <Download size={16} style={{ marginRight: "0.5rem" }} /> Baixar
              Pacote .zip
            </Button>
          </Actions>
        )}
      </Header>

      {!image ? (
        <DropZone
          $isDragging={isDragging}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <HiddenInput
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] && handleFile(e.target.files[0])
            }
          />
          <UploadIconWrapper>
            <Upload size={48} />
          </UploadIconWrapper>
          <DropTitle>Selecione uma imagem</DropTitle>
          <DropText>
            Use um arquivo quadrado de alta resolução (mínimo 512x512px) para
            melhores resultados.
          </DropText>
        </DropZone>
      ) : (
        <Grid>
          <MainColumn>
            <PreviewCard>
              <PreviewHeader>
                <Monitor size={16} />
                <PreviewTitle>Aba do Navegador</PreviewTitle>
              </PreviewHeader>
              <BrowserMockup>
                <TabMockup>
                  <FaviconImage src={image} alt="Preview" />
                  <TabText>DevToolkit - Suíte Dev</TabText>
                  <TabControls>
                    <div></div>
                    <div></div>
                  </TabControls>
                </TabMockup>
                <NewTabButton />
              </BrowserMockup>
            </PreviewCard>

            <PreviewCard>
              <PreviewHeader>
                <Smartphone size={16} />
                <PreviewTitle>Home Screen (iOS/Android)</PreviewTitle>
              </PreviewHeader>
              <HomeScreenMockup>
                <AppIconWrapper>
                  <IosIcon>
                    <img src={image} alt="App Icon" />
                  </IosIcon>
                  <IconLabel>iOS App</IconLabel>
                </AppIconWrapper>
                <AppIconWrapper>
                  <AndroidIcon>
                    <img src={image} alt="App Icon" />
                  </AndroidIcon>
                  <IconLabel>Android</IconLabel>
                </AppIconWrapper>
              </HomeScreenMockup>
            </PreviewCard>
          </MainColumn>

          <SidebarColumn>
            <SizesCard>
              <SizesTitle>Tamanhos Gerados</SizesTitle>
              <SizesList>
                <SizeItem
                  size="16x16"
                  label="favicon.ico (Classic)"
                  image={image}
                />
                <SizeItem size="32x32" label="favicon.png" image={image} />
                <SizeItem
                  size="180x180"
                  label="apple-touch-icon.png"
                  image={image}
                />
                <SizeItem
                  size="192x192"
                  label="android-chrome-192.png"
                  image={image}
                />
                <SizeItem
                  size="512x512"
                  label="android-chrome-512.png"
                  image={image}
                />
              </SizesList>
            </SizesCard>

            <RecommendationCard>
              <ChromeIconWrapper>
                <Chrome size={16} />
              </ChromeIconWrapper>
              <RecommendationContent>
                <RecTitle>Recomendação PWA</RecTitle>
                <RecText>
                  Também incluímos um arquivo <code>manifest.json</code>{" "}
                  pré-configurado no pacote de download.
                </RecText>
              </RecommendationContent>
            </RecommendationCard>
          </SidebarColumn>
        </Grid>
      )}
    </Container>
  );
};

const SizeItem = ({
  size,
  label,
  image,
}: {
  size: string;
  label: string;
  image: string;
}) => (
  <SizeItemContainer>
    <SizeInfo>
      <SizeIconPreview>
        <img src={image} alt={label} />
      </SizeIconPreview>
      <SizeText>
        <SizeLabel>{label}</SizeLabel>
        <SizeDimensions>{size} px</SizeDimensions>
      </SizeText>
    </SizeInfo>
    <CheckWrapper>
      <Check size={14} />
    </CheckWrapper>
  </SizeItemContainer>
);

export default FaviconGenerator;
