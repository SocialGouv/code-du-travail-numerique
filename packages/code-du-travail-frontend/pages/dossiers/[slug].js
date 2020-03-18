import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import {
  Container,
  FlatList,
  ListItem,
  Title,
  PageTitle,
  Section
} from "@socialgouv/react-ui";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";
import { Breadcrumbs } from "../../src/common/Breadcrumbs";
import { ListLink } from "../../src/search/SearchResults/Results";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

function DossierThematique({ dossier, ogImage, pageUrl }) {
  if (!dossier) {
    return <Answer emptyMessage="Cet dossier thématique n'a pas été trouvé" />;
  }
  const { title, description, refs, aside } = dossier;
  console.log(refs);
  const mainRefs = refs.filter(({ type }) => type === "main");
  const secondaryRefs = refs.filter(({ type }) => type === "secondary");
  const themeRefs = refs.filter(({ type }) => type === "theme");
  const templateRefs = refs.filter(({ type }) => type === "template");
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={`${title}`}
        description={title}
        image={ogImage}
      />
      <Section>
        <Breadcrumbs items={[{ slug: "/dossiers", label: "dossiers" }]} />
        <Container narrow>
          <PageTitle>{title}</PageTitle>
          <Html>{description}</Html>
        </Container>
        <Container>
          <Title>L’essentiel</Title>
          <FlatList>
            {mainRefs.map(item => (
              <li key={item.slug}>
                <ListLink item={item} />
              </li>
            ))}
          </FlatList>
          <Title>Pour aller plus loin</Title>
        </Container>
      </Section>
    </Layout>
  );
}

DossierThematique.getInitialProps = async ({ query: { slug } }) => {
  const responseContainer = await fetch(`${API_URL}/dossiers/${slug}`);
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  const dossier = await responseContainer.json();
  return { dossier };
};

export default DossierThematique;
