import React, { useState, useMemo } from "react";
import {
  Rocket,
  Search,
  Copy,
  Check,
  ExternalLink,
  Filter,
  Monitor,
  Smartphone,
  Laptop,
  Server,
  Zap,
  Globe,
  Terminal,
  Code2,
  Layers,
  Sparkles,
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
  FilterBar,
  SearchWrapper,
  SearchInput,
  CategoriesWrapper,
  CategoryButton,
  Grid,
  Card,
  PopularBadge,
  PopularContent,
  CardHeader,
  IconContainer,
  CardTitle,
  CardCategory,
  CardDescription,
  StackWrapper,
  StackTag,
  CommandBox,
  CommandHeader,
  CommandLabel,
  CopyButton,
  CommandCode,
  EmptyState,
  EmptyIcon,
  EmptyText,
  FooterTip,
  TipIcon,
} from "./styles/BoilerplateGenerator.styles";

type BoilerplateCategory =
  | "Tudo"
  | "Web"
  | "Mobile"
  | "Desktop"
  | "Backend"
  | "Fullstack";

interface Boilerplate {
  id: string;
  name: string;
  description: string;
  category: BoilerplateCategory;
  stack: string[];
  command: string;
  url: string;
  isPopular?: boolean;
}

const BOILERPLATES: Boilerplate[] = [
  // WEB
  {
    id: "w1",
    name: "Next.js App",
    description: "O framework React para a web moderna com SSR e App Router.",
    category: "Web",
    stack: ["React", "Next.js", "Tailwind", "TS"],
    command: "npx create-next-app@latest",
    url: "https://nextjs.org/docs",
  },
  {
    id: "w2",
    name: "Vite + React",
    description: "Front-end extremamente rápido com Vite e React.",
    category: "Web",
    stack: ["React", "Vite", "TS"],
    command: "npm create vite@latest my-react-app -- --template react-ts",
    url: "https://vitejs.dev/",
  },
  {
    id: "w3",
    name: "Vue 3 + Vite",
    description: "A evolução do Vue com Composition API e Pinia.",
    category: "Web",
    stack: ["Vue", "Vite", "Pinia"],
    command: "npm create vue@latest",
    url: "https://vuejs.org/",
  },
  {
    id: "w4",
    name: "Astro Blog",
    description: "Sites focados em conteúdo com zero JS por padrão.",
    category: "Web",
    stack: ["Astro", "Markdown"],
    command: "npm create astro@latest -- --template blog",
    url: "https://astro.build/",
  },
  {
    id: "w5",
    name: "SvelteKit",
    description: "A maneira mais rápida de construir apps com Svelte.",
    category: "Web",
    stack: ["Svelte", "Vite"],
    command: "npm create svelte@latest my-app",
    url: "https://kit.svelte.dev/",
  },
  {
    id: "w6",
    name: "Nuxt 3",
    description: "Framework intuitivo para Vue.js de alta performance.",
    category: "Web",
    stack: ["Vue", "Nuxt", "Nitro"],
    command: "npx nuxi@latest init my-app",
    url: "https://nuxt.com/",
  },
  {
    id: "w7",
    name: "Remix",
    description: "Focado em fundamentos da web e UX resiliente.",
    category: "Web",
    stack: ["React", "Edge"],
    command: "npx create-remix@latest",
    url: "https://remix.run/",
  },
  {
    id: "w8",
    name: "SolidStart",
    description: "O framework fullstack para SolidJS.",
    category: "Web",
    stack: ["SolidJS", "Vite"],
    command: "npm create solid@latest",
    url: "https://start.solidjs.com/",
  },
  {
    id: "w9",
    name: "Gatsby",
    description: "Gerador de sites estáticos com GraphQL.",
    category: "Web",
    stack: ["React", "GraphQL"],
    command: "npx gatsby new",
    url: "https://www.gatsbyjs.com/",
  },
  {
    id: "w10",
    name: "Qwik City",
    description: 'Apps com "resumability" e performance instantânea.',
    category: "Web",
    stack: ["Qwik", "Vite"],
    command: "npm create qwik@latest",
    url: "https://qwik.builder.io/",
  },

  // MOBILE
  {
    id: "m1",
    name: "Expo (React Native)",
    description: "Desenvolva apps iOS e Android com uma única base React.",
    category: "Mobile",
    stack: ["React Native", "Expo"],
    command: "npx create-expo-app my-app",
    url: "https://expo.dev/",
    isPopular: true,
  },
  {
    id: "m2",
    name: "Flutter Starter",
    description: "Framework do Google para apps nativos compilados.",
    category: "Mobile",
    stack: ["Dart", "Flutter"],
    command: "flutter create my_app",
    url: "https://flutter.dev/",
  },
  {
    id: "m3",
    name: "Ionic React",
    description: "Cross-platform com tecnologias web e Capacitor.",
    category: "Mobile",
    stack: ["React", "Capacitor"],
    command: "ionic start myApp tabs --type=react",
    url: "https://ionicframework.com/",
  },
  {
    id: "m4",
    name: "KMP Compose",
    description: "Kotlin Multiplatform para Android e iOS.",
    category: "Mobile",
    stack: ["Kotlin", "Compose"],
    command:
      "git clone https://github.com/JetBrains/compose-multiplatform-template",
    url: "https://www.jetbrains.com/lp/compose-multiplatform/",
  },
  {
    id: "m5",
    name: "NativeScript",
    description: "Acesso total a APIs nativas com JS/TS.",
    category: "Mobile",
    stack: ["JS", "Nativo"],
    command: "ns create my-app --template @nativescript/template-blank-ts",
    url: "https://nativescript.org/",
  },
  {
    id: "m6",
    name: "SwiftUI Boilerplate",
    description: "Ponto de partida para apps modernos da Apple.",
    category: "Mobile",
    stack: ["Swift", "SwiftUI"],
    command: "xcode-select --install",
    url: "https://developer.apple.com/xcode/",
  },

  // DESKTOP
  {
    id: "d1",
    name: "Electron Forge",
    description: "Apps Desktop com ferramentas web (Chromium/Node).",
    category: "Desktop",
    stack: ["Electron", "React", "Node"],
    command: "npx create-electron-app my-new-app --template=typescript-webpack",
    url: "https://www.electronjs.org/",
  },
  {
    id: "d2",
    name: "Tauri + Svelte",
    description: "Apps desktop leves e seguros feitos com Rust.",
    category: "Desktop",
    stack: ["Rust", "Svelte", "Vite"],
    command: "npm create tauri-app@latest",
    url: "https://tauri.app/",
  },
  {
    id: "d3",
    name: "Wails (Go)",
    description: "Construa apps desktop nativos com Go e tecnologias web.",
    category: "Desktop",
    stack: ["Go", "React", "Vite"],
    command: "wails init -n myproject -t react",
    url: "https://wails.io/",
  },
  {
    id: "d4",
    name: "NW.js",
    description: "Rode apps web como nativos, acesso direto ao Node.js.",
    category: "Desktop",
    stack: ["Node", "HTML5"],
    command: "npm install -g nw",
    url: "https://nwjs.io/",
  },
  {
    id: "d5",
    name: "PySide6 (Qt)",
    description: "Interfaces desktop profissionais com Python.",
    category: "Desktop",
    stack: ["Python", "Qt"],
    command: "pip install PySide6",
    url: "https://www.qt.io/qt-for-python",
  },

  // BACKEND
  {
    id: "b1",
    name: "NestJS Starter",
    description: "Framework Node.js progressivo para apps escaláveis.",
    category: "Backend",
    stack: ["Node", "TS", "NestJS"],
    command: "npx @nestjs/cli new project-name",
    url: "https://nestjs.com/",
    isPopular: true,
  },
  {
    id: "b2",
    name: "Fastify API",
    description: "O framework web mais rápido para Node.js.",
    category: "Backend",
    stack: ["Node", "Fastify"],
    command: "npm init fastify",
    url: "https://www.fastify.io/",
  },
  {
    id: "b3",
    name: "Express + Prisma",
    description: "Boilerplate clássico de API com ORM moderno.",
    category: "Backend",
    stack: ["Express", "Prisma", "Postgres"],
    command: "npx dlx prisma init",
    url: "https://www.prisma.io/",
  },
  {
    id: "b4",
    name: "Go Fiber",
    description: "Framework web inspirado no Express escrito em Go.",
    category: "Backend",
    stack: ["Go", "Fiber"],
    command: "go mod init myapp",
    url: "https://gofiber.io/",
  },
  {
    id: "b5",
    name: "FastAPI (Python)",
    description: "API moderna e performática baseada em tipos Python.",
    category: "Backend",
    stack: ["Python", "FastAPI"],
    command: "pip install fastapi uvicorn",
    url: "https://fastapi.tiangolo.com/",
  },
  {
    id: "b6",
    name: "Rust Axum",
    description: "Framework web focado em ergonomia e modularidade.",
    category: "Backend",
    stack: ["Rust", "Axum", "Tokio"],
    command: "cargo new my-server",
    url: "https://github.com/tokio-rs/axum",
  },

  // FULLSTACK
  {
    id: "f1",
    name: "T3 Stack",
    description: "O melhor jeito de começar um app Fullstack Type-Safe.",
    category: "Fullstack",
    stack: ["Next.js", "tRPC", "Prisma", "Tailwind"],
    command: "npx create-t3-app@latest",
    url: "https://create.t3.gg/",
    isPopular: true,
  },
  {
    id: "f2",
    name: "Laravel 11",
    description: "Framework PHP para artesãos da web.",
    category: "Fullstack",
    stack: ["PHP", "Laravel", "Blade"],
    command: "composer create-project laravel/laravel my-app",
    url: "https://laravel.com/",
  },
  {
    id: "f3",
    name: "Django + HTMX",
    description:
      "Apps dinâmicos com a robustez do Django e simplicidade do HTMX.",
    category: "Fullstack",
    stack: ["Python", "Django", "HTMX"],
    command: "django-admin startproject mysite",
    url: "https://www.djangoproject.com/",
  },
];

