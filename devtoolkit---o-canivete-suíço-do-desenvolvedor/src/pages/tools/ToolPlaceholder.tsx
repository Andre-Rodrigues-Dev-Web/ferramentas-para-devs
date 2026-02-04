import * as React from "react";
import * as Icons from "lucide-react";
import { Seo } from "../../shared/ui/Seo/Seo";
import { Tool } from "../../shared/types";
import { Button } from "../../shared/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  Container,
  IconContainer,
  Content,
  Title,
  Message,
  Actions,
  Grid,
  PlaceholderCard,
  SkeletonTitle,
  SkeletonLine,
} from "./styles/ToolPlaceholder.styles";

interface ToolPlaceholderProps {
  tool: Tool;
}

const ToolPlaceholder: React.FC<ToolPlaceholderProps> = ({ tool }) => {
  const navigate = useNavigate();
  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? (
      <IconComponent size={64} />
    ) : (
      <Icons.HelpCircle size={64} />
    );
  };

  return (
    <Container>
      <Seo
        title={tool.title}
        description={`Ferramenta ${tool.title} - ${tool.description}`}
      />

      <IconContainer>{getIcon(tool.icon)}</IconContainer>

      <Content>
        <Title>{tool.title}</Title>
        <Message>
          Esta ferramenta ({tool.slug}) ainda está em desenvolvimento. Estamos
          trabalhando duro para trazer as melhores funcionalidades para você!
        </Message>
      </Content>

      <Actions>
        <Button onClick={() => navigate("/")} variant="outline">
          Voltar ao Início
        </Button>
        <Button onClick={() => window.open("https://github.com", "_blank")}>
          Contribuir no GitHub
        </Button>
      </Actions>

      <Grid>
        {[...Array(3)].map((_, i) => (
          <PlaceholderCard key={i}>
            <SkeletonTitle />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <SkeletonLine $width="100%" />
              <SkeletonLine
                $width={i === 0 ? "66%" : i === 1 ? "50%" : "75%"}
              />
            </div>
          </PlaceholderCard>
        ))}
      </Grid>
    </Container>
  );
};

export default ToolPlaceholder;
