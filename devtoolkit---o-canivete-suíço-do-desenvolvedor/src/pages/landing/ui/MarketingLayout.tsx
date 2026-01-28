import * as React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Code, Heart } from "lucide-react";
import {
  LiquidHeader,
  NavBrand,
  NavLinks,
  NavLink,
  MenuButton,
  Footer,
  ContentWrapper,
  LandingContainer,
} from "./LandingPage.styles";

import { Seo } from "../../../shared/ui/Seo/Seo";
import {
  JsonLd,
  websiteSchema,
  softwareApplicationSchema,
} from "../../../shared/ui/JsonLd/JsonLd";

interface MarketingLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  keywords?: string;
}

const MarketingLayout: React.FC<MarketingLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <LandingContainer>
      <Seo title={title} description={description} keywords={keywords} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={softwareApplicationSchema} />
      <Helmet>
        <meta name="theme-color" content="#030712" />
      </Helmet>

      <LiquidHeader>
        <NavBrand>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <Code size={18} className="text-white" />
          </div>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            DevToolkit
          </Link>
        </NavBrand>

        <NavLinks>
          <NavLink as={Link} to="/">
            Home
          </NavLink>
          <NavLink as={Link} to="/about">
            Sobre a Ferramenta
          </NavLink>
          <NavLink as={Link} to="/blog">
            Blog
          </NavLink>
          <NavLink as={Link} to="/contribution">
            Contribua
          </NavLink>
        </NavLinks>

        <Link to="/dashboard">
          <MenuButton size="sm">Usar Agora</MenuButton>
        </Link>
      </LiquidHeader>

      {children}

      <Footer>
        <ContentWrapper>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="flex items-center gap-2 text-slate-500 text-sm">
              <Heart size={14} className="text-red-500 fill-red-500" /> Open
              Source by André Rodrigues
            </p>
            <div className="flex gap-6 text-sm text-slate-500 font-medium">
              <Link to="/about" className="hover:text-white transition-colors">
                Sobre
              </Link>
              <Link
                to="/contribution"
                className="hover:text-white transition-colors"
              >
                Contribua
              </Link>
              <a href="#" className="hover:text-white transition-colors">
                License
              </a>
            </div>
          </div>
        </ContentWrapper>
      </Footer>
    </LandingContainer>
  );
};

export default MarketingLayout;
