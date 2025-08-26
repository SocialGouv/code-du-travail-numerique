import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { toUrl } from "../utils/url";

export const Resume = ({
  year,
  fileName,
  fileSizeMb,
}: {
  year: number;
  fileName: string;
  fileSizeMb: number;
}) => (
  <Tile
    downloadButton
    enlargeLinkOrButton
    imageSvg={false}
    small
    imageUrl={`/static/assets/img/modeles-de-courriers-download.svg`}
    title={`Télécharger le bilan annuel de l’année ${year}`}
    titleAs={`h3`}
    detail={<p>Format PDF - {fileSizeMb}Mo</p>}
    imageAlt={""}
    linkProps={{
      href: toUrl(fileName),
    }}
  />
);
