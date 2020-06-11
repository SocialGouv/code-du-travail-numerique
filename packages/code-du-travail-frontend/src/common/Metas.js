import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import absoluteUrl from "next-absolute-url";
import parseUrl from "parseurl";

export default function Metas({ description, req, title }) {
  const { origin } = absoluteUrl(req);
  const url = `${origin}${
    req ? parseUrl(req).pathname : window.location.pathname
  }`;
  const image = `${origin}/static/assets/img/social-preview.png`;

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

Metas.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
};
