import React, { useState, useEffect } from "react";
import {
  Package,
  Search,
  BarChart3,
  Zap,
  Info,
  ExternalLink,
  Loader2,
  AlertCircle,
  Check,
  ArrowRight,
  Layers,
  ShieldCheck,
  History,
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
  OfficialLink,
  MainContent,
  SearchForm,
  SearchIconWrapper,
  SearchInput,
  SearchButton,
  LoadingState,
  LoadingIconContainer,
  LoadingText,
  ResultContainer,
  ResultCard,
  ResultBackground,
  ResultHeader,
  PackageInfo,
  PackageName,
  PackageDesc,
  BadgesWrapper,
  Badge,
  ResultGrid,
  SectionTitle,
  SizeCard,
  SizeLabel,
  SizeValue,
  DownloadTimeCard,
  TimeRow,
  TimeMeta,
  TimeLabel,
  TimeValue,
  TimeBarBg,
  TimeBarFill,
  CompositionCard,
  CompositionItem,
  CompLabel,
  CompIcon,
  FooterInfo,
  InfoIcon,
  InfoText,
  InitialStateGrid,
  IntroCard,
  IntroIcon,
  RecentList,
  RecentHeader,
  RecentItem,
  RecentInfo,
  RecentIcon,
} from "./styles/BundlePhobiaTool.styles";

interface PackageStats {
  name: string;
  version: string;
  minifiedSize: number;
  gzippedSize: number;
  downloadTime3G: number;
  downloadTime4G: number;
  dependencies: number;
  hasTreeShaking: boolean;
  hasSideEffects: boolean;
  description: string;
}

const SIMULATED_PACKAGES: Record<string, PackageStats> = {
  react: {
    name: "react",
    version: "18.3.1",
    minifiedSize: 10400,
    gzippedSize: 6400,
    downloadTime3G: 120,
    downloadTime4G: 15,
    dependencies: 0,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: "A JavaScript library for building user interfaces.",
  },
  lodash: {
    name: "lodash",
    version: "4.17.21",
    minifiedSize: 72000,
    gzippedSize: 24400,
    downloadTime3G: 480,
    downloadTime4G: 60,
    dependencies: 0,
    hasTreeShaking: false,
    hasSideEffects: true,
    description:
      "A modern JavaScript utility library delivering modularity, performance, & extras.",
  },
  moment: {
    name: "moment",
    version: "2.30.1",
    minifiedSize: 232000,
    gzippedSize: 72100,
    downloadTime3G: 1400,
    downloadTime4G: 180,
    dependencies: 0,
    hasTreeShaking: false,
    hasSideEffects: true,
    description:
      "Parse, validate, manipulate, and display dates and times in JavaScript.",
  },
  axios: {
    name: "axios",
    version: "1.7.2",
    minifiedSize: 29000,
    gzippedSize: 11100,
    downloadTime3G: 220,
    downloadTime4G: 28,
    dependencies: 1,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: "Promise based HTTP client for the browser and node.js",
  },
  "framer-motion": {
    name: "framer-motion",
    version: "11.2.10",
    minifiedSize: 124000,
    gzippedSize: 34500,
    downloadTime3G: 680,
    downloadTime4G: 85,
    dependencies: 5,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: "A production-ready motion library for React.",
  },
  tailwindcss: {
    name: "tailwindcss",
    version: "3.4.4",
    minifiedSize: 3400000,
    gzippedSize: 450000,
    downloadTime3G: 8500,
    downloadTime4G: 1200,
    dependencies: 12,
    hasTreeShaking: true,
    hasSideEffects: false,
    description: "A utility-first CSS framework for rapid UI development.",
  },
};

