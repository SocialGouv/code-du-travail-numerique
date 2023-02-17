import * as Sentry from "@sentry/nextjs";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-sources";
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
import { Layout } from "../src/layout/Layout";
import SearchHero from "../src/search/SearchHero";
import { fetchTools } from "../src/outils/service";
import { API_URL } from "../src/config";
import { Highlights, Themes } from "../src/home";

const Home = ({ themes = [], highlights = [], tools }) => (
  <Layout currentPage="home">
    <Metas
      title="Code du travail numérique - Ministère du Travail"
      noTitleAdd
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
    />
    <SearchHero />
    {highlights.length > 0 && (
      <Highlights highlights={highlights.slice(0, 4)} />
    )}

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
            const linkProps = {
              href,
              passHref: true,
            };
            if (!href) {
              linkProps.href = `/${getRouteBySource(SOURCES.TOOLS)}/${slug}`;
            }
            return (
              <Link {...linkProps} key={slug || href} legacyBehavior>
                <CallToActionTile
                  action={action}
                  custom
                  icon={icons[icon]}
                  title={title}
                  titleTagType="h3"
                  centerTitle
                >
                  <Paragraph noMargin>{description}</Paragraph>
                </CallToActionTile>
              </Link>
            );
          })}
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
    <Themes themes={themes} />
  </Layout>
);

export async function getStaticProps() {
  let themes = [];
  let highlights = [];
  let tools: any = [];
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

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      highlights,
      themes,
      tools,
    },
    revalidate: 60 * 10, // 10 minutes
  };
}

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