const BoilerplateGenerator: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BoilerplateCategory>("Tudo");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return BOILERPLATES.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory = category === "Tudo" || item.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const copyCommand = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Web":
        return <Globe size={24} className="web" />;
      case "Mobile":
        return <Smartphone size={24} className="mobile" />;
      case "Desktop":
        return <Monitor size={24} className="desktop" />;
      case "Backend":
        return <Server size={24} className="backend" />;
      case "Fullstack":
        return <Layers size={24} className="fullstack" />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Rocket size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Project Boilerplates</Title>
            <Description>
              Ponto de partida instantâneo para mais de 30 stacks modernas.
            </Description>
          </TitleContainer>
        </HeaderContent>
      </Header>

      {/* Filters Bar */}
      <FilterBar>
        <SearchWrapper>
          <Search size={20} />
          <SearchInput
            type="text"
            placeholder="Pesquisar por stack ou framework (ex: react, rust, go...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        <CategoriesWrapper>
          {(
            [
              "Tudo",
              "Web",
              "Mobile",
              "Desktop",
              "Backend",
              "Fullstack",
            ] as BoilerplateCategory[]
          ).map((cat) => (
            <CategoryButton
              key={cat}
              $isActive={category === cat}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </CategoryButton>
          ))}
        </CategoriesWrapper>
      </FilterBar>

      {/* Grid */}
      <Grid>
        {filtered.map((item) => (
          <Card key={item.id}>
            {item.isPopular && (
              <PopularBadge>
                <PopularContent>
                  <Sparkles size={10} /> Em Alta
                </PopularContent>
              </PopularBadge>
            )}

            <CardHeader>
              <IconContainer>{getCategoryIcon(item.category)}</IconContainer>
              <div>
                <CardTitle>{item.name}</CardTitle>
                <CardCategory>{item.category}</CardCategory>
              </div>
            </CardHeader>

            <CardDescription>{item.description}</CardDescription>

            <StackWrapper>
              {item.stack.map((s) => (
                <StackTag key={s}>{s}</StackTag>
              ))}
            </StackWrapper>

            <div className="space-y-4">
              <CommandBox>
                <CommandHeader>
                  <CommandLabel>
                    <Terminal size={10} /> Comando de Instalação
                  </CommandLabel>
                  <CopyButton
                    $copied={copiedId === item.id}
                    onClick={() => copyCommand(item.id, item.command)}
                  >
                    {copiedId === item.id ? (
                      <Check size={12} style={{ marginRight: "0.25rem" }} />
                    ) : (
                      <Copy size={12} style={{ marginRight: "0.25rem" }} />
                    )}
                    {copiedId === item.id ? "Copiado!" : "Copiar"}
                  </CopyButton>
                </CommandHeader>
                <CommandCode>{item.command}</CommandCode>
              </CommandBox>

              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl border-slate-800"
                onClick={() => window.open(item.url, "_blank")}
                style={{ justifyContent: "center" }}
              >
                Documentação{" "}
                <ExternalLink
                  size={14}
                  style={{ marginLeft: "0.5rem", opacity: 0.5 }}
                />
              </Button>
            </div>
          </Card>
        ))}
      </Grid>

      {filtered.length === 0 && (
        <EmptyState>
          <EmptyIcon>
            <Code2 size={64} />
          </EmptyIcon>
          <EmptyText>
            <h3>Nenhum boilerplate encontrado</h3>
            <p>Tente buscar por termos mais genéricos ou mude a categoria.</p>
          </EmptyText>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("Tudo");
            }}
          >
            Limpar Filtros
          </Button>
        </EmptyState>
      )}

      {/* Footer Disclaimer */}
      <FooterTip>
        <TipIcon>
          <Zap size={20} />
        </TipIcon>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <p
            style={{
              fontWeight: 700,
              color: "#e2e8f0",
              textTransform: "uppercase",
              letterSpacing: "-0.025em",
            }}
          >
            Dica Pro
          </p>
          <p>
            A maioria desses boilerplates exige que você tenha o{" "}
            <strong style={{ color: "#94a3b8" }}>Node.js (LTS)</strong>{" "}
            instalado em sua máquina. Para stacks em Rust, Go ou Python,
            certifique-se de ter os respectivos runtimes configurados no seu{" "}
            <code style={{ color: "#fb923c" }}>$PATH</code>.
          </p>
        </div>
      </FooterTip>
    </Container>
  );
};

export default BoilerplateGenerator;
