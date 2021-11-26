import tools from "@cdt/data...tools/internals.json";
import * as Sentry from "@sentry/nextjs";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

import Metas from "../src/common/Metas";
import { CallToActionTile } from "../src/common/tiles/CallToAction";
import { Highlights } from "../src/home/Highlights";
import { Themes } from "../src/home/Themes";
import { Layout } from "../src/layout/Layout";
import EventTracker from "../src/lib/tracking/EventTracker";
import SearchHero from "../src/search/SearchHero";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

export const DocumentsTile = (
  <Link href={`/${getRouteBySource(SOURCES.LETTERS)}`} passHref>
    <CallToActionTile
      action="Découvrir"
      custom
      icon={icons.Document}
      title="Modèles de documents"
      titleTagType="h2"
    >
      Téléchargez et utilisez des modèles de lettres et de documents
      personnalisables
    </CallToActionTile>
  </Link>
);

const selectedTools = [
  tools.find((tool) => tool.slug === "convention-collective"),
  tools.find((tool) => tool.slug === "preavis-demission"),
  tools.find((tool) => tool.slug === "simulateur-embauche"),
];

const Home = ({ themes = [], highlights = [] }) => (
  <Layout currentPage="home" initialTitle="Code du travail numérique">
    <Metas
      title="Code du travail numérique - Ministère du Travail"
      noTitleAdd
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
    />
    <SearchHero />
    {highlights.length > 0 && (
      <Highlights highlights={highlights.slice(0, 4)} />
    )}
    {themes.length > 0 && <Themes themes={themes} />}

    <Section>
      <Container>
        <PageTitle
          as="h2"
          subtitle="Trouvez des réponses personnalisées selon votre situation"
          stripe="left"
        >
          Boîte à outils
        </PageTitle>
        <Grid>
          {selectedTools.map(
            ({ action, description, href, icon, slug, title }) => {
              const linkProps = {
                href,
                passHref: true,
              };
              if (!href) {
                linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
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
    <EventTracker />
  </Layout>
);

Home.getInitialProps = async () => {
  let themes = [];
  let highlights = [];
  try {
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
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }
  return { highlights, themes };
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
