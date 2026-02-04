import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeCardItem } from "./queries";
import { HomeButton, SectionContainer, TemplateHomeCard } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  items: Omit<HomeCardItem, "description" | "theme">[];
};

export const Models = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-modeles-de-courriers"
      isTint
      title="Une démarche ? Trouvez le bon modèle de document"
      subtitle="Téléchargez et personnalisez les modèles de documents et de lettres pour vos démarches en lien avec le droit du travail"
      footerNode={
        <HomeButton
          buttonLink="/modeles-de-courriers"
          buttonText="Parcourir les modèles"
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
          className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-3")}
        >
          <TemplateHomeCard {...item} />
        </div>
      ))}
    </SectionContainer>
  );
};
