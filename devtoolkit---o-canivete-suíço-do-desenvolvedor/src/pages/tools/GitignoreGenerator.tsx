import React, { useState, useMemo } from "react";
import {
  FileX,
  Search,
  Plus,
  X,
  Download,
  Copy,
  Check,
  Info,
  FileCode,
  Zap,
  Layers,
  Trash2,
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
  Actions,
  Grid,
  SelectionColumn,
  SelectionCard,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  Dropdown,
  DropdownList,
  DropdownItem,
  TechInfo,
  TechIcon,
  TechName,
  TechCategory,
  AddIcon,
  SelectedSection,
  SectionTitle,
  TagsContainer,
  EmptySelection,
  EmptyText,
  TechTag,
  RemoveTagButton,
  CommonSection,
  CommonButton,
  RecommendationCard,
  InfoIconWrapper,
  PreviewColumn,
  PreviewCard,
  PreviewHeader,
  HeaderTitleGroup,
  HeaderIcon,
  HeaderTitle,
  CopyButton,
  CodeContainer,
  CodeContent,
  EmptyState,
  PreviewFooter,
  FooterInfo,
  TemplateDots,
  FooterText,
  VersionBadge,
  VersionDot,
  VersionText,
} from "./styles/GitignoreGenerator.styles";

interface Tech {
  id: string;
  name: string;
  category: "Linguagem" | "Framework" | "IDE" | "Sistema";
  content: string;
}

const TECHS: Tech[] = [
  {
    id: "node",
    name: "Node",
    category: "Linguagem",
    content:
      "# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Dependency directories\nnode_modules/\njspm_packages/\n\n# IDEs and editors\n.idea/\n.vscode/\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n\n# Runtime data\npids\n*.pid\n*.seed\n*.pid.lock\n\n# Optional npm cache directory\n.npm\n\n# Optional eslint cache\n.eslintcache",
  },
  {
    id: "react",
    name: "React",
    category: "Framework",
    content:
      "# build folders\nbuild/\ndist/\n\n# tests\n/coverage\n\n# env\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local",
  },
  {
    id: "python",
    name: "Python",
    category: "Linguagem",
    content:
      "# Byte-compiled / optimized / DLL files\n__pycache__/\n*.py[cod]\n*$py.class\n\n# Virtual environments\nvenv/\nenv/\n.env/\n.venv/\nENV/\n\n# Distribution / packaging\n.Python\nbuild/\ndevelop-eggs/\ndist/\neggs/\n.eggs/\nlib/\nlib64/\nsdist/\nvar/\nwheels/\nshare/python-wheels/\n*.egg-info/\n.installed.cfg\n*.egg\nMANIFEST",
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    category: "IDE",
    content:
      ".vscode/*\n!.vscode/settings.json\n!.vscode/tasks.json\n!.vscode/launch.json\n!.vscode/extensions.json\n*.code-workspace\n.history/",
  },
  {
    id: "windows",
    name: "Windows",
    category: "Sistema",
    content:
      "# Windows thumbnail cache files\nThumbs.db\nThumbs.db:encryptable\nehthumbs.db\nehthumbs_vista.db\n\n# Folder config file\ndesktop.ini\n\n# Recycle Bin used on separate drives\n$RECYCLE.BIN/",
  },
  {
    id: "macos",
    name: "macOS",
    category: "Sistema",
    content:
      ".DS_Store\n.AppleDouble\n.LSOverride\n\n# Icon must end with two \\r\nIcon\r\r\n\n# Thumbnails\n._*\n\n# Files that might appear in the root of a volume\n.DocumentRevisions-V100\n.fseventsd\n.Spotlight-V100\n.TemporaryItems\n.Trashes\n.VolumeIcon.icns\n.com.apple.timemachine.donotpresent",
  },
  {
    id: "vue",
    name: "Vue",
    category: "Framework",
    content:
      ".DS_Store\nnode_modules\n/dist\n\n# local env files\n.env.local\n.env.*.local\n\n# Log files\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# Editor directories and files\n.idea\n.vscode\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?",
  },
  {
    id: "go",
    name: "Go",
    category: "Linguagem",
    content:
      "# Binaries for programs and plugins\n*.exe\n*.exe~\n*.dll\n*.so\n*.dylib\n\n# Test binary, built with `go test -c`\n*.test\n\n# Output of the go coverage tool, specifically when used with Litmus\n*.out\n\n# Dependency directories (remove the comment below to include it)\n# vendor/",
  },
  {
    id: "docker",
    name: "Docker",
    category: "Sistema",
    content: ".dockerignore",
  },
  {
    id: "laravel",
    name: "Laravel",
    category: "Framework",
    content:
      "/vendor/\nnode_modules/\npublic/storage\npublic/hot\nstorage/*.key\n.env\n.env.backup\n.phpunit.result.cache\nHomestead.json\nHomestead.yaml\nauth.json\npm2-*.log",
  },
];

