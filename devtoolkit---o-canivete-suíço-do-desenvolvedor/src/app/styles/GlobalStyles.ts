import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', sans-serif;
    background-color: ${({ theme }) => theme.colors.slate[950]};
    color: ${({ theme }) => theme.colors.slate[200]};
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button, input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  code, pre, .code-font {
    font-family: 'Fira Code', monospace;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
