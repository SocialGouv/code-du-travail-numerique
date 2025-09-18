import React, { useContext } from "react";
import Html from "../../../../common/Html";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

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
      <h2>Indemnité de licenciement</h2>
      <p>
        Il n&apos;y a pas d&apos;indemnité de licenciement dans cette situation
      </p>
      <Html>{getEligibilityError() ?? ""}</Html>
      {!agreementHasNoLegalIndemnity && infoWarning && (
        <AccessibleAlert
          title={infoWarning.title}
          description={infoWarning.message}
          data-testid="ineligible-cc-disclaimer"
          severity="warning"
        />
      )}
    </>
  );
}
