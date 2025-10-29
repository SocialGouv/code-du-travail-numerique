import { Infographic } from "./type";
import { ContainerSimulatorLight } from "../layout/ContainerSimulatorLight";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadInfographicTile, InfographicElement } from "./component";
import DisplayContent, { numberLevel } from "../common/DisplayContent";

type Params = {
  infographic: Infographic;
};
export const Infographie = ({ infographic }: Params) => {
  return (
    <ContainerSimulatorLight
      relatedItems={[]}
      title={infographic.title}
      description={infographic.description}
      segments={infographic.breadcrumbs.map(({ label, slug }) => ({
        label: <>{label}</>,
        linkProps: { href: slug },
      }))}
    >
      <h1 id="simulateur-embauche" className={fr.cx("fr-mb-3w")}>{infographic.title}</h1>
      {infographic.description.length > 0 && (
        <DisplayContent titleLevel={2} content={infographic.description} />
      )}

      <div className={fr.cx("fr-mb-5w")}>
        <DownloadInfographicTile
          pdfFilename={infographic.svgUrl}
          pdfSizeOctet={infographic.pdf.sizeOctet}
          titleAs="h2"
        />
      </div>

      <InfographicElement
        titleLevel={2}
        imgUrl={infographic.svgUrl}
        title={infographic.title}
        pdfUrl={infographic.pdf.url}
        pdfSize={infographic.pdf.sizeOctet}
        descriptionHtml={infographic.transcription}
      />
    </ContainerSimulatorLight>
  );
};
