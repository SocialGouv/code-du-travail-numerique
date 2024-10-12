import Image from "next/image";
import { HomeTile } from "./HomeTile";
import { HomeWrapper, HomeWrapperWithButtonProps } from "./HomeWrapper";
import { fr } from "@codegouvfr/react-dsfr";

type Props = HomeWrapperWithButtonProps & {
  items: HomeThemeItem[];
};

type HomeThemeItem = {
  title: string;
  iconName: string;
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
        width="350"
        height="350"
        className={`${fr.cx("fr-col-4", "fr-hidden", "fr-unhidden-lg")}`}
      />
      {props.items.map((item, index) => (
        <HomeTile
          key={`${index}${JSON.stringify(item)}`}
          link={item.link}
          iconName={item.iconName}
          iconFolder="themes"
          title={item.title}
          isSmall
        />
      ))}
    </>
  </HomeWrapper>
);
