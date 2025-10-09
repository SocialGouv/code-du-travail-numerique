import React, { useContext, useEffect } from "react";
import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  eligibleComponent?: React.ReactNode;
  ineligibleComponent?: React.ReactNode;
};

const StepResult = ({ eligibleComponent, ineligibleComponent }: Props) => {
  const store = useContext(IndemniteDepartContext);
  const { isEligible, init, errorPublicodes, getPublicodesResult } =
    useIndemniteDepartStore(store, (state) => ({
      isEligible: state.resultData.input.isEligible,
      init: state.resultFunction.init,
      errorPublicodes: state.resultData.error.errorPublicodes,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  useEffect(() => {
    const { isEligible } = init();
    if (isEligible) {
      getPublicodesResult();
    }
  }, []);

  if (errorPublicodes) {
    return (
      <AccessibleAlert
        title="Attention"
        description="Une erreur est survenue lors du calcul. Veuillez vérifier les informations saisies ou rafraîchir la page si le problème persiste."
        severity="error"
        className={["fr-mb-2w"]}
      />
    );
  }

  return <>{isEligible ? eligibleComponent : ineligibleComponent}</>;
};

export default StepResult;
