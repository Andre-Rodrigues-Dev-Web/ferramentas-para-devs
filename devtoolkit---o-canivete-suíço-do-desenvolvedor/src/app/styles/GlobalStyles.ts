import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`


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
    background-color: #0D0D0D;
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
