import React, { useState, useEffect } from "react";
import {
  Server,
  Globe,
  Copy,
  Check,
  Shield,
  RefreshCw,
  Monitor,
  Smartphone,
  Layout,
  AlertCircle,
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
  ErrorBanner,
  Grid,
  MainContent,
  IpDisplayCard,
  GlowDecorationBlue,
  GlowDecorationPurple,
  LoadingState,
  LoadingText,
  IpContent,
  IpLabel,
  IpAddressWrapper,
  IpAddress,
  CopyButton,
  InfoBadges,
  InfoBadge,
  InfoBadgeText,
  ErrorState,
  DetailsGrid,
  DetailsCard,
  CardTitle,
  DetailsList,
  Sidebar,
  LocationCard,
  LocationHeader,
  LocationPlaceholder,
  MapPlaceholder,
  Overlay,
  MapText,
  PrivacyCard,
  ShieldWrapper,
  PrivacyContent,
  PrivacyTitle,
  PrivacyText,
  DetailRowContainer,
  DetailLabel,
  DetailValue,
  LocationInfo,
} from "./styles/MyIpTool.styles";

interface IpInfo {
  ip: string;
  city?: string;
  region?: string;
  country_name?: string;
  org?: string;
  timezone?: string;
  postal?: string;
}

