import React, { useState } from "react";
import {
  SearchCode,
  Globe,
  Search,
  RefreshCw,
  Check,
  Loader2,
  Server,
  ShieldCheck,
  Info,
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
  SearchPanel,
  SearchCard,
  InputsContainer,
  InputGroup,
  StyledInput,
  InputIcon,
  RecordTypeGroup,
  GroupLabel,
  TypeGrid,
  TypeButton,
  InfoSection,
  InfoTitle,
  InfoText,
  SecurityCard,
  SecurityIconWrapper,
  SecurityContent,
  SecurityTitle,
  ResultsPanel,
  ResultsCard,
  ResultsHeader,
  ResultsTitleGroup,
  ResultsIcon,
  ResultsTitleText,
  MainResultsTitle,
  SubResultsTitle,
  RefreshButton,
  ResultsList,
  EmptyState,
  EmptyIconBg,
  EmptyTitle,
  Table,
  TableHead,
  TableHeaderCell,
  TableRow,
  TableCell,
  LocationInfo,
  CountryFlag,
  NamesContainer,
  CityName,
  RegionName,
  LoadingStatus,
  SuccessStatus,
  ValueCode,
  TtlValue,
  ResultsFooter,
  ServersInfo,
  ServerDots,
  ServerText,
  LiveIndicator,
  PulseDot,
  LiveText,
} from "./styles/DnsCheckerTool.styles";

type DnsRecordType = "A" | "AAAA" | "CNAME" | "MX" | "TXT" | "NS";

interface DnsLocation {
  id: string;
  name: string;
  region: string;
  country: string;
  status: "idle" | "checking" | "success" | "error";
  value: string;
  ttl: number;
}

const LOCATIONS: Omit<DnsLocation, "status" | "value" | "ttl">[] = [
  { id: "1", name: "New York", region: "North America", country: "🇺🇸 US" },
  { id: "2", name: "London", region: "Europe", country: "🇬🇧 UK" },
  { id: "3", name: "Tokyo", region: "Asia", country: "🇯🇵 JP" },
  { id: "4", name: "São Paulo", region: "South America", country: "🇧🇷 BR" },
  { id: "5", name: "Sydney", region: "Oceania", country: "🇦🇺 AU" },
  { id: "6", name: "Frankfurt", region: "Europe", country: "🇩🇪 DE" },
  { id: "7", name: "Singapore", region: "Asia", country: "🇸🇬 SG" },
  { id: "8", name: "Mumbai", region: "Asia", country: "🇮🇳 IN" },
];

const RECORD_TYPES: DnsRecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT", "NS"];

const RECORD_INFO: Record<DnsRecordType, string> = {
  A: "Mapeia um nome de domínio para um endereço IPv4.",
  AAAA: "Mapeia um nome de domínio para um endereço IPv6.",
  CNAME: "Aponta um domínio ou subdomínio para outro nome de domínio (alias).",
  MX: "Especifica os servidores de e-mail responsáveis por aceitar mensagens.",
  TXT: "Permite inserir dados arbitrários, comumente usado para SPF, DKIM e validação.",
  NS: "Indica quais servidores de nomes são autoritativos para o domínio.",
};

