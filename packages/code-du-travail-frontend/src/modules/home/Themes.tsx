import Image from "next/image";
import { HomeButton, SectionContainer } from "./Components";
import { fr } from "@codegouvfr/react-dsfr";
import { MatomoHomeEvent, useHomeTracking } from "./tracking";
import { HomeTileItem } from "./queries";
import { css } from "@styled-system/css";
import { HomeThemeTile } from "../themes/HomeThemeTile";

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
            src={"/static/assets/icons/home/themes.svg"}
            alt=""
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
            <HomeThemeTile {...item} />
          </li>
        ))}
      </>
    </SectionContainer>
  );
};
const li = css({
  listStyle: "none!",
});
