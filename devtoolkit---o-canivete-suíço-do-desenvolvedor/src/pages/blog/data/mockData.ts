export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  author: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "lancamento-devtoolkit-2-0-beta",
    title: "Lançamento do DevToolkit 2.0 Beta",
    date: "27 de Janeiro, 2026",
    excerpt:
      "Estamos felizes em anunciar a versão 2.0 do DevToolkit. Com um design totalmente renovado, novas ferramentas de CSS e performance otimizada. Agora open source para todos.",
    content: `
      <p>Estamos muito empolgados em finalmente compartilhar o <strong>DevToolkit 2.0</strong> com a comunidade!</p>
      <p>Esta atualização traz uma reformulação completa da interface, focada na usabilidade e na estética moderna.</p>
      <h3>O que há de novo?</h3>
      <ul>
        <li>Interface Glassmorphism totalmente nova</li>
        <li>Mais de 10 novas ferramentas essenciais</li>
        <li>Melhorias significativas de performance</li>
        <li>Código aberto no GitHub</li>
      </ul>
      <p>Confira todas as novidades e comece a usar agora mesmo!</p>
    `,
    tags: ["Release", "v2.0"],
    author: "Equipe DevToolkit",
  },
  {
    id: "2",
    slug: "novas-ferramentas-glassmorphism",
    title: "Novas Ferramentas de Glassmorphism",
    date: "15 de Janeiro, 2026",
    excerpt:
      "Adicionamos um gerador completo de Glassmorphism. Crie efeitos de vidro fosco com controle total sobre desfoque, transparência e cor.",
    content: `
      <p>O Glassmorphism continua sendo uma tendência forte no design de interfaces. Para facilitar a vida dos desenvolvedores, criamos um gerador robusto.</p>
      <p>Com ele, você pode ajustar:</p>
      <ul>
        <li>Nível de desfoque (Blur)</li>
        <li>Transparência e cor de fundo</li>
        <li>Bordas e sombras sutis</li>
      </ul>
      <p>Experimente a ferramenta na seção de CSS do nosso toolkit.</p>
    `,
    tags: ["CSS", "Tool"],
    author: "Design Team",
  },
  {
    id: "3",
    slug: "melhorias-performance",
    title: "Melhorias de Performance",
    date: "10 de Dezembro, 2025",
    excerpt:
      "Otimizamos o carregamento inicial da aplicação em 40% usando code splitting e lazy loading.",
    content: `
      <p>Performance é crucial para uma boa experiência do usuário. Nesta atualização, focamos em reduzir o tempo de carregamento.</p>
      <p>Implementamos Lazy Loading em todas as rotas de ferramentas, garantindo que você carregue apenas o código necessário para o que está usando no momento.</p>
      <p>O resultado? Uma aplicação 40% mais rápida no carregamento inicial!</p>
    `,
    tags: ["Performance", "Engineering"],
    author: "Tech Lead",
  },
];
