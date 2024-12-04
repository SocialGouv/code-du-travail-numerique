"use client";
import { ContainerSimulator } from "../../layout/ContainerSimulator";
import { RelatedItem } from "../../documents";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";

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
    <ContainerSimulator
      relatedItems={relatedItems}
      title="Trouver sa convention collective"
      description={description}
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <FindAgreementBlock>{children}</FindAgreementBlock>
    </ContainerSimulator>
  );
};
