import Image from "next/image";
import { HomeTile } from "./HomeTile";
import { HomeWrapper, HomeWrapperWithButtonProps } from "./HomeWrapper";
import { css } from "../../../styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";

type Props = HomeWrapperWithButtonProps & {
  items: HomeThemeItem[];
};

type HomeThemeItem = {
  title: string;
  imageUrl: string;
  link: string;
};

export const HomeListTheme = (props: Props) => (
  <HomeWrapper
    isTint={props.isTint}
    hasButton={true}
    buttonLink={props.buttonLink}
    buttonText={props.buttonText}
    onButtonClick={props.onButtonClick}
    title={props.title}
    subtitle={props.subtitle}
  >
    <>
      <Image
        src="/static/assets/img/illustration-home-theme.svg"
        alt="Illustration graphique sur les thèmes"
        width="400"
        height="400"
        className={`${fr.cx("fr-col-4")}`}
      />
      {props.items.map((item, index) => (
        <HomeTile
          key={`${index}${JSON.stringify(item)}`}
          link={item.link}
          imageUrl={item.imageUrl}
          title={item.title}
          isSmall
        />
      ))}
    </>
  </HomeWrapper>
);

const imageStyle = css({
  display: "inline",
});
