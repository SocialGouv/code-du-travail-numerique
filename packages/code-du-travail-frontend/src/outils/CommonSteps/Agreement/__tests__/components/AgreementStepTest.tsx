import AgreementStep from "../..";
import React from "react";
import {
  AgreementTestProvider,
  createAgreementTestStore,
  useAgreementTestStore,
} from "./storeTest";
import { getSupportedCcIndemniteLicenciement } from "../../../../IndemniteLicenciement/common";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import modeles from "./modeles.json";

const AgreementStepComponentTest = () => {
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
    onInitAgreementPage,
  } = useAgreementTestStore((state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    agreement: state.agreementData.input.agreement,
    onInitAgreementPage: state.agreementFunction.onInitAgreementPage,
  }));

  return (
    <AgreementStep
      error={error}
      onRouteChange={onRouteChange}
      selectedRoute={route}
      onAgreementChange={onAgreementChange}
      onInitAgreementPage={onInitAgreementPage}
      selectedEnterprise={enterprise}
      selectedAgreement={agreement}
      supportedAgreements={getSupportedCcIndemniteLicenciement()}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
    />
  );
};

export const AgreementStepTest = () => {
  return (
    <AgreementTestProvider
      createStore={() => createAgreementTestStore(modeles)}
    >
      <AgreementStepComponentTest />
    </AgreementTestProvider>
  );
};
