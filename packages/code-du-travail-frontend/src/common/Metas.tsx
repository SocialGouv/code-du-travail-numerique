import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { SITE_URL } from "../config";

import { removeQueryParameters } from "../lib";

type Props = {
  title: string;
  description: string;
  overrideCanonical?: string;
  noTitleAdd?: boolean;
};

export default function Metas({
  title,
  description,
  overrideCanonical,
  noTitleAdd,
}: Props): JSX.Element {
  const router = useRouter();

  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <title>{`${title}${noTitleAdd ? "" : " - Code du travail numérique"}`}</title>
      <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
      <meta key="desc" name="description" content={description} />
      {overrideCanonical ? (
        <link key="canonical" rel="canonical" href={overrideCanonical} />
      ) : (
        router &&
        router.asPath && (
          <link
            key="canonical"
            rel="canonical"
            href={`${SITE_URL}${removeQueryParameters(router.asPath)}`}
          />
        )
      )}
      <meta key="twitter:card" name="twitter:card" content="summary" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:type" property="og:type" content="article" />
      <meta key="og:desc" property="og:description" content={description} />
      <meta
        key="og:image"
        property="og:image"
        content={`${SITE_URL}/static/assets/img/social-preview.png`}
      />
      <meta
        key="og:site"
        property="og:site_name"
        content="Code du travail numérique"
      />
      <meta key="og:locale" property="og:locale" content="fr" />
    </Head>
  );
}
