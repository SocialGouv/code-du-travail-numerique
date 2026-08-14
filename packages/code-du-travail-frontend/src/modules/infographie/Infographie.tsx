import { Infographic } from "./type";
import { ContainerSimulatorLight } from "../layout/ContainerSimulatorLight";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadInfographicTile, InfographicElement } from "./component";
import DisplayContent from "../common/DisplayContent";
import { References } from "../common";
import { ContentMeta } from "../common/ContentMeta";
import { listingSegment } from "../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { ArticleJsonLd } from "../seo/jsonld";
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
      // Remonte vers la page qui regroupe les infographies : la chaîne de
      // thèmes est portée par les tags de ContentMeta, sous le titre.
      breadcrumbSegments={[listingSegment(SOURCES.INFOGRAPHICS)]}
    >
      <h1 className={fr.cx("fr-mb-0")}>{infographic.title}</h1>
      <ContentMeta breadcrumbs={infographic.breadcrumbs} />
      <ArticleJsonLd
        title={infographic.title}
        datePublished={infographic.date}
        breadcrumbs={infographic.breadcrumbs}
      />
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
