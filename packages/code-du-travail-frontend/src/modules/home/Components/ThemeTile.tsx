import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

type Props = {
  title: string;
  description?: string;
  iconName: string;
  link: string;
  noIcon?: boolean;
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
    noIcon={props.noIcon}
    classes={{
      img: fr.cx("fr-mb-0"),
      title: fr.cx("fr-text--md"),
    }}
  />
);
