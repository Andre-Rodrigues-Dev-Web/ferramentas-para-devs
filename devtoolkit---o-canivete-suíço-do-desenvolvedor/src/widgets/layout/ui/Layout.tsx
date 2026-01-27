
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react'; // Fix: specific import would be better but keeping dynamic for now
import { TOOLS, CATEGORIES } from '../../../entities/tool/model';
import SearchModal from '../../search-modal/ui/SearchModal';
import styled from 'styled-components';

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.slate[950]};
  color: ${({ theme }) => theme.colors.slate[200]};
  overflow: hidden;
`;

const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${({ $isOpen }) => ($isOpen ? '16rem' : '0')};
  transition: all 300ms;
  background-color: ${({ theme }) => theme.colors.slate[900]};
  border-right: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  z-index: 40;
  height: 100%;

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    position: relative;
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

const LogoContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AppTitle = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.white};
  white-space: nowrap;
`;

const Nav = styled.nav`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.slate[500]};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  transition: all 0.2s;
  font-size: 0.875rem;
  
  ${({ $isActive, theme }) =>
    $isActive
      ? `
        background-color: rgba(37, 99, 235, 0.1);
        color: ${theme.colors.primary[400]};
        border: 1px solid rgba(59, 130, 246, 0.2);
      `
      : `
        color: ${theme.colors.slate[400]};
        border: 1px solid transparent;
        &:hover {
          color: ${theme.colors.slate[100]};
          background-color: ${theme.colors.slate[800]};
        }
      `}
`;

const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.slate[800]};
  color: ${({ theme }) => theme.colors.slate[400]};
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[700]};
  }
`;

const Kbd = styled.kbd`
  display: none;
  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    display: inline-flex;
  }
  height: 1.25rem;
  align-items: center;
  gap: 0.25rem;
  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.slate[600]};
  background-color: ${({ theme }) => theme.colors.slate[700]};
  padding: 0 0.375rem;
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[400]};
`;

const Credits = styled.div`
  font-size: 0.625rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.slate[500]};
  font-weight: 500;
  line-height: 1.25;
  padding: 0 0.5rem;

  a {
    color: ${({ theme }) => theme.colors.primary[400]};
    font-weight: 700;
    display: block;
    margin-top: 0.25rem;
    &:hover {
      color: ${({ theme }) => theme.colors.primary[300]};
    }
  }
`;

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const Header = styled.header`
  height: 4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.slate[800]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background-color: rgba(2, 6, 23, 0.5); /* slate-950/50 */
  backdrop-filter: blur(12px);
`;

const MenuButton = styled.button`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.slate[400]};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const HeaderLink = styled(Link)`
  color: ${({ theme }) => theme.colors.slate[400]};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
  
  span {
    display: none;
    @media (min-width: ${({ theme }) => theme.screens.sm}) {
      display: inline;
    }
    font-weight: 500;
  }
`;

const VersionBadge = styled.div`
  display: none;
  @media (min-width: ${({ theme }) => theme.screens.sm}) {
    display: flex;
  }
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.slate[500]};
  background-color: ${({ theme }) => theme.colors.slate[900]};
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.slate[800]};
`;

const PulseDot = styled.span`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #22c55e;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: .5; }
  }
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.slate[950]};

  @media (min-width: ${({ theme }) => theme.screens.md}) {
    padding: 2rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 72rem; /* 6xl */
  margin: 0 auto;
  width: 100%;
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const GitHubLink = styled.a`
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.slate[400]};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.slate[800]};
    color: ${({ theme }) => theme.colors.white};
  }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getIcon = (name: string) => {
    const IconComponent = (Icons as any)[name];
    return IconComponent ? <IconComponent size={18} /> : <Icons.HelpCircle size={18} />;
  };

  return (
    <LayoutWrapper>
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarHeader>
          <LogoContainer>
            <Icons.Wrench size={20} color="white" />
          </LogoContainer>
          <AppTitle>DevToolkit</AppTitle>
        </SidebarHeader>

        <Nav>
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <CategoryTitle>{cat}</CategoryTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {TOOLS.filter(t => t.category === cat).map(tool => {
                  const isActive = location.pathname === `/tool/${tool.slug}`;
                  return (
                    <NavLink
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      $isActive={isActive}
                    >
                      <span style={{ color: isActive ? '#60a5fa' : 'inherit' }}>
                        {getIcon(tool.icon)}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tool.title}</span>
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </Nav>

        <Footer>
          <SearchButton onClick={() => setIsSearchOpen(true)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icons.Search size={16} />
              <span>Buscar...</span>
            </div>
            <Kbd>
              <span style={{ fontSize: '0.75rem' }}>⌘</span>K
            </Kbd>
          </SearchButton>

          <Credits>
            Desenvolvido por <br/>
            <a 
              href="https://andrelaurentino.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              André Laurentino Rodrigues
            </a>
          </Credits>
        </Footer>
      </Sidebar>

      <MainContainer>
        <Header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <MenuButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Icons.Menu size={20} />
            </MenuButton>
            <HeaderLink to="/">
              <Icons.Home size={18} />
              <span>Dashboard</span>
            </HeaderLink>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <GitHubLink href="https://github.com" target="_blank">
               <Icons.Github size={20} />
             </GitHubLink>
             <div style={{ height: '2rem', width: '1px', backgroundColor: '#1e293b', display: 'none' }} className="sm:block"></div>
             <VersionBadge>
               <PulseDot />
               V1.0.0 Stable
             </VersionBadge>
          </div>
        </Header>

        <Main>
          <ContentContainer>
            {children}
          </ContentContainer>
        </Main>
      </MainContainer>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </LayoutWrapper>
  );
};

export default Layout;
