import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeCardItem } from "./queries";
import { HomeButton, HomeCard, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  items: HomeCardItem[];
};

export const Contributions = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-fiches-pratiques"
      title="Vos fiches pratiques"
      subtitle="Obtenez une réponse personnalisée selon votre convention collective"
      footerNode={
        <HomeButton
          buttonLink="/contribution"
          buttonText="Voir toutes les fiches pratiques"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_FICHES
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
