import styled, { keyframes, css } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: calc(100vh - 100px);
  padding-bottom: 2rem;
  font-family: "Inter", sans-serif;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    stroke-width: 2.5px;
  }
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
  max-width: 650px;
  font-size: 1rem;
  line-height: 1.5;
`;

export const Workspace = styled.div`
  display: grid;
  grid-template-columns: 45fr 55fr;
  gap: 1.5rem;
  flex: 1;
  min-height: 0;
  animation: ${fadeIn} 0.6s ease-out 0.1s backwards;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

/* --- IDE Components --- */

export const IdeWindow = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e; /* VS Code Main Bg */
  border: 1px solid #333;
  border-radius: 0.75rem;
  overflow: hidden;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    border-color: #444;
  }
`;

export const IdeHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: #252526; /* VS Code Header Bg */
  padding: 0 1rem;
  height: 40px;
  border-bottom: 1px solid #1e1e1e;
  gap: 1rem;
`;

export const WindowControls = styled.div`
  display: flex;
  gap: 6px;
  margin-right: 0.5rem;

  div {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .red {
    background-color: #ff5f56;
  }
  .yellow {
    background-color: #ffbd2e;
  }
  .green {
    background-color: #27c93f;
  }
`;

export const IdeTab = styled.div<{ $active?: boolean; $brandColor?: string }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  color: ${({ $active, $brandColor }) =>
    $active ? $brandColor || "#e1e4e8" : "#888"};
  background-color: ${({ $active }) => ($active ? "#1e1e1e" : "transparent")};
  border-top: 2px solid
    ${({ $active, $brandColor, theme }) =>
      $active ? $brandColor || theme.colors.primary[500] : "transparent"};
  cursor: pointer;
  height: 100%;
  font-family: "JetBrains Mono", monospace;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  position: relative;
  min-width: fit-content;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1e1e1e" : "#2d2d2d")};
    color: ${({ $active, $brandColor }) =>
      !$active ? $brandColor || "#e1e4e8" : undefined};
  }

  &:active {
    background-color: #252526;
  }

  svg {
    opacity: ${({ $active }) => ($active ? 1 : 0.7)};
    transition: transform 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
    transform: scale(1.1);
  }
`;

export const IdeBody = styled.div`
  flex: 1;
  position: relative;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

export const ScrollDisplay = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 10px;
    background: #1e1e1e;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 5px;
    border: 2px solid #1e1e1e;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #4f4f4f;
  }
`;

/* Input Groups for Split Pane Look */
export const SplitPane = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #333;
  transition: flex 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

export const SplitHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1rem;
  background-color: #252526;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #888;
  font-weight: 600;
  letter-spacing: 0.05em;
  user-select: none;
  cursor: default;
`;

export const EditorTextarea = styled.textarea`
  width: 100%;
  flex: 1;
  background-color: #1e1e1e;
  color: #d4d4d4; /* VS Code Default Text */
  border: none;
  padding: 0.5rem 1rem; /* Space for line numbers if we had them */
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: none;
  outline: none;
  border-left: 2px solid transparent;
  transition: background-color 0.2s;

  &:focus {
    /* Simulating active line or focus */
    background-color: #1e1e1e;
  }

  &::placeholder {
    color: #444;
  }
`;

export const OutputDisplay = styled.pre<{ $brandColor?: string }>`
  margin: 0;
  padding: 1rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ $brandColor }) => $brandColor || "#9cdcfe"};
  white-space: pre-wrap;
  background-color: #1e1e1e;
  min-height: 100%;
  transition:
    color 0.3s ease,
    opacity 0.2s ease;

  @keyframes fadeInCode {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: fadeInCode 0.3s ease-out;
`;

export const PlatformTabs = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  overflow-x: hidden; /* Controlled by buttons now, or auto if preferred */
  scroll-behavior: smooth;
  flex: 1;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 16px,
    black calc(100% - 16px),
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 16px,
    black calc(100% - 16px),
    transparent
  );

  /* Hide scrollbar */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TabsContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  position: relative;
  margin-right: 0.5rem;
  background-color: #1e1e1e;
  border-radius: 6px;
  padding: 2px;
  border: 1px solid #333;
`;

export const ScrollControl = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #888;
  border: none;
  width: 24px;
  height: 100%;
  cursor: pointer;
  z-index: 2;
  transition: color 0.2s;

  &:hover {
    color: #fff;
    background-color: #333;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  color: #ccc;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: #333;
    color: #fff;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.92);
  }
`;

export const CopyButton = styled(ActionButton)`
  background-color: #2d2d2d; // Slightly lighter than header
  padding: 6px 12px;
  font-size: 0.8rem;
  gap: 0.5rem;
  border: 1px solid #3e3e42;

  &:hover {
    background-color: #3e3e42;
    border-color: #555;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.96);
  }
`;
