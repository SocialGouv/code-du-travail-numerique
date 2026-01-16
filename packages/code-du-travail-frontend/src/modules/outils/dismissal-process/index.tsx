import React from "react";
import { RelatedItem } from "../../documents";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";
import { DismissalProcess } from "./DismissalProcess";
import { HowToJsonLd } from "../../seo/jsonld";

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
      <HowToJsonLd
        name={title}
        url="/outils/procedure-licenciement"
        steps={[
          "Décrire votre situation",
          "Répondre aux questions",
          "Consulter les étapes de la procédure",
        ]}
      />
      <h1>{title}</h1>
      <DismissalProcess />
    </ContainerSimulatorLight>
  );
};
