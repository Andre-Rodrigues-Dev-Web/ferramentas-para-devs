import React, { useState, useMemo } from "react";
import {
  Monitor,
  Search,
  Globe,
  Info,
  ExternalLink,
  ArrowRight,
  Check,
  X,
  AlertTriangle,
  TrendingUp,
  Chrome,
  Compass,
  AppWindow,
  Smartphone,
} from "lucide-react";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  ToolTitleWrapper,
  ToolTitle,
  ToolDescription,
  OfficialLink,
  ContentGrid,
  Sidebar,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  FeatureList,
  FeatureButton,
  FeatureInfo,
  FeatureTitle,
  FeatureUsage,
  EmptyState,
  MainDetails,
  DetailCard,
  DetailBackground,
  DetailHeader,
  DetailInfo,
  TagsWrapper,
  Tag,
  DetailTitle,
  DetailDescription,
  UsageCard,
  UsageValue,
  UsageLabel,
  BrowserGrid,
  BrowserCard,
  BrowserHeader,
  BrowserIcon,
  BrowserStatus,
  BrowserInfo,
  BrowserName,
  BrowserVersion,
  InfoBox,
  LegendGrid,
  LegendItem,
  LegendIndictator,
  LegendLabel,
} from "./styles/CanIUseTool.styles";

interface BrowserSupport {
  name: string;
  version: string;
  status: "y" | "n" | "a"; // yes, no, partial
}

interface WebFeature {
  id: string;
  title: string;
  description: string;
  usage: number;
  tags: string[];
  stats: {
    chrome: BrowserSupport;
    firefox: BrowserSupport;
    safari: BrowserSupport;
    edge: BrowserSupport;
    ios: BrowserSupport;
    android: BrowserSupport;
  };
}

const FEATURE_DATA: WebFeature[] = [
  {
    id: "css-grid",
    title: "CSS Grid Layout",
    description:
      "Method of laying out content in two dimensions, with rows and columns.",
    usage: 97.5,
    tags: ["css", "layout"],
    stats: {
      chrome: { name: "Chrome", version: "57+", status: "y" },
      firefox: { name: "Firefox", version: "52+", status: "y" },
      safari: { name: "Safari", version: "10.1+", status: "y" },
      edge: { name: "Edge", version: "16+", status: "y" },
      ios: { name: "iOS Safari", version: "10.3+", status: "y" },
      android: { name: "Android Browser", version: "124+", status: "y" },
    },
  },
  {
    id: "webgl2",
    title: "WebGL 2.0",
    description:
      "JavaScript API for rendering interactive 3D and 2D graphics within any compatible web browser.",
    usage: 92.1,
    tags: ["js", "graphics", "canvas"],
    stats: {
      chrome: { name: "Chrome", version: "56+", status: "y" },
      firefox: { name: "Firefox", version: "51+", status: "y" },
      safari: { name: "Safari", version: "15+", status: "y" },
      edge: { name: "Edge", version: "79+", status: "y" },
      ios: { name: "iOS Safari", version: "15+", status: "y" },
      android: { name: "Android Browser", version: "56+", status: "y" },
    },
  },
  {
    id: "fetch-api",
    title: "Fetch API",
    description:
      "A modern replacement for XMLHttpRequest for making network requests.",
    usage: 98.2,
    tags: ["js", "network"],
    stats: {
      chrome: { name: "Chrome", version: "42+", status: "y" },
      firefox: { name: "Firefox", version: "39+", status: "y" },
      safari: { name: "Safari", version: "10.1+", status: "y" },
      edge: { name: "Edge", version: "14+", status: "y" },
      ios: { name: "iOS Safari", version: "10.3+", status: "y" },
      android: { name: "Android Browser", version: "42+", status: "y" },
    },
  },
  {
    id: "webgpu",
    title: "WebGPU",
    description:
      "Future standard for low-level graphics and compute on the web.",
    usage: 68.4,
    tags: ["graphics", "future"],
    stats: {
      chrome: { name: "Chrome", version: "113+", status: "y" },
      firefox: { name: "Firefox", version: "Nightly", status: "a" },
      safari: { name: "Safari", version: "TP", status: "a" },
      edge: { name: "Edge", version: "113+", status: "y" },
      ios: { name: "iOS Safari", version: "17+", status: "n" },
      android: { name: "Android Browser", version: "124+", status: "y" },
    },
  },
  {
    id: "container-queries",
    title: "CSS Container Queries",
    description:
      "Allows styling elements based on the size of a containment context.",
    usage: 89.5,
    tags: ["css", "layout", "responsive"],
    stats: {
      chrome: { name: "Chrome", version: "105+", status: "y" },
      firefox: { name: "Firefox", version: "110+", status: "y" },
      safari: { name: "Safari", version: "16+", status: "y" },
      edge: { name: "Edge", version: "105+", status: "y" },
      ios: { name: "iOS Safari", version: "16+", status: "y" },
      android: { name: "Android Browser", version: "105+", status: "y" },
    },
  },
  {
    id: "wasm",
    title: "WebAssembly (Wasm)",
    description: "Binary instruction format for a stack-based virtual machine.",
    usage: 96.8,
    tags: ["js", "performance"],
    stats: {
      chrome: { name: "Chrome", version: "57+", status: "y" },
      firefox: { name: "Firefox", version: "52+", status: "y" },
      safari: { name: "Safari", version: "11+", status: "y" },
      edge: { name: "Edge", version: "16+", status: "y" },
      ios: { name: "iOS Safari", version: "11+", status: "y" },
      android: { name: "Android Browser", version: "57+", status: "y" },
    },
  },
];

