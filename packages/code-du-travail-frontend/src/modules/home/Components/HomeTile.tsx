import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

export type HomeTileProps = {
  title: string;
  description?: string;
  iconName: string;
  iconFolder: "themes" | "tools";
  link: string;
  noIcon?: boolean;
};

export const HomeTile = (props: HomeTileProps) => (
  <Tile
    imageSvg={false}
    imageUrl={`/static/assets/icons/${props.iconFolder}/${props.iconName}.svg`}
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
    }}
  />
);
