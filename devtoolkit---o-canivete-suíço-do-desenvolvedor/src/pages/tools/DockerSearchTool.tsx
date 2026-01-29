import React, { useState } from "react";
import {
  Container as DockerIcon,
  Search,
  Star,
  Download,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Info,
  ArrowRight,
  Package,
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
  ExternalLinkButton,
  ContentWrapper,
  SearchCard,
  SearchForm,
  SearchInputWrapper,
  SearchIcon,
  SearchInput,
  FilterButton,
  Suggestions,
  SuggestionLabel,
  SuggestionList,
  SuggestionButton,
  LoadingState,
  LoadingIconWrapper,
  LoadingSpinner,
  LoadingText,
  ResultsGrid,
  ImageCard,
  CardHeader,
  CardIcon,
  BadgeContainer,
  Badge,
  CardContent,
  ImageName,
  ImageDesc,
  StatsGrid,
  StatItem,
  CopyCommandButton,
  CommandCode,
  CopyIconWrapper,
  CardFooter,
  DetailsLink,
  EmptyState,
  InfoCard,
  InfoIconWrapper,
  InfoContent,
  InfoTitle,
  InfoText,
} from "./styles/DockerSearchTool.styles";

interface DockerImage {
  name: string;
  description: string;
  isOfficial: boolean;
  isVerified: boolean;
  starCount: string;
  pullCount: string;
  updatedAt: string;
}

const MOCK_DOCKER_IMAGES: DockerImage[] = [
  {
    name: "nginx",
    description: "Official build of Nginx.",
    isOfficial: true,
    isVerified: true,
    starCount: "19.2k",
    pullCount: "1B+",
    updatedAt: "2 days ago",
  },
  {
    name: "redis",
    description:
      "Redis is an open source key-value store that functions as a data structure server.",
    isOfficial: true,
    isVerified: true,
    starCount: "12.4k",
    pullCount: "1B+",
    updatedAt: "3 days ago",
  },
  {
    name: "mysql",
    description:
      "MySQL is a widely used, open-source relational database management system (RDBMS).",
    isOfficial: true,
    isVerified: true,
    starCount: "14.1k",
    pullCount: "1B+",
    updatedAt: "1 day ago",
  },
  {
    name: "node",
    description:
      "Node.js is a JavaScript runtime built on Chromes V8 JavaScript engine.",
    isOfficial: true,
    isVerified: true,
    starCount: "13.5k",
    pullCount: "1B+",
    updatedAt: "5 days ago",
  },
  {
    name: "python",
    description:
      "Python is an interpreted, interactive, object-oriented, open-source programming language.",
    isOfficial: true,
    isVerified: true,
    starCount: "10.8k",
    pullCount: "1B+",
    updatedAt: "2 days ago",
  },
  {
    name: "ubuntu",
    description:
      "Ubuntu is a Debian-based Linux operating system based on free software.",
    isOfficial: true,
    isVerified: true,
    starCount: "16.5k",
    pullCount: "1B+",
    updatedAt: "1 week ago",
  },
  {
    name: "postgres",
    description:
      "The PostgreSQL object-relational database system provides reliability and integrity.",
    isOfficial: true,
    isVerified: true,
    starCount: "12.9k",
    pullCount: "1B+",
    updatedAt: "2 days ago",
  },
  {
    name: "mongo",
    description:
      "MongoDB document databases provide high availability and easy scalability.",
    isOfficial: true,
    isVerified: true,
    starCount: "10.2k",
    pullCount: "1B+",
    updatedAt: "4 days ago",
  },
  {
    name: "alpine",
    description:
      "A minimal Docker image based on Alpine Linux with a complete package index.",
    isOfficial: true,
    isVerified: true,
    starCount: "10.1k",
    pullCount: "1B+",
    updatedAt: "1 month ago",
  },
  {
    name: "busybox",
    description:
      "Busybox combines tiny versions of many common UNIX utilities into a single executable.",
    isOfficial: true,
    isVerified: true,
    starCount: "3.1k",
    pullCount: "1B+",
    updatedAt: "3 weeks ago",
  },
  {
    name: "traefik",
    description:
      "Traefik is a modern HTTP reverse proxy and load balancer that makes deploying microservices easy.",
    isOfficial: false,
    isVerified: true,
    starCount: "4.5k",
    pullCount: "500M+",
    updatedAt: "2 days ago",
  },
  {
    name: "portainer/portainer-ce",
    description: "Making Docker and Kubernetes management easy.",
    isOfficial: false,
    isVerified: true,
    starCount: "6.2k",
    pullCount: "100M+",
    updatedAt: "1 day ago",
  },
  {
    name: "bitnami/nginx",
    description: "Bitnami Docker Image for Nginx.",
    isOfficial: false,
    isVerified: true,
    starCount: "1.2k",
    pullCount: "100M+",
    updatedAt: "3 days ago",
  },
  {
    name: "wordpress",
    description:
      "The WordPress rich content management system can utilize its own database.",
    isOfficial: true,
    isVerified: true,
    starCount: "7.8k",
    pullCount: "1B+",
    updatedAt: "2 days ago",
  },
  {
    name: "openjdk",
    description: "Official build of OpenJDK.",
    isOfficial: true,
    isVerified: true,
    starCount: "4.5k",
    pullCount: "1B+",
    updatedAt: "2 weeks ago",
  },
];

