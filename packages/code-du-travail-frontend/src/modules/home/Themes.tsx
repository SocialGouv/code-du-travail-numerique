import Image from "next/image";
import { HomeButton, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeTileItem } from "./queries";
import IllustrationTheme from "./picto/themes.svg";
import { ThemeTile } from "../themes/ThemeTile";
import { css } from "@styled-system/css";

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
      listAs="ul"
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
        <li
          className={`${fr.cx("fr-col-4", "fr-hidden", "fr-unhidden-lg")} ${li}`}
        >
          <Image
            src={IllustrationTheme}
            alt="Illustration graphique sur les thèmes"
            width="384"
            height="233"
          />
        </li>
        {props.items.map((item, index) => (
          <li
            key={`${index}${JSON.stringify(item)}`}
            className={`${fr.cx(
              "fr-col-12",
              "fr-col-sm-6",
              "fr-col-md-4",
              "fr-col-lg-2"
            )} ${li}`}
          >
            <ThemeTile {...item} />
          </li>
        ))}
      </>
    </SectionContainer>
  );
};
const li = css({
  listStyle: "none!",
});
