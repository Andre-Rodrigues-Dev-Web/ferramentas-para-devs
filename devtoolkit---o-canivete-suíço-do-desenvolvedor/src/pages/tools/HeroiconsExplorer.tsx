import React, { useState, useMemo, useEffect } from "react";
import * as Icons from "lucide-react";
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Info,
  FileCode,
  ExternalLink,
  X,
  Filter,
  MousePointer2,
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
  ExplorerCard,
  BlurBackground,
  ControlsWrapper,
  SearchWrapper,
  SearchIcon,
  SearchInput,
  ClearButton,
  FiltersWrapper,
  FilterLabel,
  FilterText,
  StyleButtons,
  StyleButton,
  ResultsInfo,
  ResultCount,
  ResultHint,
  HintItem,
  Grid,
  IconCard,
  IconPreview,
  IconName,
  EmptyState,
  EmptyIconBg,
  EmptyTitle,
  EmptyText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  IconDetailHeader,
  LargeIconPreview,
  IconDetailName,
  TagList,
  StyleTag,
  Tag,
  CloseModalButton,
  ModalBody,
  CopyGrid,
  CopyAction,
  CopyIcon,
  CopyLabel,
  CopyTitle,
  CopyDesc,
  CopiedOverlay,
  InstallInfo,
  InstallIcon,
  InstallTitle,
  InstallText,
  SearchTips,
  TipItem,
  TipCode,
} from "./styles/HeroiconsExplorer.styles";

type IconStyle = "outline" | "solid" | "mini";

interface HeroIcon {
  name: string;
  tags: string[];
}

const POPULAR_ICONS: HeroIcon[] = [
  { name: "Home", tags: ["house", "dashboard", "index", "inicio"] },
  { name: "User", tags: ["account", "profile", "person", "usuario"] },
  { name: "Settings", tags: ["gear", "cog", "config", "ajustes"] },
  { name: "Search", tags: ["find", "magnifier", "lookup", "busca"] },
  { name: "Bell", tags: ["notification", "alert", "notice", "notificacao"] },
  { name: "Mail", tags: ["envelope", "email", "message", "correio"] },
  { name: "Trash", tags: ["delete", "remove", "bin", "lixeira"] },
  { name: "Edit", tags: ["pencil", "write", "update", "editar"] },
  { name: "Plus", tags: ["add", "create", "new", "adicionar"] },
  { name: "Minus", tags: ["subtract", "remove", "decrease", "subtrair"] },
  { name: "ChevronRight", tags: ["arrow", "next", "direction", "proximo"] },
  { name: "ChevronLeft", tags: ["arrow", "back", "previous", "voltar"] },
  { name: "Calendar", tags: ["date", "event", "schedule", "calendario"] },
  { name: "Clock", tags: ["time", "history", "recent", "relogio"] },
  { name: "Camera", tags: ["photo", "image", "picture", "foto"] },
  { name: "MapPin", tags: ["location", "place", "gps", "localizacao"] },
  { name: "Globe", tags: ["world", "earth", "network", "browser", "globo"] },
  { name: "Heart", tags: ["love", "like", "favorite", "coracao"] },
  { name: "Star", tags: ["rate", "favorite", "bookmark", "estrela"] },
  { name: "Download", tags: ["save", "get", "receive", "baixar"] },
  { name: "Upload", tags: ["send", "share", "push", "enviar"] },
  { name: "RefreshCw", tags: ["sync", "reload", "update", "atualizar"] },
  { name: "Terminal", tags: ["code", "command", "cli", "console"] },
  { name: "ShieldCheck", tags: ["secure", "protect", "safe", "escudo"] },
  { name: "Lock", tags: ["private", "secure", "encrypt", "cadeado"] },
  { name: "Unlock", tags: ["public", "open", "decrypt", "aberto"] },
  { name: "ExternalLink", tags: ["new-tab", "redirect", "goto", "link"] },
  { name: "Eye", tags: ["view", "watch", "show", "olho"] },
  { name: "EyeOff", tags: ["hide", "private", "hidden", "escondido"] },
  { name: "Sun", tags: ["light", "day", "brightness", "sol"] },
  { name: "Moon", tags: ["dark", "night", "theme", "lua"] },
  { name: "Briefcase", tags: ["work", "job", "business", "maleta"] },
  { name: "ShoppingBag", tags: ["cart", "store", "buy", "sacola"] },
  { name: "CreditCard", tags: ["payment", "bank", "money", "cartao"] },
  { name: "FileText", tags: ["doc", "content", "article", "arquivo"] },
  { name: "Folder", tags: ["directory", "storage", "files", "pasta"] },
  { name: "Layout", tags: ["grid", "view", "structure", "layout"] },
  { name: "Layers", tags: ["stack", "design", "z-index", "camadas"] },
  { name: "Mic", tags: ["audio", "record", "voice", "microfone"] },
  { name: "Video", tags: ["movie", "record", "stream", "video"] },
  { name: "Menu", tags: ["hamburger", "nav", "list", "menu"] },
  { name: "Filter", tags: ["sort", "refine", "adjust", "filtro"] },
  { name: "Link", tags: ["url", "attach", "anchor", "link"] },
  { name: "Wifi", tags: ["internet", "connection", "signal", "wifi"] },
  { name: "Cloud", tags: ["storage", "online", "weather", "nuvem"] },
];

