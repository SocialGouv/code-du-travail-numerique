import { useIndemniteLicenciementStore } from "../../store";
import CommonAgreementStep from "../../../CommonSteps/Agreement";
import { getSupportedCcIndemniteLicenciement } from "../../common";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

const AgreementStep = (): JSX.Element => {
  const {
    error,
    onRouteChange,
    route,
    onAgreementChange,
    enterprise,
    agreement,
  } = useIndemniteLicenciementStore((state) => ({
    error: state.agreementData.error,
    onRouteChange: state.agreementFunction.onRouteChange,
    route: state.agreementData.input.route,
    onAgreementChange: state.agreementFunction.onAgreementChange,
    enterprise: state.agreementData.input.enterprise,
    agreement: state.agreementData.input.agreement,
  }));

  return (
    <CommonAgreementStep
      error={error}
      onRouteChange={onRouteChange}
      selectedRoute={route}
      onAgreementChange={onAgreementChange}
      selectedEnterprise={enterprise}
      selectedAgreement={agreement}
      supportedAgreements={getSupportedCcIndemniteLicenciement()}
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
    />
  );
};

export default AgreementStep;