const MyIpTool: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [ipData, setIpData] = useState<IpInfo | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchIp = async () => {
    setLoading(true);
    setError(null);
    try {
      // Primary: ipapi.co (rich data)
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("Erro na API principal");
      const data = await response.json();
      setIpData(data);
    } catch (err: any) {
      console.warn("IPAPI failed, trying fallback...", err);
      try {
        // Fallback: ipify (just IP)
        const response = await fetch("https://api.ipify.org?format=json");
        if (!response.ok) throw new Error("Erro no fallback");
        const data = await response.json();
        setIpData({
          ip: data.ip,
          city: "Não disponível",
          region: "Não disponível",
          country_name: "Identificado via Fallback",
        });
        setError(
          "Algumas informações detalhadas (cidade/org) foram bloqueadas pelo seu navegador ou rede, mas identificamos seu IP.",
        );
      } catch (fallbackErr) {
        setError(
          "Não foi possível obter seu endereço IP. Isso geralmente ocorre devido a bloqueadores de anúncios (AdBlock), VPNs restritivas ou falta de conexão com a internet.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIp();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let tem;
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
      ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(" ").replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(" ");
  };

  const browserDetails = {
    browser: getBrowserInfo(),
    os: navigator.platform,
    language: navigator.language,
    resolution: `${window.screen.width}x${window.screen.height}`,
    userAgent: navigator.userAgent,
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Server size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Meu Endereço IP</Title>
            <Description>
              Verifique seu endereço IP público e detalhes da sua conexão atual.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <Button variant="outline" onClick={fetchIp} disabled={loading}>
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
            style={{ marginRight: "0.5rem" }}
          />{" "}
          Atualizar
        </Button>
      </Header>

      {error && (
        <ErrorBanner>
          <AlertCircle size={24} style={{ flexShrink: 0 }} />
          <p style={{ fontSize: "0.875rem", fontWeight: 500 }}>{error}</p>
        </ErrorBanner>
      )}

      <Grid>
        {/* Main IP Display */}
        <MainContent>
          <IpDisplayCard>
            {/* Decoration */}
            <GlowDecorationBlue />
            <GlowDecorationPurple />

            {loading ? (
              <LoadingState>
                <RefreshCw
                  size={48}
                  className="animate-spin"
                  style={{ color: "#3b82f6" }}
                />
                <LoadingText>Identificando conexão...</LoadingText>
              </LoadingState>
            ) : ipData ? (
              <IpContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: "center",
                  }}
                >
                  <IpLabel>Seu IP Público</IpLabel>
                  <IpAddressWrapper>
                    <IpAddress>{ipData.ip}</IpAddress>
                    <CopyButton onClick={() => copyToClipboard(ipData.ip)}>
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </CopyButton>
                  </IpAddressWrapper>
                </div>

                <InfoBadges>
                  <InfoBadge>
                    <Globe size={14} style={{ color: "#3b82f6" }} />
                    <InfoBadgeText>
                      {ipData.country_name || "Desconhecido"}
                    </InfoBadgeText>
                  </InfoBadge>
                  <InfoBadge>
                    <Shield size={14} style={{ color: "#22c55e" }} />
                    <InfoBadgeText>
                      {ipData.org || "ISP Não identificado"}
                    </InfoBadgeText>
                  </InfoBadge>
                </InfoBadges>
              </IpContent>
            ) : (
              <ErrorState>
                <AlertCircle size={40} style={{ opacity: 0.2 }} />
                <p>Dados não disponíveis.</p>
              </ErrorState>
            )}
          </IpDisplayCard>

          {/* Browser & System Details */}
          <DetailsGrid>
            <DetailsCard>
              <CardTitle>
                <Monitor size={16} style={{ color: "#3b82f6" }} /> Detalhes do
                Navegador
              </CardTitle>
              <DetailsList>
                <DetailRow label="Navegador" value={browserDetails.browser} />
                <DetailRow label="Idioma" value={browserDetails.language} />
                <DetailRow
                  label="Resolução"
                  value={browserDetails.resolution}
                />
              </DetailsList>
            </DetailsCard>
            <DetailsCard>
              <CardTitle>
                <Smartphone size={16} style={{ color: "#a855f7" }} /> Sistema
                Operacional
              </CardTitle>
              <DetailsList>
                <DetailRow label="Plataforma" value={browserDetails.os} />
                <DetailRow
                  label="Agente"
                  value={browserDetails.userAgent}
                  isTruncated
                />
              </DetailsList>
            </DetailsCard>
          </DetailsGrid>
        </MainContent>

        {/* Sidebar: Location Info */}
        <Sidebar>
          <LocationCard>
            <LocationHeader>
              <Layout size={16} style={{ color: "#3b82f6" }} /> Localização
              Aproximada
            </LocationHeader>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  padding: "2.5rem 0",
                }}
              >
                <div
                  style={{
                    height: "1rem",
                    backgroundColor: "#1e293b",
                    borderRadius: "9999px",
                    width: "100%",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                ></div>
                <div
                  style={{
                    height: "1rem",
                    backgroundColor: "#1e293b",
                    borderRadius: "9999px",
                    width: "75%",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                ></div>
                <div
                  style={{
                    height: "1rem",
                    backgroundColor: "#1e293b",
                    borderRadius: "9999px",
                    width: "83.333333%",
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  }}
                ></div>
              </div>
            ) : ipData && ipData.city !== "Não disponível" ? (
              <LocationInfo>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <DetailLabel>Cidade / Região</DetailLabel>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {ipData.city}, {ipData.region}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <DetailLabel>Fuso Horário</DetailLabel>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {ipData.timezone}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <DetailLabel>Código Postal</DetailLabel>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {ipData.postal || "N/A"}
                  </p>
                </div>

                <div style={{ paddingTop: "1rem" }}>
                  <MapPlaceholder>
                    <Globe
                      size={48}
                      style={{ color: "#1e293b", transition: "color 0.2s" }}
                    />
                    <Overlay />
                    <MapText>Mapa Indisponível</MapText>
                  </MapPlaceholder>
                </div>
              </LocationInfo>
            ) : (
              <LocationPlaceholder>
                <Globe size={40} />
                <p>
                  Geolocalização não disponível devido a restrições de rede ou
                  privacidade.
                </p>
              </LocationPlaceholder>
            )}
          </LocationCard>

          <PrivacyCard>
            <ShieldWrapper>
              <Shield size={20} />
            </ShieldWrapper>
            <PrivacyContent>
              <PrivacyTitle>Privacidade</PrivacyTitle>
              <PrivacyText>
                Este site não armazena seu endereço IP. Todas as consultas são
                processadas localmente no seu navegador via APIs de terceiros
                confiáveis.
              </PrivacyText>
            </PrivacyContent>
          </PrivacyCard>
        </Sidebar>
      </Grid>
    </Container>
  );
};

const DetailRow = ({
  label,
  value,
  isTruncated,
}: {
  label: string;
  value: string;
  isTruncated?: boolean;
}) => (
  <DetailRowContainer>
    <DetailLabel>{label}</DetailLabel>
    <DetailValue $isTruncated={isTruncated}>{value}</DetailValue>
  </DetailRowContainer>
);

export default MyIpTool;
