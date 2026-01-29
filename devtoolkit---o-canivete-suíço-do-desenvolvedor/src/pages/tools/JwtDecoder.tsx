import React, { useState } from "react";
import { ShieldCheck, AlertCircle, Clock } from "lucide-react";
import { Textarea } from "../../shared/ui/Input";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  InputSection,
  Label,
  ErrorBox,
  ErrorText,
  OutputSection,
  DecodedCard,
  CardHeader,
  SectionTitle,
  StatusBadge,
  JsonPre,
  EmptyState,
  EmptyText,
} from "./styles/JwtDecoder.styles";

const JwtDecoder: React.FC = () => {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<{ header: any; payload: any } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (val: string) => {
    setToken(val);
    setError(null);
    if (!val.trim()) {
      setDecoded(null);
      return;
    }

    try {
      const parts = val.split(".");
      if (parts.length !== 3)
        throw new Error("Token JWT deve ter 3 partes separadas por pontos.");

      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      setDecoded({ header, payload });
    } catch (e: any) {
      setError("Token inválido: Verifique se o formato está correto.");
      setDecoded(null);
    }
  };

  const isExpired = (exp?: number) => {
    if (!exp) return false;
    return Date.now() >= exp * 1000;
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <ShieldCheck size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>JWT Decoder</Title>
          <Description>
            Decodifique tokens JWT instantaneamente para visualizar o Header e
            Payload.
          </Description>
        </TitleContainer>
      </Header>

      <Grid>
        <InputSection>
          <Label>Encoded Token</Label>
          <Textarea
            value={token}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="Cole seu JWT aqui (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            style={{ height: "500px", borderColor: "#1e293b" }}
          />
          {error && (
            <ErrorBox>
              <AlertCircle
                size={18}
                style={{ marginTop: "0.125rem", flexShrink: 0 }}
              />
              <ErrorText>{error}</ErrorText>
            </ErrorBox>
          )}
        </InputSection>

        <OutputSection>
          {decoded ? (
            <>
              <DecodedCard>
                <SectionTitle style={{ marginBottom: "1rem" }}>
                  Header
                </SectionTitle>
                <JsonPre>{JSON.stringify(decoded.header, null, 2)}</JsonPre>
              </DecodedCard>

              <DecodedCard>
                <CardHeader>
                  <SectionTitle $color="#a855f7">Payload</SectionTitle>
                  {decoded.payload.exp && (
                    <StatusBadge $expired={isExpired(decoded.payload.exp)}>
                      <Clock size={12} />
                      {isExpired(decoded.payload.exp) ? "EXPIRADO" : "ATIVO"}
                    </StatusBadge>
                  )}
                </CardHeader>
                <JsonPre $color="#d8b4fe">
                  {JSON.stringify(decoded.payload, null, 2)}
                </JsonPre>
              </DecodedCard>
            </>
          ) : (
            <EmptyState>
              <ShieldCheck size={48} style={{ opacity: 0.2 }} />
              <EmptyText>Aguardando entrada válida...</EmptyText>
            </EmptyState>
          )}
        </OutputSection>
      </Grid>
    </Container>
  );
};

export default JwtDecoder;
