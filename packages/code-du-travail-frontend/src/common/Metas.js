import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React from "react";

const {
  publicRuntimeConfig: { FRONTEND_HOST },
} = getConfig();

export default function Metas({ title, description }) {
  const router = useRouter();
  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link
        key="rel-stylesheet"
        rel="stylesheet"
        type="text/css"
        href="/static/fonts.css"
      />
      <link key="favicon" rel="shortcut icon" href="/favicon.ico" />

      <title>{title}</title>
      <link
        key="canonical"
        href={`${FRONTEND_HOST}${router.asPath !== "/" ? router.asPath : ""}`}
        rel="canonical"
      />
      <meta key="desc" name="description" content={description} />
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="article" />
      <meta key="og:desc" property="og:description" content={description} />
      <meta
        key="og:image"
        property="og:image"
        content={`${FRONTEND_HOST}/static/assets/img/social-preview.png`}
      />
      <meta
        key="og:site"
        property="og:site_name"
        content="Code du travail numérique"
      />
      <meta key="og:locale" property="og:locale" content="fr" />
      <script key="polyfill" src="/static/polyfill.min.js" />
      <script
        key="webcomponents"
        src="/static/webcomponents-polyfill/loader.js"
      />
      <script key="smarttag" src="/static/smarttag.js" />
    </Head>
  );
}

Metas.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
};
