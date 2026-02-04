import React from "react";
import { Helmet } from "react-helmet-async";

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DevToolkit",
  url: "https://devtoolkit.App",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://devtoolkit.App/dashboard?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DevToolkit",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Uma coleção completa de utilitários para desenvolvedores: JSON Formatter, CSS Generators, Regex tools e mais.",
};
