import React, { useContext } from "react";
import { CommonAgreementStep } from "src/modules/outils/common/components/AgreementStep";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";

const StepAgreement = () => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
    onInitAgreementPage,
  } = useIndemnitePrecariteStore(store, (state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    agreement: state.agreementData.input.agreement,
    onInitAgreementPage: state.agreementFunction.onInitAgreementPage,
  }));

  return (
    <CommonAgreementStep
      agreement={agreement}
      enterprise={enterprise}
      error={error}
      onAgreementChange={onAgreementChange}
      trackingActionName={"Indemnité de précarité"}
      onInitAgreementPage={onInitAgreementPage}
      onRouteChange={onRouteChange}
      route={route}
      simulator={PublicodesSimulator.INDEMNITE_PRECARITE}
      showNotSelectedOption={true}
      notSelectedWarningDescription="Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le Code du travail. Nous vous recommandons de renseigner votre convention collective qui peut prévoir un résultat différent que celui défini par le Code du travail."
    />
  );
};

export default StepAgreement;
