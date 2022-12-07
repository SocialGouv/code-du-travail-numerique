import React from "react";
import { HighlightResult, SectionTitle } from "../../../../common/stepStyles";
import { useIndemniteLicenciementStore } from "../../../store";

export default function Inelligible() {
  const { errorLegalContract, errorLegalSeniority } =
    useIndemniteLicenciementStore((state) => ({
      errorLegalContract: state.contratTravailData.error.errorLegal,
      errorLegalSeniority: state.ancienneteData.error.errorLegal,
    }));
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité de licenciement</SectionTitle>
      <HighlightResult>
        Il n&apos;y a pas d&apos;indemnité de licenciement dans cette situation
      </HighlightResult>
      <p>{errorLegalContract || errorLegalSeniority}</p>
    </>
  );
}
