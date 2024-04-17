import React, { useContext } from "react";
import { HighlightResult, SectionTitle } from "../../../common/stepStyles";
import Disclaimer from "../../../common/Disclaimer";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../../CommonIndemniteDepart/store";
import Html from "../../../../common/Html";

export default function Ineligible() {
  const store = useContext(IndemniteDepartContext);
  const { agreementHasNoLegalIndemnity, getEligibilityError, infoWarning } =
    useIndemniteDepartStore(store, (state) => ({
      agreementHasNoLegalIndemnity:
        state.resultData.input.agreementHasNoLegalIndemnity,
      getEligibilityError: state.resultFunction.getEligibilityError,
      infoWarning: state.resultData.input.infoWarning,
    }));
  return (
    <>
      <SectionTitle hasSmallMarginTop>Indemnité de licenciement</SectionTitle>
      <p>
        <HighlightResult>
          Il n&apos;y a pas d&apos;indemnité de licenciement dans cette
          situation
        </HighlightResult>
      </p>
      <Html>{getEligibilityError()}</Html>
      {!agreementHasNoLegalIndemnity && infoWarning && (
        <Disclaimer
          title={infoWarning.title}
          dataTestId="ineligible-cc-disclaimer"
        >
          <p>{infoWarning.message}</p>
        </Disclaimer>
      )}
    </>
  );
}
