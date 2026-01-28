import React from "react";
import { Helmet } from "react-helmet-async";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string;
  noIndex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = "DevToolkit - O Canivete Suíço Digital para Desenvolvedores. Ferramentas essenciais como formatadores, conversores, geradores de código e muito mais.",
  canonical,
  ogImage = "/og-image.png",
  ogType = "website",
  keywords = "developer tools, json formatter, css generator, sql formatter, regex tester, web development, productivity",
  noIndex = false,
}) => {
  const siteUrl = "https://devtoolkit.App"; // Replace with actual URL
  const fullTitle = `${title} | DevToolkit`;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={`${siteUrl}${canonical}`} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:url"
        content={canonical ? `${siteUrl}${canonical}` : siteUrl}
      />
      <meta property="og:site_name" content="DevToolkit" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
