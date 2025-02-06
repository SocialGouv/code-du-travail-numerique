import React, { useContext } from "react";
import Html from "../../../../common/Html";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/common/indemnite-depart/store";
import Alert from "@codegouvfr/react-dsfr/Alert";

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
      <h2>Indemnité de rupture conventionnelle</h2>
      <p>
        <p>
          Il n&apos;y a pas d&apos;indemnité de rupture conventionnelle dans
          cette situation
        </p>
      </p>
      <Html>{getEligibilityError() ?? ""}</Html>
      {!agreementHasNoLegalIndemnity && infoWarning && (
        <Alert
          title={infoWarning.title}
          description={infoWarning.message}
          data-testid="ineligible-cc-disclaimer"
          severity="warning"
        />
      )}
    </>
  );
}
