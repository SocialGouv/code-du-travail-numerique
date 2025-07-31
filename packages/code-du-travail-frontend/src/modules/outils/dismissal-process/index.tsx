import React from "react";
import { RelatedItem } from "../../documents";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";
import { DismissalProcess } from "./DismissalProcess";

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
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <h1>{title}</h1>
      <DismissalProcess />
    </ContainerSimulatorLight>
  );
};
