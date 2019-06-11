import React from "react";
import Head from "next/head";
export function Metas({
  title = "",
  description = "",
  url = "",
  image = "/static/images/social-preview.jpg"
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="code du travail numérique" />
      <meta property="og:locale" content="fr" />
    </Head>
  );
}