const GitignoreGenerator: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState<Tech[]>([]);
  const [copied, setCopied] = useState(false);

  const filteredTechs = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];
    return TECHS.filter(
      (t) =>
        t.name.toLowerCase().includes(query) &&
        !selectedTechs.find((st) => st.id === t.id),
    );
  }, [search, selectedTechs]);

  const generatedContent = useMemo(() => {
    if (selectedTechs.length === 0) return "";
    return selectedTechs
      .map((t) => {
        return `### ${t.name} ###\n${t.content}\n`;
      })
      .join("\n");
  }, [selectedTechs]);

  const addTech = (tech: Tech) => {
    setSelectedTechs([...selectedTechs, tech]);
    setSearch("");
  };

  const removeTech = (id: string) => {
    setSelectedTechs(selectedTechs.filter((t) => t.id !== id));
  };

  const copyToClipboard = () => {
    if (!generatedContent) return;
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    if (!generatedContent) return;
    const blob = new Blob([generatedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".gitignore";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <FileX size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Gitignore Generator</Title>
            <Description>
              Gere arquivos .gitignore personalizados para seu stack de
              tecnologia.
            </Description>
          </TitleContainer>
        </HeaderContent>
        {selectedTechs.length > 0 && (
          <Actions>
            <Button
              variant="outline"
              onClick={() => setSelectedTechs([])}
              style={{
                color: "#f87171",
                borderColor: "rgba(239, 68, 68, 0.2)",
              }}
            >
              <Trash2 size={16} style={{ marginRight: "0.5rem" }} /> Limpar
            </Button>
            <Button
              onClick={downloadFile}
              style={{ backgroundColor: "#4f46e5" }}
            >
              <Download size={16} style={{ marginRight: "0.5rem" }} /> Baixar
              .gitignore
            </Button>
          </Actions>
        )}
      </Header>

      <Grid>
        <SelectionColumn>
          <SelectionCard>
            <SearchWrapper>
              <SearchIcon $active={!!search}>
                <Search size={20} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Busque por Node, React, macOS, VSCode..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {filteredTechs.length > 0 && (
                <Dropdown>
                  <DropdownList>
                    {filteredTechs.map((tech) => (
                      <DropdownItem key={tech.id} onClick={() => addTech(tech)}>
                        <TechInfo>
                          <TechIcon>
                            {tech.category.substring(0, 3).toUpperCase()}
                          </TechIcon>
                          <div>
                            <TechName>{tech.name}</TechName>
                            <TechCategory>{tech.category}</TechCategory>
                          </div>
                        </TechInfo>
                        <AddIcon>
                          <Plus size={16} />
                        </AddIcon>
                      </DropdownItem>
                    ))}
                  </DropdownList>
                </Dropdown>
              )}
            </SearchWrapper>

            <SelectedSection>
              <SectionTitle>Selecionados</SectionTitle>
              <TagsContainer>
                {selectedTechs.length === 0 ? (
                  <EmptySelection>
                    <Zap
                      size={24}
                      style={{ color: "#475569", marginBottom: "0.5rem" }}
                    />
                    <EmptyText>Nenhuma tecnologia selecionada</EmptyText>
                  </EmptySelection>
                ) : (
                  selectedTechs.map((tech) => (
                    <TechTag key={tech.id}>
                      {tech.name}
                      <RemoveTagButton onClick={() => removeTech(tech.id)}>
                        <X size={14} />
                      </RemoveTagButton>
                    </TechTag>
                  ))
                )}
              </TagsContainer>
            </SelectedSection>

            <CommonSection>
              <SectionTitle style={{ marginBottom: "1rem" }}>
                Comuns
              </SectionTitle>
              <TagsContainer>
                {["macos", "windows", "vscode", "node"]
                  .filter((id) => !selectedTechs.find((st) => st.id === id))
                  .map((id) => (
                    <CommonButton
                      key={id}
                      onClick={() => {
                        const tech = TECHS.find((t) => t.id === id);
                        if (tech) addTech(tech);
                      }}
                    >
                      + {id}
                    </CommonButton>
                  ))}
              </TagsContainer>
            </CommonSection>
          </SelectionCard>

          <RecommendationCard>
            <InfoIconWrapper>
              <Info size={16} />
            </InfoIconWrapper>
            <p>
              Recomendamos incluir os sistemas operacionais (
              <strong style={{ color: "#e2e8f0" }}>macOS/Windows</strong>) e sua
              IDE para evitar poluir o repositório com arquivos de cache locais.
            </p>
          </RecommendationCard>
        </SelectionColumn>

        <PreviewColumn>
          <PreviewCard>
            <PreviewHeader>
              <HeaderTitleGroup>
                <HeaderIcon>
                  <FileCode size={20} />
                </HeaderIcon>
                <HeaderTitle>.gitignore Preview</HeaderTitle>
              </HeaderTitleGroup>

              <CopyButton
                disabled={!generatedContent}
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check size={14} style={{ color: "#22c55e" }} />
                ) : (
                  <Copy size={14} />
                )}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </PreviewHeader>

            <CodeContainer>
              {generatedContent ? (
                <CodeContent>{generatedContent}</CodeContent>
              ) : (
                <EmptyState>
                  <Layers size={64} style={{ color: "#64748b" }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      Gerador Pronto
                    </p>
                    <p style={{ fontSize: "0.875rem", maxWidth: "20rem" }}>
                      Adicione tecnologias à esquerda para compor seu arquivo
                      .gitignore.
                    </p>
                  </div>
                </EmptyState>
              )}
            </CodeContainer>

            <PreviewFooter>
              <FooterInfo>
                <TemplateDots>
                  <div style={{ backgroundColor: "#2563eb" }}></div>
                  <div style={{ backgroundColor: "#4f46e5" }}></div>
                  <div style={{ backgroundColor: "#9333ea" }}></div>
                </TemplateDots>
                <FooterText>Merge de templates otimizado</FooterText>
              </FooterInfo>
              <VersionBadge>
                <VersionDot />
                <VersionText>Git Toolkit v1</VersionText>
              </VersionBadge>
            </PreviewFooter>
          </PreviewCard>
        </PreviewColumn>
      </Grid>
    </Container>
  );
};

export default GitignoreGenerator;
