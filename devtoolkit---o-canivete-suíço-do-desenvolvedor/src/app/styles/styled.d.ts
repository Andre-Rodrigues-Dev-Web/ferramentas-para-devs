import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: { [key: number]: string };
      slate: { [key: number]: string };
      white: string;
      transparent: string;
    };
    screens: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
      full: string;
    };
  }
}
