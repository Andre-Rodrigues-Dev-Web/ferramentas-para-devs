import React, { useState } from "react";
import { HardDrive, Info } from "lucide-react";
import {
  Container,
  Header,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  Grid,
  PermissionsCard,
  RoleGroup,
  RoleTitle,
  CheckboxGroup,
  PermissionButton,
  ResultsColumn,
  NumericDisplay,
  NumericValue,
  NumericLabel,
  SymbolicDisplay,
  SymbolicValue,
  SymbolicLabel,
  InfoCard,
  InfoIcon,
} from "./styles/ChmodCalculator.styles";

const ChmodCalculator: React.FC = () => {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    public: { read: true, write: false, execute: false },
  });

  const toggle = (
    type: keyof typeof permissions,
    perm: keyof (typeof permissions)["owner"],
  ) => {
    setPermissions((prev) => ({
      ...prev,
      [type]: { ...prev[type], [perm]: !prev[type][perm] },
    }));
  };

  const calculateNumeric = () => {
    const calc = (p: (typeof permissions)["owner"]) =>
      (p.read ? 4 : 0) + (p.write ? 2 : 0) + (p.execute ? 1 : 0);
    return `${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  const calculateSymbolic = () => {
    const calc = (p: (typeof permissions)["owner"]) =>
      `${p.read ? "r" : "-"}${p.write ? "w" : "-"}${p.execute ? "x" : "-"}`;
    return `-${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.public)}`;
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <HardDrive size={32} />
        </IconWrapper>
        <TitleContainer>
          <Title>Chmod Calculator</Title>
          <Description>
            Calculadora visual para permissões de arquivos Linux e Unix.
          </Description>
        </TitleContainer>
      </Header>

      <Grid>
        <PermissionsCard>
          {(["owner", "group", "public"] as const).map((role) => (
            <RoleGroup key={role}>
              <RoleTitle>
                {role === "owner"
                  ? "Dono (Owner)"
                  : role === "group"
                    ? "Grupo (Group)"
                    : "Público (Public)"}
              </RoleTitle>
              <CheckboxGroup>
                {(["read", "write", "execute"] as const).map((p) => (
                  <PermissionButton
                    key={p}
                    onClick={() => toggle(role, p)}
                    $active={permissions[role][p]}
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </PermissionButton>
                ))}
              </CheckboxGroup>
            </RoleGroup>
          ))}
        </PermissionsCard>

        <ResultsColumn>
          <NumericDisplay>
            <NumericValue>{calculateNumeric()}</NumericValue>
            <NumericLabel>Permissão Numérica</NumericLabel>
          </NumericDisplay>

          <SymbolicDisplay>
            <SymbolicValue>{calculateSymbolic()}</SymbolicValue>
            <SymbolicLabel>Notação Simbólica</SymbolicLabel>
          </SymbolicDisplay>

          <InfoCard>
            <InfoIcon>
              <Info size={16} />
            </InfoIcon>
            <p>
              Use o comando <code>chmod {calculateNumeric()} [arquivo]</code> no
              terminal para aplicar estas permissões.
            </p>
          </InfoCard>
        </ResultsColumn>
      </Grid>
    </Container>
  );
};

export default ChmodCalculator;
