import * as React from "react";
import { useState, useEffect } from "react";
import { Wind, Play, Copy, Check, RefreshCw, Zap } from "lucide-react";
import { Button } from "../../shared/ui/Button";

import { CATEGORIES } from "./AnimistaGenerator.data";
import type { AnimationCategory, AnimationDef } from "./AnimistaGenerator.data";

import {
  Container,
  Header,
  HeaderContent,
  IconWrapper,
  TitleContainer,
  Title,
  Description,
  GridLayout,
  Sidebar,
  ConfigBox,
  SectionTitle,
  ListContainer,
  CategoryButton,
  AnimationButton,
  MainContent,
  PreviewBox,
  PreviewBackground,
  AnimatedElement,
  PreviewControls,
  PreviewLabel,
  ReplayButton,
  ControlsGrid,
  ControlGroup,
  ControlHeader,
  ControlValue,
  RangeInput,
  SelectInput,
  OutputColumn,
  CodeCard,
  CodeHeader,
  CopyButton,
  CodeSection,
  CodeLabel,
  CodeBlock,
  KeyframesBlock,
  TipBox,
  TipContent,
} from "./styles/AnimistaGenerator.styles";

const AnimistaGenerator: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [selectedAnim, setSelectedAnim] = useState(CATEGORIES[0].animations[0]);
  const [duration, setDuration] = useState(0.4);
  const [delay, setDelay] = useState(0);
  const [iterations, setIterations] = useState(1);
  const [timing, setTiming] = useState("ease");
  const [direction, setDirection] = useState("normal");
  const [isAnimating, setIsAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger animation replay
  const replay = () => {
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);
  };

  useEffect(() => {
    replay();
  }, [selectedAnim, duration, delay, iterations, timing, direction]);

  const animationStyle: React.CSSProperties = {
    animationName: selectedAnim.className,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    animationIterationCount: iterations === 0 ? "infinite" : iterations,
    animationTimingFunction: timing,
    animationDirection: direction,
    animationFillMode: "both",
  };

  const cssClassCode = `.${selectedAnim.className} {
  animation: ${selectedAnim.className} ${duration}s ${timing} ${delay}s ${iterations === 0 ? "infinite" : iterations} ${direction} both;
}`;

  const fullCssCode = `${cssClassCode}\n\n${selectedAnim.keyframes}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullCssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <IconWrapper>
            <Wind size={32} />
          </IconWrapper>
          <TitleContainer>
            <Title>Animista - CSS Animations</Title>
            <Description>
              Descubra e configure animações CSS performáticas para seus
              elementos.
            </Description>
          </TitleContainer>
        </HeaderContent>
        <Button variant="outline" onClick={replay}>
          <Play size={16} className="mr-2" /> Play
        </Button>
      </Header>

      {/* Inject Keyframes into DOM */}
      <style>{selectedAnim.keyframes}</style>

      <GridLayout>
        {/* Categories Sidebar */}
        <Sidebar>
          <ConfigBox>
            <SectionTitle>Categorias</SectionTitle>
            <ListContainer>
              {CATEGORIES.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  onClick={() => {
                    setSelectedCat(cat);
                    setSelectedAnim(cat.animations[0]);
                  }}
                  $isActive={selectedCat.id === cat.id}
                >
                  {cat.name}
                </CategoryButton>
              ))}
            </ListContainer>
          </ConfigBox>

          <ConfigBox>
            <SectionTitle>Animações</SectionTitle>
            <ListContainer>
              {selectedCat.animations.map((anim) => (
                <AnimationButton
                  key={anim.className}
                  onClick={() => setSelectedAnim(anim)}
                  $isActive={selectedAnim.className === anim.className}
                >
                  {anim.name}
                </AnimationButton>
              ))}
            </ListContainer>
          </ConfigBox>
        </Sidebar>

        {/* Main Preview & Controls */}
        <MainContent>
          <PreviewBox>
            <PreviewBackground />

            <AnimatedElement style={isAnimating ? animationStyle : {}} />

            <PreviewControls>
              <PreviewLabel>Preview: {selectedAnim.name}</PreviewLabel>
              <ReplayButton onClick={replay}>
                <RefreshCw size={14} />
              </ReplayButton>
            </PreviewControls>
          </PreviewBox>

          <ControlsGrid>
            <ControlGroup>
              <ControlHeader>
                <span>Duração</span>
                <ControlValue>{duration}s</ControlValue>
              </ControlHeader>
              <RangeInput
                type="range"
                min="0.1"
                max="5"
                step="0.1"
                value={duration}
                onChange={(e) => setDuration(parseFloat(e.target.value))}
              />
            </ControlGroup>
            <ControlGroup>
              <ControlHeader>
                <span>Delay</span>
                <ControlValue>{delay}s</ControlValue>
              </ControlHeader>
              <RangeInput
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={delay}
                onChange={(e) => setDelay(parseFloat(e.target.value))}
              />
            </ControlGroup>
            <ControlGroup>
              <ControlHeader>
                <span style={{ marginBottom: "0.25rem", display: "block" }}>
                  Timing Function
                </span>
              </ControlHeader>
              <SelectInput
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              >
                <option value="ease">Ease</option>
                <option value="linear">Linear</option>
                <option value="ease-in">Ease In</option>
                <option value="ease-out">Ease Out</option>
                <option value="ease-in-out">Ease In Out</option>
                <option value="cubic-bezier(0.68, -0.55, 0.27, 1.55)">
                  Back
                </option>
              </SelectInput>
            </ControlGroup>
            <ControlGroup>
              <ControlHeader>
                <span style={{ marginBottom: "0.25rem", display: "block" }}>
                  iterações
                </span>
              </ControlHeader>
              <SelectInput
                value={iterations}
                onChange={(e) => setIterations(parseInt(e.target.value))}
              >
                <option value="1">1 vez</option>
                <option value="2">2 vezes</option>
                <option value="3">3 vezes</option>
                <option value="0">Infinito</option>
              </SelectInput>
            </ControlGroup>
          </ControlsGrid>
        </MainContent>

        {/* Code Output Sidebar */}
        <OutputColumn>
          <CodeCard>
            <CodeHeader>
              <SectionTitle style={{ marginBottom: 0, padding: 0 }}>
                Código CSS
              </SectionTitle>
              <CopyButton onClick={copyToClipboard}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copiado!" : "Copiar"}
              </CopyButton>
            </CodeHeader>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <CodeSection>
                <CodeLabel>Classe</CodeLabel>
                <CodeBlock>{cssClassCode}</CodeBlock>
              </CodeSection>
              <CodeSection>
                <CodeLabel>Keyframes</CodeLabel>
                <KeyframesBlock>{selectedAnim.keyframes}</KeyframesBlock>
              </CodeSection>
            </div>
          </CodeCard>

          <TipBox>
            <Zap size={16} color="#3b82f6" style={{ flexShrink: 0 }} />
            <TipContent>
              <strong>Dica:</strong> Para melhor performance, use animações que
              manipulem apenas <code>transform</code> e <code>opacity</code>.
            </TipContent>
          </TipBox>
        </OutputColumn>
      </GridLayout>
    </Container>
  );
};

export default AnimistaGenerator;
