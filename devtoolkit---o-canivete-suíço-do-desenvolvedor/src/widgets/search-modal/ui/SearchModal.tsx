
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { TOOLS } from '../../../entities/tool/model';
import styled, { keyframes, css } from 'styled-components';

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 5rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(2, 6, 23, 0.8); /* slate-950/80 */
  backdrop-filter: blur(4px);
  cursor: default;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 36rem; /* max-w-xl */
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: ${zoomIn} 0.2s ease-out;
`;

const SearchHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

const SearchInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  padding: 1rem 0.75rem;
  color: ${({ theme }) => theme.colors.slate[100]};
  font-size: 1rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.slate[500]};
  }

  &:focus {
    outline: none;
  }
`;

const Kbd = styled.kbd`
  display: none;
  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    display: inline-flex;
  }
  height: 1.25rem;
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.slate[700]};
  background-color: ${({ theme }) => theme.colors.slate[800]};
  padding: 0 0.375rem;
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[500]};
`;

const ResultsList = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
`;

const ResultItem = styled.div<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: all 0.2s;

  ${({ $selected, theme }) =>
    $selected
      ? css`
        background-color: ${theme.colors.primary[600]};
        color: ${theme.colors.white};
      `
      : css`
        background-color: transparent;
        color: ${theme.colors.slate[300]};
        &:hover {
          background-color: ${theme.colors.slate[800]};
        }
      `}
`;

const ResultItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconWrapper = styled.span<{ $selected?: boolean }>`
  color: ${({ $selected, theme }) => ($selected ? theme.colors.white : theme.colors.primary[400])};
`;

const CategoryText = styled.div<{ $selected?: boolean }>`
  font-size: 0.75rem;
  color: ${({ $selected, theme }) => ($selected ? theme.colors.primary[100] : theme.colors.slate[500])};
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.slate[500]};
  
  p {
    margin-top: 0.75rem;
  }
`;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredTools = query.trim() === '' 
    ? [] 
    : TOOLS.filter(tool => 
        tool.title.toLowerCase().includes(query.toLowerCase()) ||
        tool.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredTools.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (filteredTools[selectedIndex]) {
        navigate(`/tool/${filteredTools[selectedIndex].slug}`);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={20} /> : <Icons.HelpCircle size={20} />;
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <Backdrop onClick={onClose} />
      
      <ModalContent>
        <SearchHeader>
          <Icons.Search className="text-slate-500" size={20} color="#64748b" />
          <SearchInput
            ref={inputRef}
            type="text"
            placeholder="Qual ferramenta você precisa?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Kbd>ESC</Kbd>
        </SearchHeader>

        <ResultsList>
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, idx) => (
              <ResultItem
                key={tool.id}
                $selected={idx === selectedIndex}
                onClick={() => {
                  navigate(`/tool/${tool.slug}`);
                  onClose();
                }}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <ResultItemContent>
                  <IconWrapper $selected={idx === selectedIndex}>
                    {getIcon(tool.icon)}
                  </IconWrapper>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{tool.title}</div>
                    <CategoryText $selected={idx === selectedIndex}>
                      {tool.category}
                    </CategoryText>
                  </div>
                </ResultItemContent>
                <Icons.ChevronRight size={16} color={idx === selectedIndex ? 'white' : '#475569'} />
              </ResultItem>
            ))
          ) : query ? (
            <EmptyState>
              <Icons.SearchX size={40} style={{ margin: '0 auto', opacity: 0.2 }} />
              <p>Nenhuma ferramenta encontrada para "{query}"</p>
            </EmptyState>
          ) : (
            <EmptyState>
              <p>Digite o nome da ferramenta ou categoria...</p>
            </EmptyState>
          )}
        </ResultsList>
      </ModalContent>
    </Overlay>
  );
};

export default SearchModal;
