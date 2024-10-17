"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { HomeSectionCard } from "./HomeSectionCard";
import { HomeSectionTile } from "./HomeSectionTile";
import { HomeListTheme } from "./HomeListTheme";
import { HomeSectionSearch } from "./HomeSectionSearch";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeSectionCardWithButton } from "./HomeSectionCardWithButton";
import { HomePageProps } from "./queries";

export const Home = (props: HomePageProps) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-12")}>
        <HomeSectionSearch />
        <HomeSectionCard
          sectionId="home-highlights"
          title="À la une"
          items={props.highlights}
        />
        <HomeSectionTile
          sectionId="home-outils"
          title="Boîte à outils"
          subtitle="Trouvez des réponses personnalisées selon votre situation"
          buttonText="Voir tous les outils"
          buttonLink="/outils"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_OUTILS
            );
          }}
          items={props.tools}
        />
        <HomeSectionCardWithButton
          sectionId="home-modeles-de-courriers"
          title="Modèles de documents"
          subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
          buttonText="Voir tous les modèles de documents"
          buttonLink="/modeles-de-courriers"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_MODELES
            );
          }}
          items={props.modeles}
        />
        <HomeSectionCardWithButton
          sectionId="home-fiches-pratiques"
          title="Vos fiches pratiques"
          subtitle="Obtenez une réponse personnalisée selon votre convention collective"
          buttonText="Voir toutes les fiches pratiques"
          buttonLink="/contribution"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_FICHES
            );
          }}
          items={props.contributions}
        />
        <HomeSectionCardWithButton
          sectionId="home-convention-collective"
          isSmallCard
          isTint
          title="Votre convention collective"
          subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
          buttonText="Voir toutes les conventions collectives"
          buttonLink="/convention-collective"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_CONVENTIONS_COLLECTIVES
            );
          }}
          items={props.agreements}
        />
        <HomeListTheme
          sectionId="home-themes"
          title="Thèmes"
          subtitle="Retrouvez tous nos contenus organisés par thèmes"
          buttonText="Voir tous les thèmes"
          buttonLink="/themes"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_THEMES
            );
          }}
          items={props.themes}
        />
      </div>
    </div>
  );
};
