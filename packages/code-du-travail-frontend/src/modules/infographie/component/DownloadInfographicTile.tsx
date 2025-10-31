import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { formatFileSize, toUrl } from "../../utils";

export const DownloadInfographicTile = ({
  pdfFilename,
  pdfSizeOctet,
  titleAs = "h2",
}: {
  pdfFilename: string;
  pdfSizeOctet: string;
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
      detail={<p>Format PDF - {formatFileSize(pdfSizeOctet)}</p>}
      imageAlt={""}
      linkProps={{
        href: toUrl(pdfFilename),
      }}
    />
  );
};
