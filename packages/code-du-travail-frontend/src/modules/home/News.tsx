import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeNewsCardItem } from "./queries";
import { HomeButton, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";
import { HomeNewsCard } from "./Components/HomeNewsCard";

type Props = {
  items: HomeNewsCardItem[];
};

export const News = ({ items }: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();

  return (
    <SectionContainer
      sectionId="home-actualite"
      title="Actualités"
      subtitle=""
      footerNode={
        <HomeButton
          buttonLink="/actualite"
          buttonText="Lire toutes les actualités"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_ACTUALITES
            );
          }}
        />
      }
    >
      {items.map((item) => (
        <div
          key={`${item.link}`}
          className={fr.cx("fr-col-12", "fr-col-md-6", "fr-col-lg-6")}
        >
          <HomeNewsCard {...item} />
        </div>
      ))}
    </SectionContainer>
  );
};
