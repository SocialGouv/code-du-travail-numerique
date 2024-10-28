import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { css } from "../../../styled-system/css";

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
    linkProps={{
      href: props.link,
    }}
    orientation="vertical"
    title={props.title}
    desc={props.description}
    titleAs="h3"
    noIcon
    small
    classes={{
      img: `${fr.cx("fr-mb-0")}`,
      link: link,
    }}
  />
);

const link = css({
  color: "var(--text-default-grey)!",
});
