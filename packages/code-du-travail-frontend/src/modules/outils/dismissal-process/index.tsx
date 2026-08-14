import React from "react";
import { RelatedItem } from "../../documents";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";
import { DismissalProcess } from "./DismissalProcess";
import { listingSegment } from "../../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";

type Props = {
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  title: string;
};

export const DismissalProcessPage = ({ title, relatedItems }: Props) => {
  return (
    <ContainerSimulatorLight
      relatedItems={relatedItems}
      title={title}
      description={""}
      breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
    >
      <h1>{title}</h1>
      <DismissalProcess />
    </ContainerSimulatorLight>
  );
};