const HeroiconsExplorer: React.FC = () => {
  const [search, setSearch] = useState("");
  const [style, setStyle] = useState<IconStyle>("outline");
  const [selectedIcon, setSelectedIcon] = useState<HeroIcon | null>(null);
  const [copiedType, setCopiedType] = useState<"svg" | "jsx" | null>(null);

  // Advanced search and filter logic
  const filteredIcons = useMemo(() => {
    let query = search.toLowerCase();

    // Check for style prefixes in search query: "solid:home", "mini:user", etc.
    const stylePrefixes: { prefix: string; style: IconStyle }[] = [
      { prefix: "solid:", style: "solid" },
      { prefix: "outline:", style: "outline" },
      { prefix: "mini:", style: "mini" },
    ];

    let activeStyleInQuery: IconStyle | null = null;
    for (const item of stylePrefixes) {
      if (query.startsWith(item.prefix)) {
        activeStyleInQuery = item.style;
        query = query.replace(item.prefix, "").trim();
        break;
      }
    }

    // If query has style, we temporarily use that style for rendering if requested by filtering
    // but the request is to "allow filtering by style in addition to name and tags"
    // So we combine the global style state with the query-based override.

    return POPULAR_ICONS.filter((icon) => {
      const matchesSearch =
        icon.name.toLowerCase().includes(query) ||
        icon.tags.some((tag) => tag.includes(query));

      // If we used a prefix, we only show matches.
      // If no prefix, we show all matches for the current global style.
      return matchesSearch;
    });
  }, [search]);

  // Effect to sync global style state if prefix is used (optional UX choice)
  useEffect(() => {
    const query = search.toLowerCase();
    if (query.startsWith("solid:")) setStyle("solid");
    else if (query.startsWith("outline:")) setStyle("outline");
    else if (query.startsWith("mini:")) setStyle("mini");
  }, [search]);

  const getIconComponent = (name: string, overrideStyle?: IconStyle) => {
    const IconComp = (Icons as any)[name];
    if (!IconComp) return <Icons.HelpCircle />;

    const currentStyle = overrideStyle || style;
    const size = currentStyle === "mini" ? 20 : 24;
    const strokeWidth = currentStyle === "outline" ? 1.5 : 2;

    return <IconComp size={size} strokeWidth={strokeWidth} />;
  };

  const copyToClipboard = (type: "svg" | "jsx") => {
    if (!selectedIcon) return;

    const code =
      type === "svg"
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="${style === "outline" ? "none" : "currentColor"}" viewBox="0 0 24 24" stroke-width="${style === "outline" ? "1.5" : "0"}" stroke="currentColor" class="w-6 h-6">\n  <path stroke-linecap="round" stroke-linejoin="round" d="..." />\n</svg>`
        : `import { ${selectedIcon.name}Icon } from '@heroicons/react/24/${style}';\n\nfunction MyComponent() {\n  return <${selectedIcon.name}Icon className="h-6 w-6 text-blue-500" />;\n}`;

    navigator.clipboard.writeText(code);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const clearSearch = () => setSearch("");

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Sparkles size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Heroicons Explorer</Title>
            <Description>
              Encontre o ícone perfeito filtrando por nome, tags ou estilo.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <ExternalLinkButton
          href="https://heroicons.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink size={14} /> Heroicons.com
        </ExternalLinkButton>
      </Header>

      <ExplorerCard>
        {/* Background visual detail */}
        <BlurBackground />

        <ControlsWrapper>
          <SearchWrapper>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="Ex: 'home', 'user' ou 'solid:search' para filtrar por estilo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <ClearButton onClick={clearSearch}>
                <X size={18} />
              </ClearButton>
            )}
          </SearchWrapper>

          <FiltersWrapper>
            <FilterLabel>
              <Filter size={14} />
              <FilterText>Estilo:</FilterText>
            </FilterLabel>
            <StyleButtons>
              {(["outline", "solid", "mini"] as IconStyle[]).map((s) => (
                <StyleButton
                  key={s}
                  onClick={() => setStyle(s)}
                  $active={style === s}
                >
                  {s}
                </StyleButton>
              ))}
            </StyleButtons>
          </FiltersWrapper>
        </ControlsWrapper>

        {/* Results Info */}
        <ResultsInfo>
          <ResultCount>{filteredIcons.length} Ícones encontrados</ResultCount>
          <ResultHint>
            <HintItem>
              <MousePointer2 size={10} /> Clique para detalhar
            </HintItem>
          </ResultHint>
        </ResultsInfo>

        <Grid>
          {filteredIcons.map((icon) => (
            <IconCard
              key={icon.name}
              onClick={() => setSelectedIcon(icon)}
              $active={selectedIcon?.name === icon.name}
            >
              <IconPreview>{getIconComponent(icon.name)}</IconPreview>
              <IconName $active={selectedIcon?.name === icon.name}>
                {icon.name}
              </IconName>
            </IconCard>
          ))}
        </Grid>

        {filteredIcons.length === 0 && (
          <EmptyState>
            <EmptyIconBg>
              <Icons.SearchX size={64} />
            </EmptyIconBg>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <EmptyTitle>Nenhum ícone corresponde à sua busca</EmptyTitle>
              <EmptyText>
                Tente nomes mais genéricos ou verifique se não há filtros de
                estilo conflitantes.
              </EmptyText>
            </div>
            <Button variant="outline" className="mt-8" onClick={clearSearch}>
              Limpar Filtros
            </Button>
          </EmptyState>
        )}
      </ExplorerCard>

      {/* Selected Icon Detail Drawer */}
      {selectedIcon && (
        <ModalOverlay onClick={() => setSelectedIcon(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <IconDetailHeader>
                <LargeIconPreview>
                  <div>{getIconComponent(selectedIcon.name)}</div>
                </LargeIconPreview>
                <div>
                  <IconDetailName>{selectedIcon.name}</IconDetailName>
                  <TagList>
                    <StyleTag>{style}</StyleTag>
                    {selectedIcon.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                </div>
              </IconDetailHeader>
              <CloseModalButton onClick={() => setSelectedIcon(null)}>
                <X size={20} />
              </CloseModalButton>
            </ModalHeader>

            <ModalBody>
              <CopyGrid>
                <CopyAction onClick={() => copyToClipboard("svg")}>
                  <CopyIcon>
                    <FileCode size={32} />
                  </CopyIcon>
                  <CopyLabel>
                    <CopyTitle>COPIAR SVG</CopyTitle>
                    <CopyDesc>Código HTML puro</CopyDesc>
                  </CopyLabel>
                  {copiedType === "svg" && (
                    <CopiedOverlay>
                      <Check size={32} />
                    </CopiedOverlay>
                  )}
                </CopyAction>
                <CopyAction onClick={() => copyToClipboard("jsx")}>
                  <CopyIcon>
                    <Icons.Atom size={32} />
                  </CopyIcon>
                  <CopyLabel>
                    <CopyTitle>COPIAR JSX</CopyTitle>
                    <CopyDesc>Para React/Next.js</CopyDesc>
                  </CopyLabel>
                  {copiedType === "jsx" && (
                    <CopiedOverlay>
                      <Check size={32} />
                    </CopiedOverlay>
                  )}
                </CopyAction>
              </CopyGrid>

              <InstallInfo>
                <InstallIcon>
                  <Info size={20} />
                </InstallIcon>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <InstallTitle>Instalação Recomendada</InstallTitle>
                  <InstallText>
                    Use o pacote oficial <code>@heroicons/react</code> para uma
                    integração perfeita com componentes Tailwind CSS.
                  </InstallText>
                </div>
              </InstallInfo>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {/* Footer / Search Tips */}
      {!search && (
        <SearchTips>
          <SearchTip label="Por Estilo" code="solid:home" />
          <SearchTip label="Por Tag" code="correio" />
          <SearchTip label="Preciso" code="ChevronRight" />
        </SearchTips>
      )}
    </Container>
  );
};

const SearchTip = ({ label, code }: { label: string; code: string }) => (
  <TipItem>
    <span>{label}:</span>
    <TipCode>{code}</TipCode>
  </TipItem>
);

export default HeroiconsExplorer;
