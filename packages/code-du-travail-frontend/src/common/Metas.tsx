import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import { removeQueryParameters } from "../lib";
import EventTracker from "../lib/tracking/EventTracker";

const {
  publicRuntimeConfig: { FRONTEND_HOST },
} = getConfig();

type Props = {
  title: string;
  description: string;
  overrideCanonical?: string;
};

export default function Metas({
  title,
  description,
  overrideCanonical,
}: Props): JSX.Element {
  const router = useRouter();
  return (
    <Head>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <title>{title}</title>
      <link key="favicon" rel="shortcut icon" href="/favicon.ico" />
      <meta key="desc" name="description" content={description} />
      <link
        key="canonical"
        href={
          overrideCanonical ??
          `${FRONTEND_HOST}${
            router.asPath !== "/" ? removeQueryParameters(router.asPath) : ""
          }`
        }
        rel="canonical"
      />
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
      <EventTracker />
    </Head>
  );
}
