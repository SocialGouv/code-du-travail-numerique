import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { toUrl } from "../../../lib";

export const DownloadTile = ({
  filename,
  filesize,
  titleAs = "h2",
}: {
  filename: string;
  filesize: string;
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <Tile
      downloadButton
      enlargeLinkOrButton
      imageSvg={false}
      imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
      title={`Télécharger l'infographie`}
      titleAs={titleAs}
      detail={`Format PDF - ${filesize}`}
      imageAlt={""}
      linkProps={{
        href: toUrl(filename),
      }}
    />
  );
};
