
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // FRONT-END VISUAL
  { id: '1', title: 'CSS Gradient', slug: 'css-gradient', category: 'Front-end Visual', icon: 'Palette', description: 'Crie gradientes lineares e radiais complexos.', isImplemented: true },
  { id: '2', title: 'Clippy', slug: 'clippy', category: 'Front-end Visual', icon: 'Scissors', description: 'Gerador de caminhos clip-path para CSS.', isImplemented: true },
  { id: '3', title: 'Animista', slug: 'animista', category: 'Front-end Visual', icon: 'Wind', description: 'Biblioteca de animações CSS prontas para usar.', isImplemented: true },
  { id: '4', title: 'Neumorphism', slug: 'neumorphism', category: 'Front-end Visual', icon: 'Box', description: 'Gere sombras e profundidade estilo neumórfico.', isImplemented: true },
  { id: '5', title: 'Fancy Border', slug: 'fancy-border', category: 'Front-end Visual', icon: 'Square', description: 'Crie bordas arredondadas e formas orgânicas.', isImplemented: true },
  { id: '6', title: 'Box Shadow', slug: 'box-shadow', category: 'Front-end Visual', icon: 'Layers', description: 'Gerador visual de sombras (box-shadow) com preview.', isImplemented: true },
  { id: '7', title: 'Layoutit Grid', slug: 'layoutit-grid', category: 'Front-end Visual', icon: 'Grid', description: 'Designer visual para CSS Grid.', isImplemented: true },
  { id: '8', title: 'Glassmorphism', slug: 'glassmorphism', category: 'Front-end Visual', icon: 'GlassWater', description: 'Efeito de vidro fosco para interfaces modernas.', isImplemented: true },

  // ASSETS
  { id: '9', title: 'TinyPNG', slug: 'tinypng', category: 'Assets', icon: 'Image', description: 'Comprime imagens PNG e JPEG (Simulado).', isImplemented: true },
  { id: '10', title: 'SVGOMG', slug: 'svgomg', category: 'Assets', icon: 'FileCode', description: 'Otimizador de arquivos SVG.', isImplemented: true },
  { id: '11', title: 'Coolors', slug: 'coolors', category: 'Assets', icon: 'Paintbrush', description: 'Gerador de paletas de cores harmônicas.', isImplemented: true },
  { id: '12', title: 'Favicon Gen', slug: 'favicon-gen', category: 'Assets', icon: 'Bookmark', description: 'Converta imagens para diversos tamanhos de favicon.', isImplemented: true },
  { id: '13', title: 'Heroicons', slug: 'heroicons', category: 'Assets', icon: 'Sparkles', description: 'Explore ícones SVG gratuitos da Tailwind Labs.', isImplemented: true },
  { id: '14', title: 'Base64 Encoder', slug: 'base64-encoder', category: 'Assets', icon: 'Binary', description: 'Converta arquivos ou texto para Base64.', isImplemented: true },

  // JS & LÓGICA
  { id: '15', title: 'Regex Tester', slug: 'regex-tester', category: 'JS & Lógica', icon: 'Brackets', description: 'Teste e valide suas expressões regulares.', isImplemented: true },
  { id: '16', title: 'JSON Formatter', slug: 'json-formatter', category: 'JS & Lógica', icon: 'FileJson', description: 'Formate, valide e embeleze seu JSON.', isImplemented: true },
  { id: '17', title: 'BundlePhobia', slug: 'bundlephobia', category: 'JS & Lógica', icon: 'Package', description: 'Verifique o impacto de pacotes NPM no seu bundle.', isImplemented: true },
  { id: '18', title: 'CanIUse', slug: 'caniuse', category: 'JS & Lógica', icon: 'Monitor', description: 'Consulte compatibilidade de features em navegadores.', isImplemented: true },
  { id: '19', title: 'Keycode Info', slug: 'keycode-info', category: 'JS & Lógica', icon: 'Keyboard', description: 'Identifique códigos de teclas pressionadas.', isImplemented: true },
  { id: '20', title: 'Minifier JS/CSS', slug: 'minifier', category: 'JS & Lógica', icon: 'Minimize', description: 'Reduza o tamanho dos seus arquivos de código.', isImplemented: true },

  // BACK-END & SEGURANÇA
  { id: '21', title: 'JWT Decoder', slug: 'jwt-decoder', category: 'Back-end & Segurança', icon: 'ShieldCheck', description: 'Decodifique tokens JWT para ver seu conteúdo.', isImplemented: true },
  { id: '22', title: 'Bcrypt Gen', slug: 'bcrypt-gen', category: 'Back-end & Segurança', icon: 'Lock', description: 'Gere e verifique hashes Bcrypt para senhas.', isImplemented: true },
  { id: '23', title: 'UUID Gen', slug: 'uuid-gen', category: 'Back-end & Segurança', icon: 'Fingerprint', description: 'Gere identificadores únicos universais (UUID).', isImplemented: true },
  { id: '24', title: 'MD5/SHA Gen', slug: 'hash-gen', category: 'Back-end & Segurança', icon: 'Key', description: 'Gere hashes MD5, SHA-1, SHA-256 e outros.', isImplemented: true },
  { id: '25', title: 'Hoppscotch', slug: 'hoppscotch', category: 'Back-end & Segurança', icon: 'Globe', description: 'Cliente REST para testar suas APIs de forma rápida.', isImplemented: true },

  // DADOS
  { id: '26', title: 'SQL Fiddle', slug: 'sql-fiddle', category: 'Dados', icon: 'Database', description: 'Teste e compartilhe queries SQL no navegador.', isImplemented: true },
  { id: '27', title: 'Mock Data Gen', slug: 'mock-data-gen', category: 'Dados', icon: 'Table', description: 'Crie dados falsos para testes de API.', isImplemented: true },
  { id: '28', title: 'DB Diagrams', slug: 'db-diagrams', category: 'Dados', icon: 'Network', description: 'Desenhe diagramas de banco de dados visualmente.', isImplemented: true },
  { id: '29', title: 'URL Encoder', slug: 'url-encoder', category: 'Dados', icon: 'Link', description: 'Codifique ou decodifique parâmetros de URL.', isImplemented: true },

  // INFRA
  { id: '30', title: 'Crontab Guru', slug: 'crontab-guru', category: 'Infra', icon: 'Clock', description: 'Editor visual e explicador de expressões cron.', isImplemented: true },
  { id: '31', title: 'Chmod Calc', slug: 'chmod-calc', category: 'Infra', icon: 'HardDrive', description: 'Calculadora visual de permissões Linux.', isImplemented: true },
  { id: '32', title: 'Nginx Config', slug: 'nginx-config', category: 'Infra', icon: 'Cpu', description: 'Gerador de arquivos de configuração para Nginx.', isImplemented: true },
  { id: '33', title: 'Docker Hub Search', slug: 'docker-search', category: 'Infra', icon: 'Container', description: 'Pesquise imagens oficiais no Docker Hub.', isImplemented: true },
  { id: '34', title: 'Gitignore Gen', slug: 'gitignore-gen', category: 'Infra', icon: 'FileX', description: 'Gere arquivos .gitignore baseados no seu stack.', isImplemented: true },
  { id: '35', title: 'DNS Checker', slug: 'dns-checker', category: 'Infra', icon: 'SearchCode', description: 'Verifique a propagação de DNS globalmente.', isImplemented: true },
  { id: '36', title: 'My IP', slug: 'my-ip', category: 'Infra', icon: 'Server', description: 'Verifique seu endereço IP público e detalhes.', isImplemented: true },

  // ÚTEIS
  { id: '37', title: 'Diffchecker', slug: 'diffchecker', category: 'Úteis', icon: 'Copy', description: 'Compare a diferença entre dois blocos de texto.', isImplemented: true },
  { id: '38', title: 'Timestamp Converter', slug: 'timestamp-converter', category: 'Úteis', icon: 'History', description: 'Converta Unix Timestamp para data legível.', isImplemented: true },
  { id: '39', title: 'Lorem Ipsum', slug: 'lorem-ipsum', category: 'Úteis', icon: 'Type', description: 'Gerador de texto temporário para layouts.', isImplemented: true },
  { id: '40', title: 'Carbon Code', slug: 'carbon-code', category: 'Úteis', icon: 'Camera', description: 'Crie imagens bonitas do seu código.', isImplemented: true },
  { id: '41', title: 'Project Boilerplates', slug: 'project-boilerplates', category: 'Úteis', icon: 'Rocket', description: 'Comece seus projetos em segundos com 30+ templates.', isImplemented: true },
];

export const CATEGORIES = [
  'Front-end Visual',
  'Assets',
  'JS & Lógica',
  'Back-end & Segurança',
  'Dados',
  'Infra',
  'Úteis'
];
