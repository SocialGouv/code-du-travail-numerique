import * as Sentry from "@sentry/nextjs";
import React from "react";
import Metas from "../src/common/Metas";
import { Layout } from "../src/layout/Layout";
import SearchHero from "../src/search/SearchHero";
import { Highlights, HomeSlice, Themes, Tools } from "../src/home";
import { GetHomePage, getHomeData } from "../src/api";
import { ListLinkItemProps } from "../src/search/SearchResults/Results";
import { push as matopush } from "@socialgouv/matomo-next";
import { MatomoBaseEvent, MatomoHomeEvent } from "../src/lib";
import EventTracker from "../src/lib/tracking/EventTracker";

const Home = ({
  themes,
  highlights,
  tools,
  agreements,
  contributions,
  modeles,
}: GetHomePage) => {
  const onSendMatomoEvent = (eventName: MatomoHomeEvent) => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.PAGE_HOME,
      eventName,
    ]);
  };

  return (
    <Layout currentPage="home">
      <Metas
        title="Code du travail numérique - Ministère du Travail"
        noTitleAdd
        description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités)."
      />
      <SearchHero />
      {highlights.length > 0 && (
        <Highlights
          id="highlights-element"
          highlights={highlights.slice(0, 4)}
        />
      )}
      <Tools
        tools={tools}
        triggerOnClick={() =>
          onSendMatomoEvent(MatomoHomeEvent.CLICK_VOIR_TOUS_LES_OUTILS)
        }
      />
      <HomeSlice
        sectionId="home-modeles-de-courriers"
        title="Modèles de documents"
        subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
        triggerName="Voir tous les modèles de documents"
        triggerLink="/modeles-de-courriers"
        content={modeles as ListLinkItemProps[]}
        triggerOnClick={() =>
          onSendMatomoEvent(MatomoHomeEvent.CLICK_VOIR_TOUS_LES_MODELES)
        }
      />
      <HomeSlice
        sectionId="home-fiches-pratiques"
        title="Vos fiches pratiques"
        subtitle="Obtenez une réponse personnalisée selon votre convention collective"
        triggerName="Voir toutes les fiches pratiques"
        triggerLink="/contribution"
        content={contributions as ListLinkItemProps[]}
        triggerOnClick={() =>
          onSendMatomoEvent(MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_FICHES)
        }
      />
      <HomeSlice
        sectionId="home-convention-collective"
        title="Votre convention collective"
        subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
        triggerName="Voir toutes les conventions collectives"
        triggerLink="/convention-collective"
        content={agreements as ListLinkItemProps[]}
        triggerOnClick={() =>
          onSendMatomoEvent(
            MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_CONVENTIONS_COLLECTIVES
          )
        }
      />
      <Themes
        themes={themes}
        triggerOnClick={() =>
          onSendMatomoEvent(MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_THEMES)
        }
      />
      <EventTracker />
    </Layout>
  );
};

export async function getStaticProps() {
  let themes: GetHomePage["themes"] = [];
  let highlights: GetHomePage["highlights"] = [];
  let tools: GetHomePage["tools"] = [];
  let contributions: GetHomePage["contributions"] = [];
  let modeles: GetHomePage["modeles"] = [];
  let agreements: GetHomePage["agreements"] = [];

  try {
    const data: GetHomePage = await getHomeData();
    themes = data.themes.children;
    highlights = data.highlights;
    tools = data.tools.map(({ _id, _source }) => ({ ..._source, _id }));
    contributions = data.contributions;
    modeles = data.modeles;
    agreements = data.agreements.map((v) => ({ ...v, title: v.shortTitle }));
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
  };
}

export default Home;
