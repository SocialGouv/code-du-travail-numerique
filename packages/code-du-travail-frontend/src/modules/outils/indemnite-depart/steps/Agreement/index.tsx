import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import React from "react";
import { useContext } from "react";
import { CommonAgreementStep } from "./components/AgreementStep";

const AgreementStep = (): JSX.Element => {
  const store = useContext(IndemniteDepartContext);
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
    onInitAgreementPage,
    indemniteDepartType,
  } = useIndemniteDepartStore(store, (state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    agreement: state.agreementData.input.agreement,
    onInitAgreementPage: state.agreementFunction.onInitAgreementPage,
    indemniteDepartType: state.agreementData.input.indemniteDepartType,
  }));

  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  return (
    <CommonAgreementStep
      agreement={agreement}
      enterprise={enterprise}
      error={error}
      onAgreementChange={onAgreementChange}
      indemniteDepartType={indemniteDepartType}
      onInitAgreementPage={onInitAgreementPage}
      onRouteChange={onRouteChange}
      route={route}
    />
  );
};

export default AgreementStep;
