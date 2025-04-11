import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

export type HomeTileProps = {
  title?: string;
  description?: string;
  iconName?: string;
  link?: string;
  noIcon?: boolean;
};

export const ToolTile = (props: HomeTileProps) => {
  // Si le titre est undefined, on ne rend rien
  if (!props.title) {
    return null;
  }

  if (!props.link) {
    return (
      <Tile
        imageSvg={false}
        imageUrl={
          props.iconName
            ? `/static/assets/icons/tools/${props.iconName}.svg`
            : undefined
        }
        imageAlt=""
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
  }

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
      noIcon={props.noIcon}
      classes={{
        img: fr.cx("fr-mb-0"),
      }}
    />
  );
};
