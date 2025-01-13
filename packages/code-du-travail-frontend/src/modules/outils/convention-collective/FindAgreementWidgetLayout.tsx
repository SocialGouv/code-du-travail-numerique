"use client";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";
import { ContainerWidget } from "src/modules/layout/ContainerWidget";

type Props = {
  children: ReactNode;
};

export const FindAgreementWidgetLayout = ({ children }: Props) => {
  return (
    <>
      <ContainerWidget>
        <FindAgreementBlock noBackground>{children}</FindAgreementBlock>
      </ContainerWidget>
    </>
  );
};
