import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { toUrl } from "../../../lib";

export const DownloadTile = ({
  filename,
  filesize,
  extension,
  title,
  titleAs = "h2",
}: {
  filename: string;
  filesize: number;
  extension: string;
  title: string;
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
}) => {
  return (
    <Tile
      downloadButton
      enlargeLinkOrButton
      imageSvg={false}
      imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
      title={`Télécharger le ${title}`}
      titleAs={titleAs}
      detail={`Format ${extension} - ${filesize}Ko`}
      imageAlt={""}
      linkProps={{
        href: toUrl(filename),
      }}
    />
  );
};
