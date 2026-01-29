import React, { useState, useEffect } from "react";
import { Keyboard, Info } from "lucide-react";
import {
  Container,
  Header,
  Title,
  Description,
  EmptyState,
  KeyboardIcon,
  EmptyText,
  ContentWrapper,
  MainKeyDisplay,
  KeyCard,
  KeyCodeValue,
  KeyLabel,
  Grid,
  InfoCard,
  InfoLabel,
  InfoValue,
  ModifiersCard,
  ModifiersList,
  ModifierBadge,
  HintCard,
  HintIconWrapper,
  HintText,
} from "./styles/KeycodeInfo.styles";

const KeycodeInfo: React.FC = () => {
  const [keyInfo, setKeyInfo] = useState<{
    key: string;
    code: string;
    which: number;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
  } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser shortcuts for testing purposes if you want,
      // but usually better to just capture them.
      setKeyInfo({
        key: e.key === " " ? "Space" : e.key,
        code: e.code,
        which: e.keyCode, // Deprecated but often requested for legacy support
        altKey: e.altKey,
        ctrlKey: e.ctrlKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Container>
      <Header>
        <Title>JavaScript Keycode Info</Title>
        <Description>
          Pressione qualquer tecla para obter informações detalhadas do evento.
        </Description>
      </Header>

      {!keyInfo ? (
        <EmptyState>
          <KeyboardIcon>
            <Keyboard size={64} />
          </KeyboardIcon>
          <EmptyText>Aguardando entrada do teclado...</EmptyText>
        </EmptyState>
      ) : (
        <ContentWrapper>
          <MainKeyDisplay>
            <KeyCard>
              <KeyCodeValue>{keyInfo.which}</KeyCodeValue>
              <KeyLabel>Keycode</KeyLabel>
            </KeyCard>
          </MainKeyDisplay>

          <Grid>
            <DetailCard label="event.key" value={keyInfo.key} />
            <DetailCard label="event.code" value={keyInfo.code} />
            <DetailCard label="event.which" value={keyInfo.which.toString()} />
            <ModifiersCard>
              <InfoLabel>Modifiers</InfoLabel>
              <ModifiersList>
                <Badge active={keyInfo.altKey} label="Alt" />
                <Badge active={keyInfo.ctrlKey} label="Ctrl" />
                <Badge active={keyInfo.shiftKey} label="Shift" />
                <Badge active={keyInfo.metaKey} label="Meta / Cmd" />
              </ModifiersList>
            </ModifiersCard>
          </Grid>

          <HintCard>
            <HintIconWrapper>
              <Info size={18} />
            </HintIconWrapper>
            <HintText>
              <strong>Dica:</strong> <code>event.which</code> e{" "}
              <code>event.keyCode</code> estão obsoletos em favor de{" "}
              <code>event.key</code> e <code>event.code</code>, mas ainda são
              amplamente utilizados em aplicações legadas.
            </HintText>
          </HintCard>
        </ContentWrapper>
      )}
    </Container>
  );
};

const DetailCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <InfoCard>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </InfoCard>
);

const Badge: React.FC<{ active: boolean; label: string }> = ({
  active,
  label,
}) => <ModifierBadge $active={active}>{label}</ModifierBadge>;

export default KeycodeInfo;
