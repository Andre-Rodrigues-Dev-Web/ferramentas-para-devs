import React, { useState, useMemo } from "react";
import {
  Cpu,
  Copy,
  Check,
  Download,
  Shield,
  Zap,
  Info,
  Server,
  Globe,
  FileCode,
} from "lucide-react";
import { Button } from "../../shared/ui/Button";
import { Input } from "../../shared/ui/Input";
import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Actions,
  Grid,
  ConfigSection,
  ConfigCard,
  SectionHeader,
  SectionTitle,
  FormSpace,
  ToggleCard,
  ToggleContent,
  ToggleLabel,
  ToggleDescription,
  ToggleSwitch,
  ToggleKnob,
  SecurityGrid,
  InfoBox,
  PreviewSection,
  PreviewCard,
  PreviewHeader,
  PreviewTitle,
  PreviewBadge,
  PreviewContent,
  CodeBlock,
  GlowEffect,
  PreviewFooter,
  FooterText,
  StatusIndicator,
  StatusDot,
  ToggleItemContainer,
  SimpleToggleLabel,
  SimpleToggleSwitch,
  SimpleToggleKnob,
} from "./styles/NginxConfigTool.styles";

interface NginxConfig {
  domain: string;
  rootPath: string;
  proxyPass: string;
  isProxy: boolean;
  useSsl: boolean;
  useGzip: boolean;
  wwwRedirect: boolean;
  accessLog: boolean;
  errorLog: boolean;
  phpSupport: boolean;
  securityHeaders: boolean;
}

