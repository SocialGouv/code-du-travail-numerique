import React from "react";
import styled from "styled-components";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/react-ui";
import { getRouteBySource, SOURCES } from "@cdt/sources";
import tools from "@cdt/data...tools/internals.json";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";
import SearchHero from "../src/search/SearchHero";
import { CallToActionTile } from "../src/common/tiles/CallToAction";
import { Themes } from "../src/home/Themes";
import { Highlights } from "../src/home/Highlights";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

// with getStaticProp here we could get tools once with a single api call
// even if the api falls once and for all, this page is 100% static
export async function getStaticProps() {
  let themes = [];
  let highlights = [];
  const [themesResponse, highlightsResponse] = await Promise.all([
    fetch(`${API_URL}/themes`),
    fetch(`${API_URL}/highlights/homepage`),
  ]);
  if (themesResponse.ok) {
    themes = await themesResponse.json().then((themes) => themes.children);
  }
  if (highlightsResponse.ok) {
    highlights = await highlightsResponse.json();
  }

  return {
    props: {
      highlights,
      themes,
    },
  };
}

export const CCTile = (
  <Link href={`/${getRouteBySource(SOURCES.CCN)}`} passHref>
    <CallToActionTile
      action="Consulter"
      custom
      icon={icons.Nego}
      title="Convention collective"
    >
      Recherchez une convention collective par Entreprise, SIRET, Nom ou numéro
      IDCC
    </CallToActionTile>
  </Link>
);

export const DocumentsTile = (
  <Link href={`/${getRouteBySource(SOURCES.LETTERS)}`} passHref>
    <CallToActionTile
      action="Découvrir"
      custom
      icon={icons.Document}
      title="Modèles de documents"
    >
      Téléchargez et utilisez des modèles de lettres et de documents
      personnalisables
    </CallToActionTile>
  </Link>
);

const selectedTools = [
  tools.find((tool) => tool.slug === "preavis-demission"),
  tools.find((tool) => tool.slug === "indemnite-licenciement"),
];

const Home = ({ highlights = [], req, themes = [] }) => (
  <Layout currentPage="home" initialTitle="Code du travail numérique">
    <Metas
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
      title="Code du travail numérique - Ministère du Travail"
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
          {CCTile}
          {selectedTools.map(
            ({ action, description, href, icon, slug, title }) => {
              const linkProps = {
                href,
                passHref: true,
              };
              if (!href) {
                linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`;
                linkProps.as = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
              }
              return (
                <Link {...linkProps} key={slug || href}>
                  <CallToActionTile
                    action={action}
                    custom
                    icon={icons[icon]}
                    title={title}
                  >
                    {description}
                  </CallToActionTile>
                </Link>
              );
            }
          )}
          {DocumentsTile}
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
    {highlights.length > 0 && (
      <Highlights highlights={highlights.slice(0, 6)} />
    )}
  </Layout>
);

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