const CanIUseTool: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(
    FEATURE_DATA[0].id,
  );

  const filteredFeatures = useMemo(() => {
    return FEATURE_DATA.filter(
      (f) =>
        f.title.toLowerCase().includes(search.toLowerCase()) ||
        f.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
    );
  }, [search]);

  const selectedFeature = useMemo(
    () =>
      FEATURE_DATA.find((f) => f.id === selectedFeatureId) || FEATURE_DATA[0],
    [selectedFeatureId],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Monitor size={32} />
          </IconWrapper>
          <ToolTitleWrapper>
            <ToolTitle>Can I Use</ToolTitle>
            <ToolDescription>
              Consulte a compatibilidade de recursos web em navegadores
              modernos.
            </ToolDescription>
          </ToolTitleWrapper>
        </HeaderContent>
        <OfficialLink
          href="https://caniuse.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} /> Dados Oficiais
        </OfficialLink>
      </Header>

      <ContentGrid>
        {/* Search and Sidebar */}
        <Sidebar>
          <SearchWrapper>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Pesquisar recurso (ex: grid, wasm...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchWrapper>

          <FeatureList>
            {filteredFeatures.map((feature) => (
              <FeatureButton
                key={feature.id}
                $isActive={selectedFeatureId === feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
              >
                <FeatureInfo>
                  <FeatureTitle $isActive={selectedFeatureId === feature.id}>
                    {feature.title}
                  </FeatureTitle>
                  <FeatureUsage $isActive={selectedFeatureId === feature.id}>
                    {feature.usage}% usage
                  </FeatureUsage>
                </FeatureInfo>
                <ArrowRight
                  size={14}
                  style={{
                    flexShrink: 0,
                    opacity: selectedFeatureId === feature.id ? 1 : 0.5,
                    color:
                      selectedFeatureId === feature.id ? "white" : "inherit",
                  }}
                />
              </FeatureButton>
            ))}
            {filteredFeatures.length === 0 && (
              <EmptyState>
                <p>Nenhum recurso encontrado.</p>
              </EmptyState>
            )}
          </FeatureList>
        </Sidebar>

        {/* Feature Details */}
        <MainDetails>
          <DetailCard>
            {/* Background Decoration */}
            <DetailBackground />

            <DetailHeader>
              <DetailInfo>
                <TagsWrapper>
                  {selectedFeature.tags.map((tag) => (
                    <Tag key={tag}>#{tag}</Tag>
                  ))}
                </TagsWrapper>
                <DetailTitle>{selectedFeature.title}</DetailTitle>
                <DetailDescription>
                  {selectedFeature.description}
                </DetailDescription>
              </DetailInfo>
              <UsageCard>
                <TrendingUp size={24} className="text-green-500 mb-2" />
                <UsageValue>{selectedFeature.usage}%</UsageValue>
                <UsageLabel>Usage Global</UsageLabel>
              </UsageCard>
            </DetailHeader>

            <BrowserGrid>
              <BrowserSupportCard
                browser={selectedFeature.stats.chrome}
                icon={<Chrome size={20} style={{ color: "#60a5fa" }} />}
              />
              <BrowserSupportCard
                browser={selectedFeature.stats.firefox}
                icon={<Globe size={20} style={{ color: "#fb923c" }} />}
              />
              <BrowserSupportCard
                browser={selectedFeature.stats.safari}
                icon={<Compass size={20} style={{ color: "#3b82f6" }} />}
              />
              <BrowserSupportCard
                browser={selectedFeature.stats.edge}
                icon={<AppWindow size={20} style={{ color: "#93c5fd" }} />}
              />
              <BrowserSupportCard
                browser={selectedFeature.stats.ios}
                icon={<Smartphone size={20} style={{ color: "#94a3b8" }} />}
              />
              <BrowserSupportCard
                browser={selectedFeature.stats.android}
                icon={<Smartphone size={20} style={{ color: "#4ade80" }} />}
              />
            </BrowserGrid>

            <InfoBox>
              <Info size={18} />
              <p>
                Os dados de suporte refletem as versões estáveis atuais.
                Recursos parciais (amarelo) podem exigir flags ou prefixos.
              </p>
            </InfoBox>
          </DetailCard>

          <LegendGrid>
            <LegendItemComponent
              status="y"
              label="Suportado"
              color="#22c55e"
              shadow="rgba(34, 197, 94, 0.5)"
            />
            <LegendItemComponent
              status="a"
              label="Parcial / Quase"
              color="#eab308"
              shadow="rgba(234, 179, 8, 0.5)"
            />
            <LegendItemComponent
              status="n"
              label="Não Suportado"
              color="#ef4444"
              shadow="rgba(239, 68, 68, 0.5)"
            />
          </LegendGrid>
        </MainDetails>
      </ContentGrid>
    </Container>
  );
};

const BrowserSupportCard = ({
  browser,
  icon,
}: {
  browser: BrowserSupport;
  icon: React.ReactNode;
}) => {
  const getStatusLabel = (status: "y" | "n" | "a") => {
    switch (status) {
      case "y":
        return "YES";
      case "a":
        return "ALMOST";
      case "n":
        return "NO";
    }
  };

  return (
    <BrowserCard $status={browser.status}>
      <BrowserHeader>
        <BrowserIcon>{icon}</BrowserIcon>
        <BrowserStatus>{getStatusLabel(browser.status)}</BrowserStatus>
      </BrowserHeader>
      <BrowserInfo>
        <BrowserName>{browser.name}</BrowserName>
        <BrowserVersion>Version: {browser.version}</BrowserVersion>
      </BrowserInfo>
    </BrowserCard>
  );
};

const LegendItemComponent = ({
  label,
  color,
  shadow,
}: {
  status: "y" | "n" | "a";
  label: string;
  color: string;
  shadow: string;
}) => (
  <LegendItem>
    <LegendIndictator $colorv={color} $shadowv={shadow} />
    <LegendLabel>{label}</LegendLabel>
  </LegendItem>
);

export default CanIUseTool;
