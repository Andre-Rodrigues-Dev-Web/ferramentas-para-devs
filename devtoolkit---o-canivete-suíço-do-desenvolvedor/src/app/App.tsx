import React, { Suspense, lazy } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "../widgets/layout/ui/Layout";
import { CookieConsent } from "../shared/ui/CookieConsent/CookieConsent";
import { TOOLS } from "../entities/tool/model";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";

// Lazy Load Pages
const LandingPage = lazy(() => import("../pages/landing/ui/LandingPage"));
const Dashboard = lazy(() => import("../pages/dashboard/ui/Dashboard"));
const AboutPage = lazy(() => import("../pages/about/ui/AboutPage"));
const ContributionPage = lazy(
  () => import("../pages/contribution/ui/ContributionPage"),
);
const BlogPage = lazy(() => import("../pages/blog/ui/BlogPage"));
const BlogPostPage = lazy(() => import("../pages/blog/ui/BlogPostPage"));
const PrivacyPage = lazy(() => import("../pages/privacy/ui/PrivacyPage"));
const ToolPlaceholder = lazy(() => import("../pages/tools/ToolPlaceholder"));

// Lazy Load Tools
const BoxShadowGenerator = lazy(
  () => import("../pages/tools/BoxShadowGenerator"),
);
const JsonFormatter = lazy(() => import("../pages/tools/JsonFormatter"));
const UuidGenerator = lazy(() => import("../pages/tools/UuidGenerator"));
const LoremIpsumGenerator_v2 = lazy(
  () => import("../pages/tools/LoremIpsumGenerator"),
);
const KeycodeInfo = lazy(() => import("../pages/tools/KeycodeInfo"));
const CssGradientGenerator = lazy(
  () => import("../pages/tools/CssGradientGenerator"),
);
const ClippyGenerator = lazy(() => import("../pages/tools/ClippyGenerator"));
const GlassmorphismGenerator = lazy(
  () => import("../pages/tools/GlassmorphismGenerator"),
);
const NeumorphismGenerator = lazy(
  () => import("../pages/tools/NeumorphismGenerator"),
);
const Base64Converter = lazy(() => import("../pages/tools/Base64Converter"));
const JwtDecoder = lazy(() => import("../pages/tools/JwtDecoder"));
const UrlEncoder = lazy(() => import("../pages/tools/UrlEncoder"));
const ChmodCalculator = lazy(() => import("../pages/tools/ChmodCalculator"));
const TimestampConverter = lazy(
  () => import("../pages/tools/TimestampConverter"),
);
const FancyBorderGenerator = lazy(
  () => import("../pages/tools/FancyBorderGenerator"),
);
const RegexTester = lazy(() => import("../pages/tools/RegexTester"));
const BcryptGenerator = lazy(() => import("../pages/tools/BcryptGenerator"));
const DiffChecker = lazy(() => import("../pages/tools/DiffChecker"));
const HashGenerator = lazy(() => import("../pages/tools/HashGenerator"));
const MinifierTool = lazy(() => import("../pages/tools/MinifierTool"));
const AnimistaGenerator = lazy(
  () => import("../pages/tools/AnimistaGenerator"),
);
const LayoutitGrid = lazy(() => import("../pages/tools/LayoutitGrid"));
const TinyPngTool = lazy(() => import("../pages/tools/TinyPngTool"));
const SvgOmgTool = lazy(() => import("../pages/tools/SvgOmgTool"));
const PaletteGenerator = lazy(() => import("../pages/tools/PaletteGenerator"));
const FaviconGenerator = lazy(() => import("../pages/tools/FaviconGenerator"));
const HeroiconsExplorer = lazy(
  () => import("../pages/tools/HeroiconsExplorer"),
);
const BundlePhobiaTool = lazy(() => import("../pages/tools/BundlePhobiaTool"));
const CanIUseTool = lazy(() => import("../pages/tools/CanIUseTool"));
const HoppscotchTool = lazy(() => import("../pages/tools/HoppscotchTool"));
const SqlFiddleTool = lazy(() => import("../pages/tools/SqlFiddleTool"));
const MockDataGenerator = lazy(
  () => import("../pages/tools/MockDataGenerator"),
);
const DbDiagramsTool = lazy(() => import("../pages/tools/DbDiagramsTool"));
const CrontabGuruTool = lazy(() => import("../pages/tools/CrontabGuruTool"));
const NginxConfigTool = lazy(() => import("../pages/tools/NginxConfigTool"));
const DockerSearchTool = lazy(() => import("../pages/tools/DockerSearchTool"));
const GitignoreGenerator = lazy(
  () => import("../pages/tools/GitignoreGenerator"),
);
const DnsCheckerTool = lazy(() => import("../pages/tools/DnsCheckerTool"));
const MyIpTool = lazy(() => import("../pages/tools/MyIpTool"));
const CarbonCodeTool = lazy(() => import("../pages/tools/CarbonCodeTool"));
const BoilerplateGenerator = lazy(
  () => import("../pages/tools/BoilerplateGenerator"),
);

