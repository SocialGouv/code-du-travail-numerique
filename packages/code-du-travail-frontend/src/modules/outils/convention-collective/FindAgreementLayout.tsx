"use client";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";
import { listingSegment } from "../../layout/breadcrumb";
import { SOURCES } from "@socialgouv/cdtn-utils";

type Props = {
  children: ReactNode;
  description: string;
};

export const FindAgreementLayout = ({ children, description }: Props) => {
  return (
    <ContainerSimulatorLight
      relatedItems={[]}
      title="Trouver sa convention collective et ses accords d'entreprise"
      description={description}
      breadcrumbSegments={[listingSegment(SOURCES.TOOLS)]}
    >
      <FindAgreementBlock>{children}</FindAgreementBlock>
    </ContainerSimulatorLight>
  );
};
