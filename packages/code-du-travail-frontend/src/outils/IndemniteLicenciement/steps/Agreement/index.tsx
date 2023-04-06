import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import CommonAgreementStep from "../../../CommonSteps/Agreement";
import { getSupportedCcIndemniteLicenciement } from "../../common";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { useContext } from "react";

const AgreementStep = (): JSX.Element => {
  const store = useContext(IndemniteLicenciementContext);
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
  } = useIndemniteLicenciementStore(store, (state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    onEnterpriseSearch: state.agreementFunction.onEnterpriseSearch,
    agreement: state.agreementData.input.agreement,
    onAgreementSearch: state.agreementFunction.onAgreementSearch,
    onInitAgreementPage: state.agreementFunction.onInitAgreementPage,
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
      supportedAgreements={getSupportedCcIndemniteLicenciement()}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
      onAgreementSearch={onAgreementSearch}
      onEnterpriseSearch={onEnterpriseSearch}
    />
  );
};

export default AgreementStep;
