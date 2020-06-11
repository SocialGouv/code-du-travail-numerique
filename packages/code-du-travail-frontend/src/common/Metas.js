import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const CDTN_URL = "https://code.travail.gouv.fr";

export default function Metas({ description, pathname = "", title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${CDTN_URL}/static/assets/img/social-preview.png`}
      />
      <meta property="og:url" content={`${CDTN_URL}${pathname}`} />
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
