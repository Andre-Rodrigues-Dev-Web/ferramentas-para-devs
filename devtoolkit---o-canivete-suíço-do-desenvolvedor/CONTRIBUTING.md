# Contribuindo para o DevToolkit

Obrigado pelo interesse em contribuir para o DevToolkit! Somos um projeto open source construído pela comunidade e adoramos receber novas ideias, correções de bugs e melhorias.

## Código de Conduta

Este projeto e todos os seus participantes estão sob um Código de Conduta. Esperamos que todos os colaboradores tratem os outros com respeito e profissionalismo.

## Como Contribuir

### 1. Reportando Bugs

Se você encontrou um bug, por favor abra uma **Issue** no GitHub com:
- Uma descrição clara do problema.
- Passos para reproduzir.
- Comportamento esperado vs. comportamento real.
- Screenshots se aplicável.

### 2. Sugerindo Novas Features

Tem uma ideia para uma nova ferramenta ou melhoria? Abra uma **Issue** com a tag `enhancement` ou `feature request`. Descreva o problema que sua feature resolve e como ela deve funcionar.

### 3. Pull Requests

1. **Fork** o repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/minha-nova-tool`).
3. Commit suas mudanças. Mensagens de commit devem ser claras e em inglês ou português.
4. Push para a branch (`git push origin feature/minha-nova-tool`).
5. Abra um **Pull Request**.

## Guia de Desenvolvimento

### Stack Tecnológica
- **Framework**: React 18 + Vite
- **Linguagem**: TypeScript
- **Estilização**: Styled Components
- **Ícones**: Lucide React
- **Roteamento**: React Router DOM

### Estrutura de Pastas
- `src/app`: Configurações globais (rotas, estilos globais).
- `src/pages`: Páginas da aplicação.
    - `src/pages/tools`: Ferramentas individuais. Cada ferramenta deve ter seu próprio componente.
- `src/shared`: Componentes reutilizáveis (Botões, Inputs, UI Kits).
- `src/widgets`: Blocos de construção maiores (Layout, Sidebar).

### Adicionando uma Nova Ferramenta
1. Crie o componente da ferramenta em `src/pages/tools/[NomeDaTool].tsx`.
2. Adicione a rota em `src/app/App.tsx`.
3. Adicione os metadados da ferramenta (ícone, título, slug) na lista `TOOLS` em `src/entities/tool/model.ts` (ou onde a lista estiver definida).

## Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a licença MIT do projeto.
