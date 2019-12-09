import React from "react";
import getConfig from "next/config";
import {
  Container,
  CardList,
  PageTitle,
  Section,
  Tile
} from "@socialgouv/react-ui";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import * as Sentry from "@sentry/browser";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import { outils } from "../../src/common/Outils";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();
const Outils = ({ pageUrl, ogImage, emailTemplates }) => (
  <Layout currentPage="tools">
    <Metas
      url={pageUrl}
      title={`Boîte a outils - Code du travail numérique`}
      description="Trouvez des réponses personnalisées selon votre situation"
      image={ogImage}
    />
    <Section>
      <Container>
        <PageTitle>Retrouvez tous nos outils</PageTitle>
        <CardList leftStripped title="Nos outils de calcul">
          {outils
            .filter(({ href }) => href.startsWith("/outils"))
            .map(({ title, slug, href }) => (
              <Link href={href} as={slug} passHref key={slug}>
                <Tile custom title={title} />
              </Link>
            ))}
        </CardList>
        <CardList leftStripped title="Nos modèles de lettres personnalisables">
          {emailTemplates.map(({ title, slug }) => (
            <Link
              href="/modeles-de-courriers/[slug]"
              as={`/modeles-de-courriers/${slug}`}
              passHref
              key={slug}
            >
              <Tile title={title} />
            </Link>
          ))}
        </CardList>
      </Container>
    </Section>
  </Layout>
);

Outils.getInitialProps = async () => {
  try {
    const response = await fetch(`${API_URL}/modeles`);
    if (response.ok) {
      const {
        hits: { hits }
      } = await response.json();
      const emailTemplates = hits.map(({ _source }) => _source);
      return { emailTemplates };
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }

  return { emailTemplates: [] };
};

export default Outils;
