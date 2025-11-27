import { Infographic } from "./type";
import { ContainerSimulatorLight } from "../layout/ContainerSimulatorLight";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadInfographicTile, InfographicElement } from "./component";
import DisplayContent from "../common/DisplayContent";
import { References } from "../common";
import { css } from "@styled-system/css";

type Params = {
  infographic: Infographic;
};
export const Infographie = ({ infographic }: Params) => {
  return (
    <ContainerSimulatorLight
      relatedItems={infographic.relatedItems}
      title={infographic.title}
      description={infographic.description}
      segments={infographic.breadcrumbs.map(({ label, slug }) => ({
        label: <>{label}</>,
        linkProps: { href: slug },
      }))}
    >
      <h1 className={fr.cx("fr-mb-3w")}>{infographic.title}</h1>
      {infographic.description.length > 0 && (
        <div className={`${fr.cx("fr-text--lg")} ${description}`}>
          <DisplayContent titleLevel={2} content={infographic.description} />
        </div>
      )}

      <div className={fr.cx("fr-mb-5w")}>
        <DownloadInfographicTile
          pdfFilename={infographic.pdf.filename}
          pdfSizeOctet={infographic.pdf.sizeOctet}
          titleAs="h2"
        />
      </div>

      <InfographicElement
        titleLevel={2}
        svgFilename={infographic.svgFilename}
        title={infographic.title}
        pdfFilename={infographic.pdf.filename}
        pdfSizeOctet={infographic.pdf.sizeOctet}
        descriptionHtml={infographic.transcription}
      />

      {infographic.references && infographic.references.length > 0 && (
        <References
          label="Références juridiques"
          links={infographic.references}
        />
      )}
    </ContainerSimulatorLight>
  );
};

const description = css({
  "&.fr-text--lg p, &.fr-text--lg li, &.fr-text--lg a": {
    fontSize: "inherit!",
    lineHeight: "inherit!",
  },
});