const NginxConfigTool: React.FC = () => {
  const [config, setConfig] = useState<NginxConfig>({
    domain: "example.com",
    rootPath: "/var/www/example",
    proxyPass: "http://localhost:3000",
    isProxy: false,
    useSsl: true,
    useGzip: true,
    wwwRedirect: true,
    accessLog: true,
    errorLog: true,
    phpSupport: false,
    securityHeaders: true,
  });

  const [copied, setCopied] = useState(false);

  const generatedConfig = useMemo(() => {
    let output = `server {\n`;
    output += `    listen 80;\n`;
    output += `    server_name ${config.domain}${config.wwwRedirect ? ` www.${config.domain}` : ""};\n\n`;

    if (config.useSsl) {
      output += `    # Redirect HTTP to HTTPS\n`;
      output += `    return 301 https://$server_name$request_uri;\n`;
      output += `}\n\n`;
      output += `server {\n`;
      output += `    listen 443 ssl http2;\n`;
      output += `    server_name ${config.domain}${config.wwwRedirect ? ` www.${config.domain}` : ""};\n\n`;
      output += `    ssl_certificate /etc/letsencrypt/live/${config.domain}/fullchain.pem;\n`;
      output += `    ssl_certificate_key /etc/letsencrypt/live/${config.domain}/privkey.pem;\n\n`;
    }

    if (config.useGzip) {
      output += `    gzip on;\n`;
      output += `    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;\n\n`;
    }

    if (config.securityHeaders) {
      output += `    add_header X-Frame-Options "SAMEORIGIN";\n`;
      output += `    add_header X-XSS-Protection "1; mode=block";\n`;
      output += `    add_header X-Content-Type-Options "nosniff";\n\n`;
    }

    if (config.accessLog)
      output += `    access_log /var/log/nginx/${config.domain}.access.log;\n`;
    if (config.errorLog)
      output += `    error_log /var/log/nginx/${config.domain}.error.log;\n\n`;

    if (config.isProxy) {
      output += `    location / {\n`;
      output += `        proxy_pass ${config.proxyPass};\n`;
      output += `        proxy_http_version 1.1;\n`;
      output += `        proxy_set_header Upgrade $http_upgrade;\n`;
      output += `        proxy_set_header Connection 'upgrade';\n`;
      output += `        proxy_set_header Host $host;\n`;
      output += `        proxy_cache_bypass $http_upgrade;\n`;
      output += `    }\n`;
    } else {
      output += `    root ${config.rootPath};\n`;
      output += `    index index.html index.htm${config.phpSupport ? " index.php" : ""};\n\n`;
      output += `    location / {\n`;
      output += `        try_files $uri $uri/ /index.html;\n`;
      output += `    }\n`;

      if (config.phpSupport) {
        output += `\n    location ~ \\.php$ {\n`;
        output += `        include snippets/fastcgi-php.conf;\n`;
        output += `        fastcgi_pass unix:/var/run/php/php-fpm.sock;\n`;
        output += `    }\n`;
      }
    }

    output += `}`;
    return output;
  }, [config]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadConfig = () => {
    const blob = new Blob([generatedConfig], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.domain}.conf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Cpu size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Nginx Config Generator</Title>
            <Description>
              Gere arquivos de configuração robustos para seus servidores Nginx.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <Actions>
          <Button
            variant="outline"
            onClick={downloadConfig}
            disabled={!config.domain}
          >
            <Download size={16} style={{ marginRight: "0.5rem" }} /> Baixar
            .conf
          </Button>
          <Button
            onClick={copyToClipboard}
            disabled={!config.domain}
            style={{ backgroundColor: "#059669" }}
          >
            {copied ? (
              <Check size={16} style={{ marginRight: "0.5rem" }} />
            ) : (
              <Copy size={16} style={{ marginRight: "0.5rem" }} />
            )}
            {copied ? "Copiado" : "Copiar Config"}
          </Button>
        </Actions>
      </Header>

      <Grid>
        {/* Left: Configuration Form */}
        <ConfigSection>
          <ConfigCard>
            <SectionHeader>
              <Server size={18} style={{ color: "#10b981" }} />
              <SectionTitle>Servidor & Domínio</SectionTitle>
            </SectionHeader>

            <FormSpace>
              <Input
                label="Domínio Principal"
                value={config.domain}
                onChange={(e) =>
                  setConfig({ ...config, domain: e.target.value })
                }
                placeholder="exemplo.com"
              />

              <ToggleCard
                onClick={() =>
                  setConfig({ ...config, isProxy: !config.isProxy })
                }
              >
                <ToggleContent>
                  <ToggleLabel>Reverse Proxy</ToggleLabel>
                  <ToggleDescription>
                    Redirecionar para um app (Node, Go, Python...)
                  </ToggleDescription>
                </ToggleContent>
                <ToggleSwitch $checked={config.isProxy}>
                  <ToggleKnob $checked={config.isProxy} />
                </ToggleSwitch>
              </ToggleCard>

              {config.isProxy ? (
                <Input
                  label="Proxy Pass (Backend URL)"
                  value={config.proxyPass}
                  onChange={(e) =>
                    setConfig({ ...config, proxyPass: e.target.value })
                  }
                  placeholder="http://localhost:3000"
                />
              ) : (
                <>
                  <Input
                    label="Caminho Root"
                    value={config.rootPath}
                    onChange={(e) =>
                      setConfig({ ...config, rootPath: e.target.value })
                    }
                    placeholder="/var/www/html"
                  />
                  <ToggleItem
                    label="Suporte PHP-FPM"
                    checked={config.phpSupport}
                    onChange={(v) => setConfig({ ...config, phpSupport: v })}
                  />
                </>
              )}
            </FormSpace>

            <SectionHeader style={{ paddingTop: "1rem" }}>
              <Shield size={18} style={{ color: "#10b981" }} />
              <SectionTitle>Segurança & Performance</SectionTitle>
            </SectionHeader>

            <FormSpace>
              <ToggleItem
                label="Habilitar SSL (HTTPS)"
                checked={config.useSsl}
                onChange={(v) => setConfig({ ...config, useSsl: v })}
              />
              <ToggleItem
                label="Headers de Segurança"
                checked={config.securityHeaders}
                onChange={(v) => setConfig({ ...config, securityHeaders: v })}
              />
              <ToggleItem
                label="Compressão Gzip"
                checked={config.useGzip}
                onChange={(v) => setConfig({ ...config, useGzip: v })}
              />
              <ToggleItem
                label="WWW Redirect"
                checked={config.wwwRedirect}
                onChange={(v) => setConfig({ ...config, wwwRedirect: v })}
              />
              <SecurityGrid>
                <ToggleItem
                  label="Access Logs"
                  checked={config.accessLog}
                  onChange={(v) => setConfig({ ...config, accessLog: v })}
                />
                <ToggleItem
                  label="Error Logs"
                  checked={config.errorLog}
                  onChange={(v) => setConfig({ ...config, errorLog: v })}
                />
              </SecurityGrid>
            </FormSpace>
          </ConfigCard>

          <InfoBox>
            <Info size={18} style={{ color: "#3b82f6", flexShrink: 0 }} />
            <p>
              Certifique-se de que o caminho do Certificado SSL aponta para os
              arquivos corretos gerados pelo{" "}
              <code style={{ color: "#34d399", fontWeight: 700 }}>Certbot</code>
              .
            </p>
          </InfoBox>
        </ConfigSection>

        {/* Right: Output Preview */}
        <PreviewSection>
          <PreviewCard>
            <PreviewHeader>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    padding: "0.5rem",
                    backgroundColor: "rgba(5, 150, 105, 0.1)",
                    color: "#10b981",
                    borderRadius: "0.75rem",
                  }}
                >
                  <FileCode size={20} />
                </div>
                <PreviewTitle>Nginx Configuration</PreviewTitle>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <PreviewBadge>Preview</PreviewBadge>
              </div>
            </PreviewHeader>

            <PreviewContent>
              <CodeBlock>{generatedConfig}</CodeBlock>
              <GlowEffect />
            </PreviewContent>

            <PreviewFooter>
              <FooterText>
                <Zap size={10} style={{ color: "#10b981" }} /> Otimizado para
                sites modernos
              </FooterText>
              <StatusIndicator>
                <Globe size={14} style={{ color: "#1e293b" }} />
                <StatusDot />
              </StatusIndicator>
            </PreviewFooter>
          </PreviewCard>
        </PreviewSection>
      </Grid>
    </Container>
  );
};

const ToggleItem = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) => (
  <ToggleItemContainer onClick={() => onChange(!checked)}>
    <SimpleToggleLabel>{label}</SimpleToggleLabel>
    <SimpleToggleSwitch $checked={checked}>
      <SimpleToggleKnob $checked={checked} />
    </SimpleToggleSwitch>
  </ToggleItemContainer>
);

export default NginxConfigTool;
