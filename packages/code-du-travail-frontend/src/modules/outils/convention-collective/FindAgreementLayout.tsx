"use client";
import { RelatedItem } from "../../documents";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";

type Props = {
  children: ReactNode;
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  description: string;
};

export const FindAgreementLayout = ({
  children,
  relatedItems,
  description,
}: Props) => {
  return (
    <ContainerSimulatorLight
      relatedItems={relatedItems}
      title="Trouver sa convention collective"
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <FindAgreementBlock>{children}</FindAgreementBlock>
    </ContainerSimulatorLight>
  );
};