const DnsCheckerTool: React.FC = () => {
  const [domain, setDomain] = useState("google.com");
  const [type, setType] = useState<DnsRecordType>("A");
  const [results, setResults] = useState<DnsLocation[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const startCheck = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!domain.trim()) return;

    setIsChecking(true);
    const initialResults: DnsLocation[] = LOCATIONS.map((loc) => ({
      ...loc,
      status: "checking",
      value: "",
      ttl: 0,
    }));
    setResults(initialResults);

    for (let i = 0; i < initialResults.length; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, 200 + Math.random() * 600),
      );

      setResults((prev) => {
        const newResults = [...prev];
        const loc = newResults[i];

        // Mock logic for realistic values
        let val = "";
        if (type === "A")
          val = `172.217.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
        else if (type === "AAAA") val = "2607:f8b0:4004:837::200e";
        else if (type === "MX") val = `10 aspmx.l.google.com.`;
        else if (type === "TXT") val = '"v=spf1 include:_spf.google.com ~all"';
        else if (type === "CNAME") val = `ghs.googlehosted.com.`;
        else if (type === "NS") val = `ns${i + 1}.google.com.`;

        newResults[i] = {
          ...loc,
          status: "success",
          value: val,
          ttl: 300,
        };
        return newResults;
      });
    }
    setIsChecking(false);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <SearchCode size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>DNS Checker</Title>
            <Description>
              Verifique a propagação global de registros DNS em tempo real.
            </Description>
          </TitleContainer>
        </HeaderContent>
      </Header>

      <Grid>
        {/* Search Panel */}
        <SearchPanel>
          <SearchCard onSubmit={startCheck}>
            <InputsContainer>
              <InputGroup>
                <InputIcon>
                  <Globe size={20} />
                </InputIcon>
                <StyledInput
                  type="text"
                  placeholder="exemplo.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase())}
                />
              </InputGroup>

              <RecordTypeGroup>
                <GroupLabel>Tipo de Registro</GroupLabel>
                <TypeGrid>
                  {RECORD_TYPES.map((rt) => (
                    <TypeButton
                      key={rt}
                      type="button"
                      onClick={() => setType(rt)}
                      $active={type === rt}
                    >
                      {rt}
                    </TypeButton>
                  ))}
                </TypeGrid>
              </RecordTypeGroup>
            </InputsContainer>

            <Button
              type="submit"
              disabled={isChecking}
              style={{ width: "100%", height: "3.5rem", borderRadius: "1rem" }}
            >
              {isChecking ? (
                <Loader2
                  size={24}
                  style={{ animation: "spin 1s linear infinite" }}
                />
              ) : (
                <>
                  <Search size={20} style={{ marginRight: "0.5rem" }} />{" "}
                  PESQUISAR
                </>
              )}
            </Button>

            <InfoSection>
              <InfoTitle>
                <Info size={12} /> Sobre {type}
              </InfoTitle>
              <InfoText>{RECORD_INFO[type]}</InfoText>
            </InfoSection>
          </SearchCard>

          <SecurityCard>
            <SecurityIconWrapper>
              <ShieldCheck size={20} />
            </SecurityIconWrapper>
            <SecurityContent>
              <SecurityTitle>DNSSEC</SecurityTitle>
              <InfoText>
                Proteja seu domínio contra ataques de spoofing habilitando
                extensões de segurança DNS.
              </InfoText>
            </SecurityContent>
          </SecurityCard>
        </SearchPanel>

        {/* Results Panel */}
        <ResultsPanel>
          <ResultsCard>
            <ResultsHeader>
              <ResultsTitleGroup>
                <ResultsIcon>
                  <Server size={20} />
                </ResultsIcon>
                <ResultsTitleText>
                  <MainResultsTitle>Resultados Globais</MainResultsTitle>
                  <SubResultsTitle>
                    {domain} • Record {type}
                  </SubResultsTitle>
                </ResultsTitleText>
              </ResultsTitleGroup>

              {results.length > 0 && !isChecking && (
                <RefreshButton onClick={() => startCheck()}>
                  <RefreshCw size={12} /> Re-validar
                </RefreshButton>
              )}
            </ResultsHeader>

            <ResultsList>
              {results.length === 0 ? (
                <EmptyState>
                  <EmptyIconBg>
                    <Globe size={80} style={{ color: "#475569" }} />
                  </EmptyIconBg>
                  <EmptyTitle>Pronto para consulta</EmptyTitle>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      maxWidth: "20rem",
                      color: "#64748b",
                    }}
                  >
                    Insira um domínio à esquerda e clique em pesquisar para
                    testar a propagação.
                  </p>
                </EmptyState>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Localização</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Valor do Registro</TableHeaderCell>
                      <TableHeaderCell>TTL</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {results.map((loc) => (
                      <TableRow key={loc.id}>
                        <TableCell>
                          <LocationInfo>
                            <CountryFlag>
                              {loc.country.split(" ")[0]}
                            </CountryFlag>
                            <NamesContainer>
                              <CityName>{loc.name}</CityName>
                              <RegionName>{loc.region}</RegionName>
                            </NamesContainer>
                          </LocationInfo>
                        </TableCell>
                        <TableCell>
                          {loc.status === "checking" ? (
                            <LoadingStatus>
                              <Loader2
                                size={12}
                                style={{ animation: "spin 1s linear infinite" }}
                              />{" "}
                              Resolvendo
                            </LoadingStatus>
                          ) : (
                            <SuccessStatus>
                              <Check size={12} /> Resolved
                            </SuccessStatus>
                          )}
                        </TableCell>
                        <TableCell>
                          <ValueCode $success={loc.status === "success"}>
                            {loc.value || "---"}
                          </ValueCode>
                        </TableCell>
                        <TableCell>
                          <TtlValue>{loc.ttl || "--"}s</TtlValue>
                        </TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </Table>
              )}
            </ResultsList>

            <ResultsFooter>
              <ServersInfo>
                <ServerDots>
                  <div style={{ backgroundColor: "#2563eb" }}></div>
                  <div style={{ backgroundColor: "#059669" }}></div>
                  <div style={{ backgroundColor: "#4f46e5" }}></div>
                </ServerDots>
                <ServerText>Consulta via 8 servidores globais</ServerText>
              </ServersInfo>
              <LiveIndicator>
                <PulseDot />
                <LiveText>Live Engine Active</LiveText>
              </LiveIndicator>
            </ResultsFooter>
          </ResultsCard>
        </ResultsPanel>
      </Grid>
    </Container>
  );
};

export default DnsCheckerTool;
