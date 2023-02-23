import * as Sentry from "@sentry/nextjs";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-types";
import {
  Button,
  Container,
  Grid,
  icons,
  PageTitle,
  Paragraph,
  Section,
  theme,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Metas from "../src/common/Metas";
import { CallToActionTile } from "../src/common/tiles/CallToAction";
import { Highlights } from "../src/home/Highlights";
import { Themes } from "../src/home/Themes";
import { Layout } from "../src/layout/Layout";
import SearchHero from "../src/search/SearchHero";
import { fetchTools } from "../src/outils/service";
import { API_URL } from "../src/config";

const DocumentsTile = (
  <CallToActionTile
    action="Découvrir"
    custom
    icon={icons.Document}
    title="Modèles de documents"
    titleTagType="h2"
    centerTitle
    href={`/${getRouteBySource(SOURCES.LETTERS)}`}
  >
    <Paragraph noMargin>
      Téléchargez et utilisez des modèles de lettres et de documents
      personnalisables
    </Paragraph>
  </CallToActionTile>
);

const Home = ({ themes = [], highlights = [], tools }) => (
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
          {tools.map(({ action, description, href, icon, slug, title }) => {
            if (!href) {
              href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
            }
            return (
              <CallToActionTile
                action={action}
                custom
                icon={icons[icon]}
                title={title}
                titleTagType="h3"
                centerTitle
                href={href}
                key={slug || href}
              >
                <Paragraph noMargin>{description}</Paragraph>
              </CallToActionTile>
            );
          })}
          {DocumentsTile}
        </Grid>
        <ButtonWrapper>
          <Link href="/outils" passHref legacyBehavior>
            <Button variant="primary" as="a">
              Voir tous les outils <StyledArrowRight />
            </Button>
          </Link>
        </ButtonWrapper>
      </Container>
    </Section>
  </Layout>
);

Home.getInitialProps = async () => {
  let themes = [];
  let highlights = [];
  let tools = [];
  try {
    const [themesResponse, highlightsResponse, toolsResponse] =
      await Promise.all([
        fetch(`${API_URL}/themes`),
        fetch(`${API_URL}/highlights/homepage`),
        fetchTools({
          slugs: [
            "convention-collective",
            "preavis-demission",
            "simulateur-embauche",
          ],
        }),
      ]);
    if (themesResponse.ok) {
      themes = await themesResponse.json().then((themes) => themes.children);
    }
    if (highlightsResponse.ok) {
      highlights = await highlightsResponse.json();
    }
    tools = toolsResponse;
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }
  return { highlights, themes, tools };
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
