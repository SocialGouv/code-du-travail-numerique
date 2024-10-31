import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { toUrl } from "../../../lib";

export const DownloadTile = ({
  filename,
  filesize,
  extension,
  title,
}: {
  filename: string;
  filesize: number;
  extension: string;
  title: string;
}) => {
  return (
    <Tile
      downloadButton
      enlargeLinkOrButton
      imageSvg={false}
      imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
      title={`Télécharger le ${title}`}
      titleAs="h2"
      detail={`Format ${extension} - ${filesize}Ko`}
      linkProps={{
        href: toUrl(filename),
      }}
    />
  );
};
