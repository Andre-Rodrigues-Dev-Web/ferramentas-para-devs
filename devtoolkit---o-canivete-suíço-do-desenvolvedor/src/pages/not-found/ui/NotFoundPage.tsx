import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Seo } from "../../../shared/ui/Seo/Seo";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #020617;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(
      circle,
      rgba(59, 130, 246, 0.1),
      transparent 70%
    );
    top: -100px;
    left: -100px;
    filter: blur(80px);
    z-index: 0;
  }
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${float} 6s ease-in-out infinite;
  z-index: 1;

  @media (min-width: 768px) {
    font-size: 12rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  z-index: 1;
`;

const Description = styled.p`
  color: #94a3b8;
  font-size: 1.125rem;
  max-width: 500px;
  margin-bottom: 3rem;
  line-height: 1.6;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 1;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledButton = styled(Link)<{ variant?: "primary" | "outline" }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.2s;
  text-decoration: none;

  ${({ variant }) =>
    variant === "outline"
      ? `
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `
      : `
    background: #3b82f6;
    color: white;
    &:hover {
      background: #2563eb;
      box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
    }
  `}
`;

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Seo title="Página Não Encontrada (404)" noIndex />
      <ErrorCode>404</ErrorCode>
      <Title>Ops! Página perdida no espaço.</Title>
      <Description>
        A página que você está procurando pode ter sido movida, deletada ou
        nunca existiu. Verifique a URL ou volte para a segurança da home.
      </Description>
      <ButtonGroup>
        <StyledButton to="/" variant="outline">
          <ArrowLeft size={20} />
          Voltar
        </StyledButton>
        <StyledButton to="/dashboard" variant="primary">
          <Home size={20} />
          Ir para Dashboard
        </StyledButton>
      </ButtonGroup>
    </Container>
  );
};

export default NotFoundPage;