const DockerSearchTool: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DockerImage[]>(MOCK_DOCKER_IMAGES);
  const [loading, setLoading] = useState(false);
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [filterOfficial, setFilterOfficial] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 600 + Math.random() * 400),
    );

    const searchResults = MOCK_DOCKER_IMAGES.filter((img) => {
      const matchesQuery =
        img.name.toLowerCase().includes(query.toLowerCase()) ||
        img.description.toLowerCase().includes(query.toLowerCase());
      const matchesOfficial = filterOfficial ? img.isOfficial : true;
      return matchesQuery && matchesOfficial;
    });

    setResults(searchResults);
    setLoading(false);
  };

  const copyPullCommand = (name: string) => {
    navigator.clipboard.writeText(`docker pull ${name}`);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 2000);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <DockerIcon size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Docker Hub Search</Title>
            <Description>
              Pesquise imagens oficiais e verificadas no ecossistema Docker.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <ExternalLinkButton
          href="https://hub.docker.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} /> Hub Oficial
        </ExternalLinkButton>
      </Header>

      <ContentWrapper>
        <SearchCard>
          <SearchForm onSubmit={handleSearch}>
            <SearchInputWrapper>
              <SearchIcon $active={loading}>
                <Search size={20} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Pesquisar imagens (ex: nginx, mysql, node...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </SearchInputWrapper>
            <div style={{ display: "flex", gap: "1rem" }}>
              <FilterButton
                type="button"
                onClick={() => {
                  setFilterOfficial(!filterOfficial);
                }}
                $active={filterOfficial}
              >
                <ShieldCheck size={16} /> Oficiais
              </FilterButton>
              <Button
                onClick={handleSearch}
                disabled={loading}
                style={{
                  height: "100%",
                  borderRadius: "1rem",
                  padding: "0 2.5rem",
                }}
              >
                {loading ? (
                  <Loader2
                    size={20}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                ) : (
                  "Pesquisar"
                )}
              </Button>
            </div>
          </SearchForm>

          <Suggestions>
            <SuggestionLabel>Sugestões:</SuggestionLabel>
            <SuggestionList>
              {["nginx", "postgres", "redis", "python"].map((s) => (
                <SuggestionButton
                  key={s}
                  onClick={() => {
                    setQuery(s);
                    handleSearch();
                  }}
                >
                  {s}
                </SuggestionButton>
              ))}
            </SuggestionList>
          </Suggestions>
        </SearchCard>

        {loading ? (
          <LoadingState>
            <LoadingIconWrapper>
              <DockerIcon size={64} />
              <LoadingSpinner>
                <Loader2 size={32} />
              </LoadingSpinner>
            </LoadingIconWrapper>
            <LoadingText>Consultando Docker Hub Registry...</LoadingText>
          </LoadingState>
        ) : (
          <ResultsGrid>
            {results.map((img) => (
              <ImageCard key={img.name}>
                <CardHeader>
                  <CardIcon>
                    <Package size={24} />
                  </CardIcon>
                  <BadgeContainer>
                    {img.isOfficial && (
                      <Badge $type="official">
                        <ShieldCheck size={10} /> Official
                      </Badge>
                    )}
                    {img.isVerified && (
                      <Badge $type="verified">
                        <Check size={10} /> Verified
                      </Badge>
                    )}
                  </BadgeContainer>
                </CardHeader>

                <CardContent>
                  <ImageName>{img.name}</ImageName>
                  <ImageDesc>{img.description}</ImageDesc>
                </CardContent>

                <StatsGrid>
                  <StatItem>
                    <Star size={14} style={{ color: "#eab308" }} />
                    <span>{img.starCount}</span>
                  </StatItem>
                  <StatItem>
                    <Download size={14} style={{ color: "#3b82f6" }} />
                    <span>{img.pullCount}</span>
                  </StatItem>
                </StatsGrid>

                <CopyCommandButton onClick={() => copyPullCommand(img.name)}>
                  <CommandCode>docker pull {img.name}</CommandCode>
                  <CopyIconWrapper>
                    {copiedName === img.name ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                  </CopyIconWrapper>
                </CopyCommandButton>

                <CardFooter>
                  <span>Updated {img.updatedAt}</span>
                  <DetailsLink>
                    Details{" "}
                    <ArrowRight size={10} style={{ marginLeft: "0.25rem" }} />
                  </DetailsLink>
                </CardFooter>
              </ImageCard>
            ))}
          </ResultsGrid>
        )}

        {!loading && results.length === 0 && (
          <EmptyState>
            <DockerIcon size={64} style={{ color: "#1e293b" }} />
            <div>
              <h3
                style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}
              >
                Nenhuma imagem encontrada
              </h3>
              <p style={{ color: "#64748b" }}>
                Tente pesquisar por termos mais genéricos como "db", "server" ou
                "web".
              </p>
            </div>
          </EmptyState>
        )}

        <InfoCard>
          <InfoIconWrapper>
            <Info size={20} />
          </InfoIconWrapper>
          <InfoContent>
            <InfoTitle>Como escolher a imagem certa?</InfoTitle>
            <InfoText>
              Dê preferência a imagens com o selo{" "}
              <strong>Docker Official Image</strong> para maior segurança e
              estabilidade. Verifique também o <strong>pull count</strong> e a
              data da última atualização para garantir que o projeto está ativo.
            </InfoText>
          </InfoContent>
        </InfoCard>
      </ContentWrapper>
    </Container>
  );
};

export default DockerSearchTool;
