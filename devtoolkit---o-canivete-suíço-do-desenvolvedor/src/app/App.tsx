
import * as React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../widgets/layout/ui/Layout';
import LandingPage from '../pages/landing/ui/LandingPage';
import Dashboard from '../pages/dashboard/ui/Dashboard';
import AboutPage from '../pages/about/ui/AboutPage';
import ContributionPage from '../pages/contribution/ui/ContributionPage';
import BlogPage from '../pages/blog/ui/BlogPage';
import ToolPlaceholder from '../pages/tools/ToolPlaceholder';
import BoxShadowGenerator from '../pages/tools/BoxShadowGenerator';
import JsonFormatter from '../pages/tools/JsonFormatter';
import UuidGenerator from '../pages/tools/UuidGenerator';
import LoremIpsumGenerator_v2 from '../pages/tools/LoremIpsumGenerator';
import KeycodeInfo from '../pages/tools/KeycodeInfo';
import CssGradientGenerator from '../pages/tools/CssGradientGenerator';
import ClippyGenerator from '../pages/tools/ClippyGenerator';
import GlassmorphismGenerator from '../pages/tools/GlassmorphismGenerator';
import NeumorphismGenerator from '../pages/tools/NeumorphismGenerator';
import Base64Converter from '../pages/tools/Base64Converter';
import JwtDecoder from '../pages/tools/JwtDecoder';
import UrlEncoder from '../pages/tools/UrlEncoder';
import ChmodCalculator from '../pages/tools/ChmodCalculator';
import TimestampConverter from '../pages/tools/TimestampConverter';
import FancyBorderGenerator from '../pages/tools/FancyBorderGenerator';
import RegexTester from '../pages/tools/RegexTester';
import BcryptGenerator from '../pages/tools/BcryptGenerator';
import DiffChecker from '../pages/tools/DiffChecker';
import HashGenerator from '../pages/tools/HashGenerator';
import MinifierTool from '../pages/tools/MinifierTool';
import AnimistaGenerator from '../pages/tools/AnimistaGenerator';
import LayoutitGrid from '../pages/tools/LayoutitGrid';
import TinyPngTool from '../pages/tools/TinyPngTool';
import SvgOmgTool from '../pages/tools/SvgOmgTool';
import PaletteGenerator from '../pages/tools/PaletteGenerator';
import FaviconGenerator from '../pages/tools/FaviconGenerator';
import HeroiconsExplorer from '../pages/tools/HeroiconsExplorer';
import BundlePhobiaTool from '../pages/tools/BundlePhobiaTool';
import CanIUseTool from '../pages/tools/CanIUseTool';
import HoppscotchTool from '../pages/tools/HoppscotchTool';
import SqlFiddleTool from '../pages/tools/SqlFiddleTool';
import MockDataGenerator from '../pages/tools/MockDataGenerator';
import DbDiagramsTool from '../pages/tools/DbDiagramsTool';
import CrontabGuruTool from '../pages/tools/CrontabGuruTool';
import NginxConfigTool from '../pages/tools/NginxConfigTool';
import DockerSearchTool from '../pages/tools/DockerSearchTool';
import GitignoreGenerator from '../pages/tools/GitignoreGenerator';
import DnsCheckerTool from '../pages/tools/DnsCheckerTool';
import MyIpTool from '../pages/tools/MyIpTool';
import CarbonCodeTool from '../pages/tools/CarbonCodeTool';
import BoilerplateGenerator from '../pages/tools/BoilerplateGenerator';
import { TOOLS } from '../entities/tool/model';

import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HelmetProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contribution" element={<ContributionPage />} />
          <Route path="/blog" element={<BlogPage />} />
          
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
          
          {/* Functional Tools */}
          <Route path="/tool/css-gradient" element={<CssGradientGenerator />} />
          <Route path="/tool/clippy" element={<ClippyGenerator />} />
          <Route path="/tool/animista" element={<AnimistaGenerator />} />
          <Route path="/tool/box-shadow" element={<BoxShadowGenerator />} />
          <Route path="/tool/json-formatter" element={<JsonFormatter />} />
          <Route path="/tool/uuid-gen" element={<UuidGenerator />} />
          <Route path="/tool/lorem-ipsum" element={<LoremIpsumGenerator_v2 />} />
          <Route path="/tool/keycode-info" element={<KeycodeInfo />} />
          <Route path="/tool/glassmorphism" element={<GlassmorphismGenerator />} />
          <Route path="/tool/neumorphism" element={<NeumorphismGenerator />} />
          <Route path="/tool/base64-encoder" element={<Base64Converter />} />
          <Route path="/tool/jwt-decoder" element={<JwtDecoder />} />
          <Route path="/tool/url-encoder" element={<UrlEncoder />} />
          <Route path="/tool/chmod-calc" element={<ChmodCalculator />} />
          <Route path="/tool/timestamp-converter" element={<TimestampConverter />} />
          <Route path="/tool/fancy-border" element={<FancyBorderGenerator />} />
          <Route path="/tool/regex-tester" element={<RegexTester />} />
          <Route path="/tool/bcrypt-gen" element={<BcryptGenerator />} />
          <Route path="/tool/diffchecker" element={<DiffChecker />} />
          <Route path="/tool/hash-gen" element={<HashGenerator />} />
          <Route path="/tool/minifier" element={<MinifierTool />} />
          <Route path="/tool/layoutit-grid" element={<LayoutitGrid />} />
          <Route path="/tool/tinypng" element={<TinyPngTool />} />
          <Route path="/tool/svgomg" element={<SvgOmgTool />} />
          <Route path="/tool/coolors" element={<PaletteGenerator />} />
          <Route path="/tool/favicon-gen" element={<FaviconGenerator />} />
          <Route path="/tool/heroicons" element={<HeroiconsExplorer />} />
          <Route path="/tool/bundlephobia" element={<BundlePhobiaTool />} />
          <Route path="/tool/caniuse" element={<CanIUseTool />} />
          <Route path="/tool/hoppscotch" element={<HoppscotchTool />} />
          <Route path="/tool/sql-fiddle" element={<SqlFiddleTool />} />
          <Route path="/tool/mock-data-gen" element={<MockDataGenerator />} />
          <Route path="/tool/db-diagrams" element={<DbDiagramsTool />} />
          <Route path="/tool/crontab-guru" element={<CrontabGuruTool />} />
          <Route path="/tool/nginx-config" element={<NginxConfigTool />} />
          <Route path="/tool/docker-search" element={<DockerSearchTool />} />
          <Route path="/tool/gitignore-gen" element={<GitignoreGenerator />} />
          <Route path="/tool/dns-checker" element={<DnsCheckerTool />} />
          <Route path="/tool/my-ip" element={<MyIpTool />} />
          <Route path="/tool/carbon-code" element={<CarbonCodeTool />} />
          <Route path="/tool/project-boilerplates" element={<BoilerplateGenerator />} />

          {/* Dynamic Placeholder Routes */}
          {TOOLS.map((tool) => (
            !tool.isImplemented && (
              <Route 
                key={tool.id} 
                path={`/tool/${tool.slug}`} 
                element={<ToolPlaceholder tool={tool} />} 
              />
            )
          ))}

              </Routes>
            </Layout>
          } />
        </Routes>
      </HashRouter>
    </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
