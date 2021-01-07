import getConfig from "next/config";
import Head from "next/head";
import PropTypes from "prop-types";
import React from "react";

const {
  publicRuntimeConfig: { FRONTEND_HOST },
} = getConfig();

export default function Metas({ title, description }) {
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
        content={`${FRONTEND_HOST}/static/assets/img/social-preview.svg`}
      />
      <meta property="og:site_name" content="Code du travail numérique" />
      <meta property="og:locale" content="fr" />
    </Head>
  );
}

Metas.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
};
