"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { HomeSectionCard } from "./HomeSectionCard";
import { HomeSectionTile } from "./HomeSectionTile";
import { HomeListTheme } from "./HomeListTheme";
import { HomeSectionSearch } from "./HomeSectionSearch";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { GetHomePage } from "../../api";

export const Home = (props: GetHomePage) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();
  return (
    <div className={fr.cx("fr-grid-row")}>
      <div className={fr.cx("fr-col-12")}>
        <HomeSectionSearch />
        <HomeSectionCard title="À la une" items={props.highlights} />
        <HomeSectionTile
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
        <HomeSectionCard
          title="Modèles de documents"
          subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
          hasButton
          buttonText="Voir tous les modèles de documents"
          buttonLink="/modeles-de-courriers"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_MODELES
            );
          }}
          items={props.modeles}
        />
        <HomeSectionCard
          title="Vos fiches pratiques"
          subtitle="Obtenez une réponse personnalisée selon votre convention collective"
          hasButton
          buttonText="Voir toutes les fiches pratiques"
          buttonLink="/contribution"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_FICHES
            );
          }}
          items={props.contributions}
        />
        <HomeSectionCard
          isSmallCard
          isTint
          title="Votre convention collective"
          subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
          hasButton
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
          title="Thèmes"
          subtitle="Retrouvez tous nos contenus organisés par thèmes"
          hasButton
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
