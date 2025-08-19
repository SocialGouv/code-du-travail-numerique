import React, { useContext } from "react";
import {
  HeuresRechercheEmploiContext,
  useHeuresRechercheEmploiStore,
} from "../store";
import { CommonAgreementStep } from "src/modules/outils/common/components/AgreementStep";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

const StepAgreement = (): JSX.Element => {
  const store = useContext(HeuresRechercheEmploiContext);
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
    onInitAgreementPage,
  } = useHeuresRechercheEmploiStore(store, (state) => ({
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
      trackingActionName={"Heures recherche emploi"}
      onInitAgreementPage={onInitAgreementPage}
      onRouteChange={onRouteChange}
      route={route}
      simulator={PublicodesSimulator.HEURES_RECHERCHE_EMPLOI}
      showNotSelectedOption={false}
    />
  );
};

export default StepAgreement;
