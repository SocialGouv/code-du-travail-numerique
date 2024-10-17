import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { toUrl } from "../../../lib";

export const DownloadTile = ({
  filename,
  filesize,
  title,
}: {
  filename: string;
  filesize: number;
  title: string;
}) => {
  const filesizeFormated = Math.round((filesize / 1000) * 100) / 100;
  const [, extension] = filename.split(/\.([a-z]{2,4})$/);

  return (
    <Tile
      downloadButton
      enlargeLinkOrButton
      imageSvg={false}
      imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
      title={`Télécharger le ${title}`}
      titleAs="h2"
      detail={`Format ${extension} - ${filesizeFormated}Ko`}
      linkProps={{
        href: toUrl(filename),
      }}
    />
  );
};
