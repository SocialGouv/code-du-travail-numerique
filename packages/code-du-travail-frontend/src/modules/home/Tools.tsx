import { HomeTileItem } from "./queries";
import { HomeButton, SectionContainer } from "./Components";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { fr } from "@codegouvfr/react-dsfr";
import { ToolTile } from "../outils/ToolTile";

type Props = {
  items: HomeTileItem[];
};

export const Tools = (props: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();
  return (
    <SectionContainer
      sectionId="home-outils"
      isTint
      title="Boîte à outils"
      subtitle="Trouvez des réponses personnalisées selon votre situation"
      footerNode={
        <HomeButton
          buttonLink="/outils"
          buttonText="Voir tous les outils"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUS_LES_OUTILS
            );
          }}
        />
      }
    >
      {props.items.map((item, index) => (
        <div
          key={`${index}${JSON.stringify(item)}`}
          className={fr.cx(
            "fr-col-12",
            "fr-col-sm-6",
            "fr-col-md-6",
            "fr-col-lg-3"
          )}
        >
          <ToolTile {...item} />
        </div>
      ))}
    </SectionContainer>
  );
};
