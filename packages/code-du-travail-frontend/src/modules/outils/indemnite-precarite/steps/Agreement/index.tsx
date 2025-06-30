import React, { useContext } from "react";
import { CommonAgreementStep } from "src/modules/outils/indemnite-depart/steps/Agreement/components/AgreementStep";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";

const StepAgreement = (): JSX.Element => {
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
    />
  );
};

export default StepAgreement;
