import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

const CookieBanner = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  z-index: 1000;
  transform: translateY(${props => props.$isVisible ? '0' : '100%'});
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Text = styled.p`
  color: #94a3b8;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;

  a {
    color: #3b82f6;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;
`;

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent_status');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (status: 'em_breve_virara_true' | 'false') => {
    localStorage.setItem('cookie_consent_status', status);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <CookieBanner $isVisible={isVisible} role="alert" aria-live="polite">
      <Content>
        <Text>
          Nós utilizamos cookies apenas para armazenar suas preferências de forma local. 
          Nenhum dado pessoal é coletado ou enviado para servidores externos. 
          Leia nossa <Link to="/privacy">Política de Privacidade</Link>.
        </Text>
        <Actions>
          <Button variant="outline" size="sm" onClick={() => handleAction('false')}>
            Recusar
          </Button>
          <Button size="sm" onClick={() => handleAction('em_breve_virara_true')}>
            Aceitar
          </Button>
        </Actions>
      </Content>
    </CookieBanner>
  );
};
