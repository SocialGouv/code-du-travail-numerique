"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { HomeSectionCard } from "./HomeSectionCard";
import { HomeSectionTile } from "./HomeSectionTile";
import { HomeListTheme } from "./HomeListTheme";

export const Home = () => (
  <div className={fr.cx("fr-grid-row")}>
    <div className={fr.cx("fr-col-12")}>
      <HomeSectionCard
        title="À la une"
        items={[
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
        ]}
      />
      <HomeSectionTile
        title="Boîte à outils"
        subtitle="Trouvez des réponses personnalisées selon votre situation"
        items={[
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Fiche pratique 1",
          },
        ]}
        buttonText="Voir tous les outils"
        buttonLink="/outils"
        onButtonClick={() => {
          console.log("link click");
        }}
      />
      <HomeSectionCard
        title="Modèles de documents"
        subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
        items={[
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
        ]}
        hasButton
        buttonText="Voir tous les modèles de documents"
        buttonLink="/modeles-de-courriers"
        onButtonClick={() => {
          console.log("link click");
        }}
      />
      <HomeSectionCard
        title="Vos fiches pratiques"
        subtitle="Obtenez une réponse personnalisée selon votre convention collective"
        items={[
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
        ]}
        hasButton
        buttonText="Voir toutes les fiches pratiques"
        buttonLink="/contribution"
        onButtonClick={() => {
          console.log("link click");
        }}
      />
      <HomeSectionCard
        title="Votre convention collective"
        subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
        items={[
          {
            description:
              "Retrouvez les questions-réponses les plus fréquentes organisées par thème et élaborées par le ministère du Travail vous concernant.",
            link: "/contribution",
            theme: "Convention collective",
            title: "Métallurgie",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "Convention collective",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
          {
            description: "Fiche pratique 1",
            link: "/contribution",
            theme: "theme",
            title: "Fiche pratique 1",
          },
        ]}
        hasButton
        buttonText="Voir toutes les conventions collectives"
        buttonLink="/convention-collective"
        onButtonClick={() => {
          console.log("link click");
        }}
        isSmallCard={true}
        isTint={true}
      />
      <HomeListTheme
        title="Thèmes"
        subtitle="Retrouvez tous nos contenus organisés par thèmes"
        hasButton
        buttonText="Voir tous les thèmes"
        buttonLink="/themes"
        onButtonClick={() => {
          console.log("link click");
        }}
        items={[
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
          {
            link: "/contribution",
            imageUrl: "/static/assets/icons/simulateurs/accord.svg",
            title: "Embauche et contrat de travail",
          },
        ]}
      />
    </div>
  </div>
);
