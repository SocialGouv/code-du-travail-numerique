import React from "react";
import styled from "styled-components";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import * as Sentry from "@sentry/browser";
import Link from "next/link";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
  theme
} from "@socialgouv/react-ui";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import tools from "@cdt/data...tools";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import SearchHero from "../src/search/SearchHero";
import { CustomTile } from "../src/common/tiles/Custom";
import { Themes } from "../src/home/Themes";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const selectedTools = [
  {
    title: "Convention collective",
    action: "Consulter",
    description:
      "Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro IDCC",
    href: `/${getRouteBySource(SOURCES.CCN)}/recherche`,
    icon: "Nego"
  },
  tools.find(tool => tool.slug === "preavis-demission"),
  tools.find(tool => tool.slug === "simulateur-embauche"),
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
        <PageTitle
          as="h2"
          subtitle="Trouvez des réponses personnalisées selon votre situation"
        >
          Boîte à outils
        </PageTitle>
        <Grid>
          {selectedTools.map(
            ({ action, description, href, icon, slug, title }) => {
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
            }
          )}
        </Grid>
        <ButtonWrapper>
          <Link href="/outils" passHref>
            <Button variant="primary" as="a">
              Voir tous les outils <StyledArrowRight />
            </Button>
          </Link>
        </ButtonWrapper>
      </Container>
    </Section>
    {themes.length > 0 && <Themes themes={themes} />}
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

const { spacings } = theme;

const ButtonWrapper = styled.div`
  text-align: center;
`;

const StyledArrowRight = styled(icons.DirectionRight)`
  width: 2.8rem;
  height: 1.5rem;
  margin-left: ${spacings.base};
`;
