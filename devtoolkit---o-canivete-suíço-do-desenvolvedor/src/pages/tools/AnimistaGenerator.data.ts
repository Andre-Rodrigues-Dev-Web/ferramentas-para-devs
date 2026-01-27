export interface AnimationDef {
  name: string;
  className: string;
  keyframes: string;
  description: string;
}

export interface AnimationCategory {
  id: string;
  name: string;
  animations: AnimationDef[];
}

export const CATEGORIES: AnimationCategory[] = [
  {
    id: "basic",
    name: "Básicas",
    animations: [
      {
        name: "Scale Up",
        className: "scale-up-center",
        keyframes: `@keyframes scale-up-center {
  0% { transform: scale(0.5); }
  100% { transform: scale(1); }
}`,
        description: "Aumenta o elemento a partir do centro.",
      },
      {
        name: "Rotate Center",
        className: "rotate-center",
        keyframes: `@keyframes rotate-center {
  0% { transform: rotate(0); }
  100% { transform: rotate(360deg); }
}`,
        description: "Gira o elemento 360 graus no próprio eixo.",
      },
    ],
  },
  {
    id: "entrances",
    name: "Entradas",
    animations: [
      {
        name: "Slide In Top",
        className: "slide-in-top",
        keyframes: `@keyframes slide-in-top {
  0% { transform: translateY(-1000px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}`,
        description: "Desliza o elemento do topo para a posição original.",
      },
      {
        name: "Fade In",
        className: "fade-in",
        keyframes: `@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}`,
        description: "Aparecimento suave do elemento.",
      },
      {
        name: "Bounce In Top",
        className: "bounce-in-top",
        keyframes: `@keyframes bounce-in-top {
  0% { transform: translateY(-500px); animation-timing-function: ease-in; opacity: 0; }
  38% { transform: translateY(0); animation-timing-function: ease-out; opacity: 1; }
  55% { transform: translateY(-65px); animation-timing-function: ease-in; }
  72% { transform: translateY(0); animation-timing-function: ease-out; }
  81% { transform: translateY(-28px); animation-timing-function: ease-in; }
  90% { transform: translateY(0); animation-timing-function: ease-out; }
  95% { transform: translateY(-8px); animation-timing-function: ease-in; }
  100% { transform: translateY(0); animation-timing-function: ease-out; }
}`,
        description: "Entrada com efeito de quique vindo de cima.",
      },
    ],
  },
  {
    id: "attention",
    name: "Atenção",
    animations: [
      {
        name: "Vibrate",
        className: "vibrate-1",
        keyframes: `@keyframes vibrate-1 {
  0% { transform: translate(0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(-2px, -2px); }
  60% { transform: translate(2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}`,
        description: "Vibração rápida para chamar atenção.",
      },
      {
        name: "Shake Horizontal",
        className: "shake-horizontal",
        keyframes: `@keyframes shake-horizontal {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70% { transform: translateX(-10px); }
  20%, 40%, 60% { transform: translateX(10px); }
  80% { transform: translateX(8px); }
  90% { transform: translateX(-8px); }
}`,
        description: "Sacode o elemento horizontalmente.",
      },
    ],
  },
];
