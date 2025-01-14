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
    onEnterpriseSearch,
    agreement,
    onAgreementSearch,
    onInitAgreementPage,
    hasNoEnterpriseSelected,
    setHasNoEnterpriseSelected,
  } = useIndemniteDepartStore(store, (state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    onEnterpriseSearch: state.agreementFunction.onEnterpriseSearch,
    agreement: state.agreementData.input.agreement,
    onAgreementSearch: state.agreementFunction.onAgreementSearch,
    onInitAgreementPage: state.agreementFunction.onInitAgreementPage,
    hasNoEnterpriseSelected: state.agreementData.input.hasNoEnterpriseSelected,
    setHasNoEnterpriseSelected:
      state.agreementFunction.setHasNoEnterpriseSelected,
  }));

  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  return (
    // <CommonAgreementStep
    //   agreement={agreement}
    //   enterprise={enterprise}
    //   error={error}
    //   hasNoEnterpriseSelected={hasNoEnterpriseSelected}
    //   onAgreementChange={onAgreementChange}
    //   onAgreementSearch={onAgreementSearch}
    //   onEnterpriseSearch={onEnterpriseSearch}
    //   onInitAgreementPage={onInitAgreementPage}
    //   onRouteChange={onRouteChange}
    //   route={route}
    //   setHasNoEnterpriseSelected={setHasNoEnterpriseSelected}
    // />
    <></>
  );
};

export default AgreementStep;
