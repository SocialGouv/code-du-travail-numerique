import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { css } from "@styled-system/css";

type Props = {
  title: string;
  description?: string;
  iconName: string;
  link: string;
};

export const ThemeTile = (props: Props) => (
  <Tile
    imageSvg={false}
    imageUrl={`/static/assets/icons/themes/${props.iconName}.svg`}
    imageAlt=""
    linkProps={{
      href: props.link,
    }}
    orientation="vertical"
    title={props.title}
    desc={props.description}
    titleAs="h3"
    noIcon
    small
    imageWidth="56"
    classes={{
      img: `${fr.cx("fr-mb-0")} ${image}`,
    }}
  />
);

const image = css({
  w: "56px!",
  h: "56px!",
});
