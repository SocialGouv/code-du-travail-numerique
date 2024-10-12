import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

export type HomeTileProps = {
  title: string;
  description?: string;
  iconName: string;
  iconFolder: "themes" | "tools";
  link: string;
  isSmall?: boolean;
};

export const HomeTile = (props: HomeTileProps) => (
  <div
    className={fr.cx(
      "fr-col-12",
      props.isSmall ? "fr-col-sm-6" : "fr-col-sm-6",
      props.isSmall ? "fr-col-md-4" : "fr-col-md-6",
      props.isSmall ? "fr-col-lg-2" : "fr-col-lg-3"
    )}
  >
    <Tile
      enlargeLinkOrButton
      imageSvg={false}
      imageUrl={`/static/assets/icons/${props.iconFolder}/${props.iconName}.svg`}
      linkProps={{
        href: props.link,
      }}
      orientation="vertical"
      title={props.title}
      desc={props.description}
      titleAs="h3"
    />
  </div>
);
