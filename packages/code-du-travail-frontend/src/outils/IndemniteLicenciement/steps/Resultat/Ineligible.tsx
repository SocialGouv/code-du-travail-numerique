import React from "react";
import { HighlightResult, SectionTitle } from "../../../common/stepStyles";
import Disclaimer from "../../../common/Disclaimer";
import { useIndemniteLicenciementStore } from "../../store";

export default function Ineligible() {
  const {
    agreementHasNoLegalIndemnity,
    getEligibilityError,
    infoWarning,
  } = useIndemniteLicenciementStore((state) => ({
    agreementHasNoLegalIndemnity:
      state.resultData.input.agreementHasNoLegalIndemnity,
    getEligibilityError: state.resultFunction.getEligibilityError,
    infoWarning: state.resultData.input.infoWarning,
  }));
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité de licenciement</SectionTitle>
      <HighlightResult>
        Il n&apos;y a pas d&apos;indemnité de licenciement dans cette situation
      </HighlightResult>
      <p>{getEligibilityError()}</p>
      {!agreementHasNoLegalIndemnity && infoWarning && (
        <Disclaimer title={infoWarning.title}>
          <p>{infoWarning.message}</p>
        </Disclaimer>
      )}
    </>
  );
}
