import React from "react";
import { AccordionWithAnchor } from "src/modules/common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadInfographicTile } from "./DownloadInfographicTile";
import DisplayContent, { numberLevel } from "../../common/DisplayContent";
import { toUrl } from "src/modules/utils";

export type Props = {
  titleLevel: numberLevel;
  imgUrl: string;
  title: string;
  pdfUrl: string;
  pdfSize: string;
  descriptionHtml: string;
};

export const InfographicElement = ({
  imgUrl,
  titleLevel,
  pdfSize,
  pdfUrl,
  title,
  descriptionHtml,
}: Props) => {
  return (
    <div className={fr.cx("fr-mb-8w")}>
      <img
        src={toUrl(imgUrl)}
        alt={`infographie ${title}. Description détaillée ci-après.`}
        className={fr.cx("fr-mb-3w")}
      />
      <AccordionWithAnchor
        className={fr.cx("fr-mb-5w")}
        titleAs={`h${titleLevel}`}
        items={[
          {
            id: `infographic-description-${Math.random().toString(36).substring(2, 15)}`,
            title: "Lire la description",
            content: (
              <DisplayContent
                titleLevel={
                  (titleLevel >= 6 ? 6 : titleLevel + 1) as numberLevel
                }
                content={descriptionHtml}
              />
            ),
          },
        ]}
      />
      <DownloadInfographicTile
        pdfFilename={pdfUrl}
        pdfSizeOctet={pdfSize}
        titleAs={`h${titleLevel}`}
      />
    </div>
  );
};
