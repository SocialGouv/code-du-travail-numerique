"use client";
import { ReactNode } from "react";
import { FindAgreementBlock } from "./FindAgreementBlock";
import { useIframeResizer } from "../../../../src/common/hooks";

type Props = {
  children: ReactNode;
};

export const FindAgreementWidgetLayout = ({ children }: Props) => {
  useIframeResizer();
  return <FindAgreementBlock noBackground>{children}</FindAgreementBlock>;
};
