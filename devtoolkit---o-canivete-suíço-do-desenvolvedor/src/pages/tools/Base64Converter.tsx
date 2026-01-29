
import { useState, FC } from 'react';
import { Binary, ArrowRightLeft } from 'lucide-react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Input';
import {
  Container,
  Header,
  IconWrapper,
  Title,
  Description,
  Card,
  ControlsContainer,
  ModeBadge,
  SwitchButton,
  Grid,
  Column,
  Label,
  ResultHeader,
  CopyButton,
  ResultBox,
  Placeholder
} from './styles/Base64Converter.styles';

const Base64Converter: FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    if (!input.trim()) {
      setOutput('');
      return;
    }
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
    } catch (e: any) {
      setError('Erro na conversão: Verifique se o formato está correto.');
      setOutput('');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
  };

  const copyOutput = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <IconWrapper>
          <Binary size={40} />
        </IconWrapper>
        <Title>Base64 Encoder / Decoder</Title>
        <Description>Converta texto para Base64 e vice-versa de forma segura.</Description>
      </Header>

      <Card>
        <ControlsContainer>
          <ModeBadge $active={mode === 'encode'}>TEXTO</ModeBadge>
          <SwitchButton onClick={toggleMode}>
            <ArrowRightLeft size={20} />
          </SwitchButton>
          <ModeBadge $active={mode === 'decode'}>BASE64</ModeBadge>
        </ControlsContainer>

        <Grid>
          <Column>
            <Label>{mode === 'encode' ? 'Texto Original' : 'Base64 Input'}</Label>
            <Textarea 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder={`Cole seu ${mode === 'encode' ? 'texto' : 'Base64'} aqui...`} 
              style={{ height: '16rem', borderColor: '#1e293b' }} 
            />
            <Button onClick={handleConvert} style={{ width: '100%' }}>Converter</Button>
          </Column>

          <Column>
            <ResultHeader>
              <Label>{mode === 'encode' ? 'Base64 Result' : 'Texto Decodificado'}</Label>
              <CopyButton disabled={!output} onClick={copyOutput}>
                {copied ? 'Copiado!' : 'Copiar'}
              </CopyButton>
            </ResultHeader>
            <ResultBox $error={!!error}>
              {error || output || <Placeholder>O resultado aparecerá aqui...</Placeholder>}
            </ResultBox>
          </Column>
        </Grid>
      </Card>
    </Container>
  );
};

export default Base64Converter;
