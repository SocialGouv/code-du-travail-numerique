import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Router from "next/router";

export function _Metas({ url, title, description, image }) {
  return (
    <>
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
    </>
  );
}
export function Metas({ url, ...props }) {
  if (!url && Router && location) {
    url = `${location.protocol}//${location.host}${Router.asPath}`;
  }
  return (
    <Head>
      <_Metas url={url} {...props} />
    </Head>
  );
}

Metas.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string,
  image: PropTypes.string.isRequired
};