// Loading Component
import { LoadingPage } from "../shared/ui/Loading/LoadingPage";
const NotFoundPage = lazy(() => import("../pages/not-found/ui/NotFoundPage"));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <HelmetProvider>
        <HashRouter>
          <Suspense fallback={<LoadingPage />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contribution" element={<ContributionPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              <Route
                path="/*"
                element={
                  <Layout>
                    <Suspense fallback={<LoadingPage />}>
                      <Routes>
                        <Route path="dashboard" element={<Dashboard />} />

                        {/* Functional Tools */}
                        <Route
                          path="/tool/css-gradient"
                          element={<CssGradientGenerator />}
                        />
                        <Route
                          path="/tool/clippy"
                          element={<ClippyGenerator />}
                        />
                        <Route
                          path="/tool/animista"
                          element={<AnimistaGenerator />}
                        />
                        <Route
                          path="/tool/box-shadow"
                          element={<BoxShadowGenerator />}
                        />
                        <Route
                          path="/tool/json-formatter"
                          element={<JsonFormatter />}
                        />
                        <Route
                          path="/tool/uuid-gen"
                          element={<UuidGenerator />}
                        />
                        <Route
                          path="/tool/lorem-ipsum"
                          element={<LoremIpsumGenerator_v2 />}
                        />
                        <Route
                          path="/tool/keycode-info"
                          element={<KeycodeInfo />}
                        />
                        <Route
                          path="/tool/glassmorphism"
                          element={<GlassmorphismGenerator />}
                        />
                        <Route
                          path="/tool/neumorphism"
                          element={<NeumorphismGenerator />}
                        />
                        <Route
                          path="/tool/base64-encoder"
                          element={<Base64Converter />}
                        />
                        <Route
                          path="/tool/jwt-decoder"
                          element={<JwtDecoder />}
                        />
                        <Route
                          path="/tool/url-encoder"
                          element={<UrlEncoder />}
                        />
                        <Route
                          path="/tool/chmod-calc"
                          element={<ChmodCalculator />}
                        />
                        <Route
                          path="/tool/timestamp-converter"
                          element={<TimestampConverter />}
                        />
                        <Route
                          path="/tool/fancy-border"
                          element={<FancyBorderGenerator />}
                        />
                        <Route
                          path="/tool/regex-tester"
                          element={<RegexTester />}
                        />
                        <Route
                          path="/tool/bcrypt-gen"
                          element={<BcryptGenerator />}
                        />
                        <Route
                          path="/tool/diffchecker"
                          element={<DiffChecker />}
                        />
                        <Route
                          path="/tool/hash-gen"
                          element={<HashGenerator />}
                        />
                        <Route
                          path="/tool/minifier"
                          element={<MinifierTool />}
                        />
                        <Route
                          path="/tool/layoutit-grid"
                          element={<LayoutitGrid />}
                        />
                        <Route path="/tool/tinypng" element={<TinyPngTool />} />
                        <Route path="/tool/svgomg" element={<SvgOmgTool />} />
                        <Route
                          path="/tool/coolors"
                          element={<PaletteGenerator />}
                        />
                        <Route
                          path="/tool/favicon-gen"
                          element={<FaviconGenerator />}
                        />
                        <Route
                          path="/tool/heroicons"
                          element={<HeroiconsExplorer />}
                        />
                        <Route
                          path="/tool/bundlephobia"
                          element={<BundlePhobiaTool />}
                        />
                        <Route path="/tool/caniuse" element={<CanIUseTool />} />
                        <Route
                          path="/tool/hoppscotch"
                          element={<HoppscotchTool />}
                        />
                        <Route
                          path="/tool/sql-fiddle"
                          element={<SqlFiddleTool />}
                        />
                        <Route
                          path="/tool/mock-data-gen"
                          element={<MockDataGenerator />}
                        />
                        <Route
                          path="/tool/db-diagrams"
                          element={<DbDiagramsTool />}
                        />
                        <Route
                          path="/tool/crontab-guru"
                          element={<CrontabGuruTool />}
                        />
                        <Route
                          path="/tool/nginx-config"
                          element={<NginxConfigTool />}
                        />
                        <Route
                          path="/tool/docker-search"
                          element={<DockerSearchTool />}
                        />
                        <Route
                          path="/tool/gitignore-gen"
                          element={<GitignoreGenerator />}
                        />
                        <Route
                          path="/tool/dns-checker"
                          element={<DnsCheckerTool />}
                        />
                        <Route path="/tool/my-ip" element={<MyIpTool />} />
                        <Route
                          path="/tool/carbon-code"
                          element={<CarbonCodeTool />}
                        />
                        <Route
                          path="/tool/project-boilerplates"
                          element={<BoilerplateGenerator />}
                        />

                        {/* Dynamic Placeholder Routes */}
                        {TOOLS.map(
                          (tool) =>
                            !tool.isImplemented && (
                              <Route
                                key={tool.id}
                                path={`/tool/${tool.slug}`}
                                element={<ToolPlaceholder tool={tool} />}
                              />
                            ),
                        )}
                      </Routes>
                    </Suspense>
                  </Layout>
                }
              />
            </Routes>
            <CookieConsent />
          </Suspense>
        </HashRouter>
      </HelmetProvider>
    </ThemeProvider>
  );
};

export default App;
