import { toUrl } from "../../lib";
import { Tile } from "@codegouvfr/react-dsfr/Tile";

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
    titleAs={`h4`}
    detail={`Format PDF - ${fileSizeMb}Mo`}
    imageAlt={""}
    linkProps={{
      href: toUrl(fileName),
    }}
  />
);
