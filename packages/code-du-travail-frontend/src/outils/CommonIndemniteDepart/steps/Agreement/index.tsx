import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import CommonAgreementStep from "../../../CommonSteps/Agreement";
import { getSupportedCc } from "../../common";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { useContext } from "react";
import { Agreement } from "../../../types";

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
      simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
      onAgreementSearch={onAgreementSearch}
      onEnterpriseSearch={onEnterpriseSearch}
      hasNoEnterpriseSelected={hasNoEnterpriseSelected}
      setHasNoEnterpriseSelected={setHasNoEnterpriseSelected}
      searchAgreementResultOverride={inject650IfDetected}
    />
  );
};

const inject650IfDetected = (
  query: string,
  results: Agreement[]
): Agreement[] => {
  const lowerQuery = query.toLowerCase();
  const words = [
    "métallurgie",
    "ingénieurs",
    "cadres",
    "metallurgie",
    "ingénieur",
    "cadre",
    "650",
  ];
  const detectInQuery = (word) => {
    return lowerQuery.toLowerCase().includes(word);
  };
  const atLeastOneWordDetected = words.some(detectInQuery);
  if (atLeastOneWordDetected) {
    return results.concat([
      {
        url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635842",
        id: "KALICONT000005635842",
        num: 650,
        shortTitle: "Métallurgie : ingénieurs et cadres",
        slug: "650-metallurgie-ingenieurs-et-cadres",
        title: "Métallurgie : ingénieurs et cadres",
        contributions: false,
      },
    ]);
  }
  return results;
};
export default AgreementStep;
