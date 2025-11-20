import React from "react";
import { AccordionWithAnchor } from "src/modules/common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadInfographicTile } from "./DownloadInfographicTile";
import DisplayContent, { numberLevel } from "../../common/DisplayContent";
import { toUrl } from "src/modules/utils";
import { css } from "@styled-system/css";

export type Props = {
  titleLevel: numberLevel;
  svgFilename: string;
  title: string;
  pdfFilename: string;
  pdfSizeOctet: string;
  descriptionHtml: string;
};

export const InfographicElement = ({
  svgFilename,
  titleLevel,
  pdfSizeOctet,
  pdfFilename,
  title,
  descriptionHtml,
}: Props) => {
  return (
    <div className={fr.cx("fr-mb-8w")}>
      <img
        src={toUrl(svgFilename)}
        alt={`infographie ${title}. Description détaillée ci-après.`}
        className={`${fr.cx("fr-mb-3w")} ${infographieImage}`}
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
        pdfFilename={pdfFilename}
        pdfSizeOctet={pdfSizeOctet}
        titleAs={`h${titleLevel}`}
      />
    </div>
  );
};

const infographieImage = css({
  display: "block",
  marginInline: "auto",
});
