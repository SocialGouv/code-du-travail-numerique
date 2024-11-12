import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeCardItem } from "./queries";
import { HomeButton, HomeCard, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  items: HomeCardItem[];
};

export const Agreements = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-convention-collective"
      title="Votre convention collective"
      subtitle="Retrouvez les questions-réponses fréquentes organisées par thème pour votre convention collective"
      isTint
      footerNode={
        <HomeButton
          buttonLink="/convention-collective"
          buttonText="Voir toutes les conventions collectives"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_CONVENTIONS_COLLECTIVES
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
          <HomeCard {...item} />
        </div>
      ))}
    </SectionContainer>
  );
};