const BundlePhobiaTool: React.FC = () => {
  const [packageName, setPackageName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PackageStats | null>(null);
  const [history, setHistory] = useState<PackageStats[]>([]);

  useEffect(() => {
    // Carregar histórico do localStorage
    const saved = localStorage.getItem("bundlephobia_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSearch = async (e?: React.FormEvent, overrideName?: string) => {
    e?.preventDefault();
    const query = (overrideName || packageName).trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setResult(null);

    // Simulação de delay de análise
    await new Promise((resolve) =>
      setTimeout(resolve, 1200 + Math.random() * 800),
    );

    const found = SIMULATED_PACKAGES[query];
    const finalResult = found || {
      name: query,
      version: "1.0.0",
      minifiedSize: Math.floor(Math.random() * 80000) + 5000,
      gzippedSize: Math.floor(Math.random() * 25000) + 2000,
      downloadTime3G: Math.floor(Math.random() * 600) + 100,
      downloadTime4G: Math.floor(Math.random() * 120) + 20,
      dependencies: Math.floor(Math.random() * 8),
      hasTreeShaking: Math.random() > 0.4,
      hasSideEffects: Math.random() > 0.7,
      description: "Pacote analisado via base de dados estática simulada.",
    };

    setResult(finalResult);
    setLoading(false);

    // Atualizar histórico
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.name !== finalResult.name);
      const newHistory = [finalResult, ...filtered].slice(0, 5);
      localStorage.setItem("bundlephobia_history", JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Package size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>BundlePhobia</Title>
            <Description>
              Analise o peso e o custo de pacotes NPM antes de instalá-los.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <div>
          <OfficialLink href="https://bundlephobia.com" target="_blank">
            <ExternalLink size={14} /> Site Oficial
          </OfficialLink>
        </div>
      </Header>

      <MainContent>
        {/* Barra de Busca */}
        <SearchForm onSubmit={handleSearch}>
          <SearchIconWrapper $loading={loading}>
            <Search size={24} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Digite o nome do pacote (ex: react, lodash, axios...)"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
          />
          <SearchButton type="submit" disabled={loading || !packageName.trim()}>
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Analisar"
            )}
          </SearchButton>
        </SearchForm>

        {loading ? (
          <LoadingState>
            <LoadingIconContainer>
              <Package size={80} />
              <Loader2 size={40} className="animate-spin" />
            </LoadingIconContainer>
            <LoadingText>
              <h3>Analisando Dependências...</h3>
              <p>Calculando tamanho minificado e simulando compressão gzip.</p>
            </LoadingText>
          </LoadingState>
        ) : result ? (
          <ResultContainer>
            {/* Header do Resultado */}
            <ResultCard>
              <ResultBackground />

              <ResultHeader>
                <PackageInfo>
                  <PackageName>
                    <h2>{result.name}</h2>
                    <span>{result.version}</span>
                  </PackageName>
                  <PackageDesc>{result.description}</PackageDesc>
                </PackageInfo>
                <BadgesWrapper>
                  <FeatureBadge
                    label="Tree-shaking"
                    active={result.hasTreeShaking}
                  />
                  <FeatureBadge
                    label="No Side-effects"
                    active={!result.hasSideEffects}
                  />
                </BadgesWrapper>
              </ResultHeader>

              <ResultGrid>
                {/* Tamanhos */}
                <div>
                  <SectionTitle>Tamanho do Bundle</SectionTitle>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <SizeCard>
                      <SizeLabel>Minificado</SizeLabel>
                      <SizeValue>{formatSize(result.minifiedSize)}</SizeValue>
                    </SizeCard>
                    <SizeCard $highlight>
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          padding: "1rem",
                          opacity: 0.1,
                        }}
                      >
                        <Zap size={40} />
                      </div>
                      <SizeLabel $highlight>Minificado + Gzipped</SizeLabel>
                      <SizeValue>{formatSize(result.gzippedSize)}</SizeValue>
                    </SizeCard>
                  </div>
                </div>

                {/* Download Times */}
                <div>
                  <SectionTitle>Tempos de Download</SectionTitle>
                  <DownloadTimeCard>
                    <TimeRow>
                      <TimeMeta>
                        <TimeLabel>Slow 3G (100kb/s)</TimeLabel>
                        <TimeValue>
                          {(result.downloadTime3G / 100).toFixed(1)}s
                        </TimeValue>
                      </TimeMeta>
                      <TimeBarBg>
                        <TimeBarFill
                          $color="#ea580c"
                          $width={Math.min(
                            100,
                            (result.gzippedSize / 150000) * 100,
                          )}
                        />
                      </TimeBarBg>
                    </TimeRow>
                    <TimeRow>
                      <TimeMeta>
                        <TimeLabel>Emerging 4G (1.5mb/s)</TimeLabel>
                        <TimeValue>
                          {(result.downloadTime4G / 100).toFixed(1)}s
                        </TimeValue>
                      </TimeMeta>
                      <TimeBarBg>
                        <TimeBarFill
                          $color="#10b981"
                          $width={Math.min(
                            100,
                            (result.gzippedSize / 500000) * 100,
                          )}
                        />
                      </TimeBarBg>
                    </TimeRow>
                    <div
                      style={{
                        paddingTop: "0.5rem",
                        borderTop: "1px solid #1e293b",
                        fontSize: "0.625rem",
                        color: "#475569",
                      }}
                    >
                      Estimativas baseadas em condições ideais de rede.
                    </div>
                  </DownloadTimeCard>
                </div>

                {/* Sidebar Info */}
                <div>
                  <SectionTitle>Composição</SectionTitle>
                  <CompositionCard>
                    <CompositionItem>
                      <CompLabel>
                        <CompIcon $color="#3b82f6">
                          <Layers size={18} />
                        </CompIcon>
                        <span>Dependências</span>
                      </CompLabel>
                      <span
                        style={{
                          fontSize: "1.125rem",
                          fontWeight: 900,
                          color: "white",
                        }}
                      >
                        {result.dependencies}
                      </span>
                    </CompositionItem>
                    <CompositionItem>
                      <CompLabel>
                        <CompIcon $color="#a855f7">
                          <ShieldCheck size={18} />
                        </CompIcon>
                        <span>Vulnerabilidades</span>
                      </CompLabel>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 900,
                          color: "#22c55e",
                          textTransform: "uppercase",
                        }}
                      >
                        None
                      </span>
                    </CompositionItem>
                    <Button
                      variant="outline"
                      size="sm"
                      style={{
                        width: "100%",
                        marginTop: "1rem",
                        fontSize: "0.625rem",
                      }}
                    >
                      <BarChart3 size={14} style={{ marginRight: "0.5rem" }} />{" "}
                      VER GRÁFICO COMPLETO
                    </Button>
                  </CompositionCard>
                </div>
              </ResultGrid>
            </ResultCard>

            <FooterInfo>
              <InfoIcon>
                <Info size={24} />
              </InfoIcon>
              <InfoText>
                <p className="title">
                  Por que o tamanho do bundle é importante?
                </p>
                <p className="desc">
                  Cada KB de JavaScript adicionado aumenta o tempo de parsing e
                  execução, especialmente em dispositivos de entrada. Manter
                  seus pacotes leves garante uma experiência fluida (Core Web
                  Vitals) para todos os seus usuários.
                </p>
              </InfoText>
            </FooterInfo>
          </ResultContainer>
        ) : (
          <InitialStateGrid>
            <IntroCard>
              <IntroIcon>
                <BarChart3 size={40} />
              </IntroIcon>
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "0.5rem",
                  }}
                >
                  Análise Inteligente
                </h3>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                  }}
                >
                  Entenda como uma biblioteca afeta seu tempo de carregamento e
                  performance geral antes mesmo do `npm install`.
                </p>
              </div>
            </IntroCard>

            <RecentList>
              <RecentHeader>
                <History size={18} className="text-orange-500" />
                <h3>Análises Recentes</h3>
              </RecentHeader>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                {history.length > 0 ? (
                  history.map((item) => (
                    <RecentItem
                      key={item.name}
                      onClick={() => {
                        setPackageName(item.name);
                        handleSearch(undefined, item.name);
                      }}
                    >
                      <RecentInfo>
                        <RecentIcon>
                          <Package size={20} />
                        </RecentIcon>
                        <div>
                          <p
                            style={{
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              color: "#e2e8f0",
                            }}
                          >
                            {item.name}
                          </p>
                          <p
                            style={{
                              fontSize: "0.625rem",
                              color: "#64748b",
                              fontFamily: "monospace",
                              textTransform: "uppercase",
                            }}
                          >
                            {formatSize(item.gzippedSize)} Gzipped
                          </p>
                        </div>
                      </RecentInfo>
                      <ArrowRight size={16} style={{ color: "#334155" }} />
                    </RecentItem>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "3rem",
                      textAlign: "center",
                      border: "2px dashed #1e293b",
                      borderRadius: "1.5rem",
                      opacity: 0.2,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                        color: "#94a3b8",
                      }}
                    >
                      Nenhum pacote pesquisado ainda.
                    </p>
                  </div>
                )}
              </div>
            </RecentList>
          </InitialStateGrid>
        )}
      </MainContent>
    </Container>
  );
};

const FeatureBadge = ({
  label,
  active,
}: {
  label: string;
  active: boolean;
}) => (
  <Badge $active={active}>
    {active ? <Check size={12} /> : <AlertCircle size={12} />}
    {label}
  </Badge>
);

export default BundlePhobiaTool;
