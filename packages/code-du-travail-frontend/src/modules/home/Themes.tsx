import Image from "next/image";
import { HomeButton, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeTileItem } from "./queries";
import IllustrationTheme from "./picto/themes.svg";
import { ThemeTile } from "../themes/ThemeTile";

type Props = {
  items: HomeTileItem[];
};

export const Themes = (props: Props) => {
  const { emitHomeClickButtonEvent } = useHomeTracking();
  return (
    <SectionContainer
      sectionId="home-themes"
      title="Thèmes"
      subtitle="Retrouvez tous nos contenus organisés par thèmes"
      footerNode={
        <HomeButton
          buttonLink="/themes"
          buttonText="Voir tous les thèmes"
          onButtonClick={() => {
            emitHomeClickButtonEvent(
              MatomoHomeEvent.CLICK_VOIR_TOUTES_LES_THEMES
            );
          }}
        />
      }
    >
      <>
        <div className={fr.cx("fr-col-4", "fr-hidden", "fr-unhidden-lg")}>
          <Image src={IllustrationTheme} alt="" width="384" height="233" />
        </div>
        {props.items.map((item, index) => (
          <div
            key={`${index}${JSON.stringify(item)}`}
            className={fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-4",
              "fr-col-lg-2"
            )}
          >
            <ThemeTile {...item} />
          </div>
        ))}
      </>
    </SectionContainer>
  );
};
