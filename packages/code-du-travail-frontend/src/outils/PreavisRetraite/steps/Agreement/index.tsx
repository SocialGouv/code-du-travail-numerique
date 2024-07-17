import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import CommonAgreementStep from "../../../CommonSteps/Agreement";
import { getSupportedCc } from "../../common";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { useContext } from "react";
import { Agreement } from "../../../types";
import { inject650IfDetected } from "../../../CommonIndemniteDepart/steps/Agreement";
import { usePreavisRetraiteStore } from "../store";

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
  } = usePreavisRetraiteStore(store, (state) => ({
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

  return (
    <CommonAgreementStep
      error={error}
      onRouteChange={onRouteChange}
      selectedRoute={route}
      onAgreementChange={onAgreementChange}
      onInitAgreementPage={onInitAgreementPage}
      selectedEnterprise={enterprise}
      selectedAgreement={agreement}
      supportedAgreements={getSupportedCc()}
      simulator={PublicodesSimulator.PREAVIS_RETRAITE}
      onAgreementSearch={onAgreementSearch}
      onEnterpriseSearch={onEnterpriseSearch}
      hasNoEnterpriseSelected={hasNoEnterpriseSelected}
      setHasNoEnterpriseSelected={setHasNoEnterpriseSelected}
      searchAgreementResultOverride={inject650IfDetected}
    />
  );
};

export default AgreementStep;
