import * as Sentry from "@sentry/nextjs";
import React from "react";
import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";
import SearchHero from "../src/search/SearchHero";
import { fetchTools } from "../src/outils/service";
import { API_URL } from "../src/config";
import { Highlights, HomeSlice, Themes, Tools } from "../src/home";

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
    <Tools tools={tools} />
    <HomeSlice
      title="Modèles de documents"
      subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
      triggerName="Voir tous les modèles de documents"
      triggerLink="/modeles-de-courriers"
      content={highlights.slice(0, 4)}
    />
    <HomeSlice
      title="Vos fiches pratiques"
      subtitle="Obtenez une réponse personnalisée selon votre convention collective"
      triggerName="Voir toutes les fiches pratiques"
      triggerLink="/contribution"
      content={highlights.slice(0, 4)}
    />
    <HomeSlice
      title="Votre convention collective"
      subtitle="Retrouvez les questions-réponses fréquentes organisées par thème sur votre convention collective"
      triggerName="Voir toutes les conventions collectives"
      triggerLink="/convention-collective"
      content={highlights.slice(0, 4)}
    />
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
            "simulateur-embauche",
            "indemnite-licenciement",
            "preavis-demission",
            "preavis-licenciement",
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
