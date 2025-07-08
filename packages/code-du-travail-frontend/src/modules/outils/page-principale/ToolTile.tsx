import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

export type HomeTileProps = {
  title: string;
  description?: string;
  iconName: string;
  link: string;
  isExternal: boolean;
  level: "h2" | "h3" | "h4" | "h5" | "h6";
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
        title: props.isExternal
          ? `${props.title} - nouvelle fenêtre`
          : undefined,
        target: props.isExternal ? "_blank" : undefined,
      }}
      imageHeight={80}
      imageWidth={80}
      orientation="vertical"
      title={props.title}
      desc={<p>{props.description}</p>}
      titleAs={props.level}
      classes={{
        img: fr.cx("fr-mb-0"),
      }}
    />
  );
};
