
import React, { useState } from 'react';
import { Copy, Check, Trash2, FileJson, AlertCircle } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Input';
import styled, { css } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.slate[400]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: ${({ theme }) => theme.screens.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const IconButton = styled.button`
  padding: 0.375rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.slate[500]};
  transition: all 0.2s;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    color: #f87171;
    background-color: ${({ theme }) => theme.colors.slate[800]};
  }
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[400]};
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[300]};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  
  & > * {
    flex: 1;
  }
`;

const OutputBox = styled.div<{ $error: boolean }>`
  width: 100%;
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 2px solid ${({ theme, $error }) => $error ? 'rgba(239, 68, 68, 0.5)' : theme.colors.slate[800]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: 1rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  overflow: auto;
  max-height: 460px;
  
  ${({ $error }) => $error && css`
    background-color: rgba(239, 68, 68, 0.05);
  `}
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #f87171;
`;

const ErrorTitle = styled.p`
  font-weight: 700;
`;

const ErrorMessage = styled.p`
  margin-top: 0.25rem;
  opacity: 0.8;
`;

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const handleMinify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <Container>
      <Header>
        <Title>JSON Formatter & Validator</Title>
        <Description>Embeleze, valide ou minifique seus objetos JSON instantaneamente.</Description>
      </Header>

      <Grid>
        <Column>
          <Toolbar>
            <Label>Input</Label>
            <IconButton onClick={clear} title="Limpar">
              <Trash2 size={16} />
            </IconButton>
          </Toolbar>
          <Textarea 
            placeholder="Cole seu JSON bruto aqui..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ height: '400px', borderColor: '#1e293b' }}
          />
          <ButtonGroup>
            <Button onClick={handleFormat}>
               Formatar
            </Button>
            <Button variant="outline" onClick={handleMinify}>
              Minificar
            </Button>
          </ButtonGroup>
        </Column>

        <Column>
          <Toolbar>
            <Label>Output</Label>
            <CopyButton 
              disabled={!output}
              onClick={copyOutput}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copiado!' : 'Copiar'}
            </CopyButton>
          </Toolbar>
          
          <div className="relative group">
            <OutputBox $error={!!error}>
              {error ? (
                <ErrorContainer>
                  <AlertCircle size={18} style={{ marginTop: '0.125rem', flexShrink: 0 }} />
                  <div>
                    <ErrorTitle>JSON Inválido</ErrorTitle>
                    <ErrorMessage>{error}</ErrorMessage>
                  </div>
                </ErrorContainer>
              ) : output ? (
                <pre style={{ color: '#60a5fa' }}>{output}</pre>
              ) : (
                <p style={{ color: '#475569', fontStyle: 'italic' }}>O resultado aparecerá aqui...</p>
              )}
            </OutputBox>
          </div>
        </Column>
      </Grid>
    </Container>
  );
};

export default JsonFormatter;
