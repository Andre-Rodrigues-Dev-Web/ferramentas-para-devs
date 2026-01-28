import React from "react";
import styled, { keyframes } from "styled-components";
import { Seo } from "../Seo/Seo";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #020617; // slate-950
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  gap: 2rem;
`;

const SpinnerWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border: 4px solid transparent;
  border-top-color: #3b82f6; // blue-500
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const SpinnerRingInner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 4px solid transparent;
  border-top-color: #8b5cf6; // violet-500
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite reverse;
`;

const LoadingText = styled.h2`
  font-family: "Fira Code", monospace;
  font-size: 1.25rem;
  color: #94a3b8; // slate-400
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

  span {
    color: #3b82f6;
  }
`;

export const LoadingPage: React.FC = () => {
  return (
    <Container>
      <Seo title="Carregando..." noIndex />
      <SpinnerWrapper>
        <SpinnerRing />
        <SpinnerRingInner />
      </SpinnerWrapper>
      <LoadingText>
        &lt;<span>Carregando</span> /&gt;
      </LoadingText>
    </Container>
  );
};
