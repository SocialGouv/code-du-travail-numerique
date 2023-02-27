import * as Sentry from "@sentry/nextjs";
import React from "react";
import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";
import SearchHero from "../src/search/SearchHero";
import { SITE_URL } from "../src/config";
import { Highlights, HomeSlice, Themes, Tools } from "../src/home";
import { GetHomePage } from "../src/api";
import { ListLinkItemProps } from "../src/search/SearchResults/Results";

const Home = ({
  themes,
  highlights,
  tools,
  agreements,
  contributions,
  modeles,
}: GetHomePage) => (
  <Layout currentPage="home">
    <Metas
      title="Code du travail numérique - Ministère du Travail"
      noTitleAdd
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
    />
    <SearchHero />
    {highlights.length > 0 && (
      <Highlights id="highlights-element" highlights={highlights.slice(0, 4)} />
    )}
    <Tools tools={tools} />
    <HomeSlice
      sectionId="home-modeles-de-courriers"
      title="Modèles de documents"
      subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
      triggerName="Voir tous les modèles de documents"
      triggerLink="/modeles-de-courriers"
      content={modeles as ListLinkItemProps[]}
    />
    <HomeSlice
      sectionId="home-fiches-pratiques"
      title="Vos fiches pratiques"
      subtitle="Obtenez une réponse personnalisée selon votre convention collective"
      triggerName="Voir toutes les fiches pratiques"
      triggerLink="/contribution"
      content={contributions as ListLinkItemProps[]}
    />
    <HomeSlice
      sectionId="home-convention-collective"
      title="Votre convention collective"
      subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
      triggerName="Voir toutes les conventions collectives"
      triggerLink="/convention-collective"
      content={agreements as ListLinkItemProps[]}
    />
    <Themes themes={themes} />
  </Layout>
);

export async function getStaticProps() {
  let themes: GetHomePage["themes"] = [];
  let highlights: GetHomePage["highlights"] = [];
  let tools: GetHomePage["tools"] = [];
  let contributions: GetHomePage["contributions"] = [];
  let modeles: GetHomePage["modeles"] = [];
  let agreements: GetHomePage["agreements"] = [];

  try {
    const response = await fetch(`${SITE_URL}/api/home`);
    if (!response.ok) throw new Error(response.statusText);
    const data: GetHomePage = await response.json();
    themes = data.themes.children;
    highlights = data.highlights;
    tools = data.tools.map(({ _id, _source }) => ({ ..._source, _id }));
    contributions = data.contributions;
    modeles = data.modeles;
    agreements = data.agreements;
  } catch (e) {
    console.error(e);
    Sentry.captureException(e);
  }

  return {
    props: {
      highlights,
      themes,
      tools,
      contributions,
      modeles,
      agreements,
    },
    revalidate: 60 * 10, // 10 minutes
  };
}

export default Home;
