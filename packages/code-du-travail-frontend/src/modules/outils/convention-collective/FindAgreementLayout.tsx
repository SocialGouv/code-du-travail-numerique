"use client";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";
import { ContainerSimulatorLight } from "../../layout/ContainerSimulatorLight";

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
      segments={[{ label: "Simulateurs", linkProps: { href: "/outils" } }]}
    >
      <FindAgreementBlock>{children}</FindAgreementBlock>
    </ContainerSimulatorLight>
  );
};
