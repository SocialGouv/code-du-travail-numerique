import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

export type HomeTileProps = {
  title: string;
  description?: string;
  iconName: string;
  link: string;
};

export const ToolTile = (props: HomeTileProps) => {
  return (
    <Tile
      imageSvg={false}
      imageUrl={
        props.iconName
          ? `/static/assets/icons/tools/${props.iconName}.svg`
          : undefined
      }
      imageAlt=""
      linkProps={{
        href: props.link,
      }}
      orientation="vertical"
      title={props.title}
      desc={props.description}
      titleAs="h3"
      classes={{
        img: fr.cx("fr-mb-0"),
      }}
    />
  );
};
