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
import { SOURCES, getRouteBySource } from "@cdt/sources";

import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();
const Tools = ({ pageUrl, ogImage, emailTemplates, tools = [] }) => (
  <Layout>
    <Metas
      url={pageUrl}
      title={`Boîte a outils - Code du travail numérique`}
      description="Trouvez des réponses personnalisées selon votre situation"
      image={ogImage}
    />
    <Section>
      <Container>
        <PageTitle>Retrouvez tous nos outils</PageTitle>
        <CardList title="Nos outils de calcul">
          {tools.map(({ title, slug }) => (
            <Link
              href={`/${getRouteBySource(SOURCES.TOOLS)}/[slug]`}
              as={`/${getRouteBySource(SOURCES.TOOLS)}/${slug}`}
              passHref
              key={slug}
            >
              <Tile button={"Démarrer"}>{title}</Tile>
            </Link>
          ))}
        </CardList>
        <CardList title="Nos modèles de lettres personnalisables">
          {emailTemplates.map(({ title, slug }) => (
            <Link
              href="/modeles-de-courriers/[slug]"
              as={`/modeles-de-courriers/${slug}`}
              passHref
              key={slug}
            >
              <Tile button="Consulter" title={`consulter le modele ${title}`}>
                {title}
              </Tile>
            </Link>
          ))}
        </CardList>
      </Container>
    </Section>
  </Layout>
);

Tools.getInitialProps = async () => {
  const [toolsResponse, modelesResponse] = await Promise.all([
    fetch(`${API_URL}/tools`),
    fetch(`${API_URL}/modeles`)
  ]);
  if (!toolsResponse.ok) {
    return { statusCode: toolsResponse.status };
  }
  if (!modelesResponse.ok) {
    return { statusCode: modelesResponse.status };
  }
  const [
    { children: tools },
    {
      hits: { hits }
    }
  ] = await Promise.all([toolsResponse.json(), modelesResponse.json()]);
  const emailTemplates = hits.map(({ _source }) => _source);

  return { tools, emailTemplates };
};

export default Tools;
