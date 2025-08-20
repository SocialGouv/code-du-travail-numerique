import React, { useContext } from "react";
import { PreavisDemissionContext, usePreavisDemissionStore } from "../store";
import { CommonAgreementStep } from "src/modules/outils/common/components/AgreementStep";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

const StepAgreement = (): JSX.Element => {
  const store = useContext(PreavisDemissionContext);
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
    onInitAgreementPage,
  } = usePreavisDemissionStore(store, (state) => ({
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
      trackingActionName={"Préavis de démission"}
      onInitAgreementPage={onInitAgreementPage}
      onRouteChange={onRouteChange}
      route={route}
      simulator={PublicodesSimulator.PREAVIS_DEMISSION}
      showNotSelectedOption={false}
    />
  );
};

export default StepAgreement;
