import { useIndemniteLicenciementStore } from "../../store";
import CommonAgreementStep from "../../../CommonSteps/Agreement";
import { AgreementSupportInfo } from "../../../common/Agreement/types";
import { getSupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";

export const getSupportedCC = (): AgreementSupportInfo[] =>
  getSupportedCcIndemniteLicenciement().map((item) => ({
    fullySupported: true,
    idcc: parseInt(item.value.replace("IDCC", "")),
  }));

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
      supportedAgreements={getSupportedCC()}
    />
  );
};

export default AgreementStep;
