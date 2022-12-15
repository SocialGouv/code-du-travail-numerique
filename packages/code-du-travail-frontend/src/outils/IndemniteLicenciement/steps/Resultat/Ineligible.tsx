import React from "react";
import { HighlightResult, SectionTitle } from "../../../common/stepStyles";
import { useIndemniteLicenciementStore } from "../../store";
import { AgreementInfo } from "./components";
import { getSupportedCcIndemniteLicenciement } from "../../common";

export default function Ineligible() {
  const {
    agreementHasNoLegalIndemnity,
    route,
    agreement,
    getEligibilityError,
  } = useIndemniteLicenciementStore((state) => ({
    agreementHasNoLegalIndemnity:
      state.resultData.input.agreementHasNoLegalIndemnity,
    route: state.agreementData.input.route,
    agreement: state.agreementData.input.agreement,
    getEligibilityError: state.resultFunction.getEligibilityError,
  }));
  const supportedCc = React.useMemo(
    () =>
      getSupportedCcIndemniteLicenciement().find(
        (v) => v.fullySupported && v.idcc === agreement?.num
      ),
    [agreement]
  );
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité de licenciement</SectionTitle>
      <HighlightResult>
        Il n&apos;y a pas d&apos;indemnité de licenciement dans cette situation
      </HighlightResult>
      <p>{getEligibilityError()}</p>
      {!agreementHasNoLegalIndemnity && (
        <AgreementInfo
          hasSelectedAgreement={route !== "none"}
          isAgreementSupported={!!supportedCc}
        />
      )}
    </>
  );
}
