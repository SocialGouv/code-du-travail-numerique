import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeCardItem } from "./queries";
import { HomeButton, HomeCard, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  items: HomeCardItem[];
};

export const Models = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-modeles-de-courriers"
      title="Modèles de documents"
      subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
      footerNode={
        <HomeButton
          buttonLink="/modeles-de-courriers"
          buttonText="Voir tous les modèles de documents"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_MODELES
            );
          }}
        />
      }
    >
      {items.map((item, index) => (
        <div
          key={`${index}${JSON.stringify(item)}`}
          className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-6")}
        >
          <HomeCard {...item} />
        </div>
      ))}
    </SectionContainer>
  );
};
