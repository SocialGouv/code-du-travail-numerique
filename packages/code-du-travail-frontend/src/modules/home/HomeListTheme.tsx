import Image from "next/image";
import { HomeTile } from "./HomeTile";
import { HomeWrapper } from "./HomeWrapper";
import { fr } from "@codegouvfr/react-dsfr";
import { HomeButton } from "./HomeButton";

type Props = {
  sectionId: string;
  items: HomeThemeItem[];
  isTint?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  isSmallCard?: boolean;
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

type HomeThemeItem = {
  title: string;
  iconName: string;
  link: string;
};

export const HomeListTheme = (props: Props) => (
  <HomeWrapper
    sectionId={props.sectionId}
    isTint={props.isTint}
    title={props.title}
    subtitle={props.subtitle}
    footerNode={
      <HomeButton
        buttonLink={props.buttonLink}
        buttonText={props.buttonText}
        onButtonClick={props.onButtonClick}
      />
    }
  >
    <>
      <Image
        src="/static/assets/img/illustration-home-theme.svg"
        alt="Illustration graphique sur les thèmes"
        width="300"
        height="300"
        className={`${fr.cx("fr-col-3", "fr-hidden", "fr-unhidden-lg")}`}
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
