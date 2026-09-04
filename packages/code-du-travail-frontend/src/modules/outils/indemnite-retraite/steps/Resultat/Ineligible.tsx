import React, { useContext } from "react";
import Html from "../../../../common/Html";
import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "src/modules/outils/indemnite-depart/store";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";
import { getRetraiteOriginLabel } from "src/modules/outils/indemnite-depart/utils/question";

export default function Ineligible() {
  const store = useContext(IndemniteDepartContext);
  const { getEligibilityError, infoWarning, originRetraite } =
    useIndemniteDepartStore(store, (state) => ({
      getEligibilityError: state.resultFunction.getEligibilityError,
      infoWarning: state.resultData.input.infoWarning,
      originRetraite: state.informationsData.input.originRetraite,
    }));

  return (
    <>
      <h2>Indemnité de {getRetraiteOriginLabel(originRetraite)}</h2>
      {/* Le message du moteur commence lui-même par « Aucune indemnité n'est
          due… » : la phrase d'introduction est tournée autrement pour ne pas
          servir deux fois la même à l'usager, comme sur le licenciement. */}
      <p>
        Il n&apos;y a pas d&apos;indemnité de{" "}
        {getRetraiteOriginLabel(originRetraite)} dans cette situation
      </p>
      <Html>{getEligibilityError() ?? ""}</Html>
      {infoWarning && (
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
