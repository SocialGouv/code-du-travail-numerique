import React, { useContext } from "react";
import {
  HeuresRechercheEmploiContext,
  useHeuresRechercheEmploiStore,
} from "../store";
import { HeuresRechercheEmploiAgreementStep } from "./components/HeuresRechercheEmploiAgreementStep";

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
    <HeuresRechercheEmploiAgreementStep
      agreement={agreement}
      enterprise={enterprise}
      error={error}
      onAgreementChange={onAgreementChange}
      trackingActionName={"Heures recherche emploi"}
      onInitAgreementPage={onInitAgreementPage}
      onRouteChange={onRouteChange}
      route={route}
    />
  );
};

export default StepAgreement;
