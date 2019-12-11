import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import * as Sentry from "@sentry/browser";
import Link from "next/link";
import {
  CardList,
  Container,
  icons,
  Section,
  Tile
} from "@socialgouv/react-ui";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import tools from "@cdt/data...tools";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import SearchHero from "../src/search/SearchHero";
import { CustomTile } from "../src/common/tiles/Custom";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const additionalTools = [
  {
    title: "Modèles de documents",
    action: "Découvrir",
    description:
      "Téléchargez et utilisez des modèles de lettres et de documents personnalisables",
    href: "/modeles-de-courriers",
    icon: "Document"
  }
];

const Home = ({ pageUrl, ogImage, themes = [] }) => (
  <Layout currentPage="home">
    <Metas
      url={pageUrl}
      title="Code du travail numérique"
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
      image={ogImage}
    />
    <SearchHero />
    <Section>
      <Container>
        <CardList
          title="Boîte à outils"
          desc="Trouvez des réponses personnalisées selon votre situation"
          href="/outils"
        >
          {additionalTools
            .concat(tools)
            .slice(0, 4)
            .map(({ action, description, href, icon, slug, title }) => {
              const linkProps = {
                href,
                passHref: true
              };
              if (!href) {
                linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`;
                linkProps.as = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              }
              return (
                <Link {...linkProps} key={slug || href}>
                  <CustomTile action={action} icon={icons[icon]} title={title}>
                    {description}
                  </CustomTile>
                </Link>
              );
            })}
        </CardList>
      </Container>
    </Section>
    {themes.length > 0 && (
      <Section>
        <Container>
          <CardList
            title="Thèmes"
            desc="Retrouvez tous nos contenus organisés par thèmes"
            href="/themes"
          >
            {themes.map(({ slug, title }) => (
              <Link
                key={slug}
                href="/themes/[slug]"
                as={`/themes/${slug}`}
                passHref
              >
                <Tile title={title} />
              </Link>
            ))}
          </CardList>
        </Container>
      </Section>
    )}
  </Layout>
);

Home.getInitialProps = async () => {
  try {
    const response = await fetch(`${API_URL}/themes`);
    if (response.ok) {
      const { children: themes } = await response.json();
      return { themes };
    }
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }
  return { themes: [] };
};

export default Home;
