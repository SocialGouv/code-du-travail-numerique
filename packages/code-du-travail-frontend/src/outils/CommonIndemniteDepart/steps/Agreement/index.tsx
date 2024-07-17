import { IndemniteDepartContext, useIndemniteDepartStore } from "../../store";
import React from "react";
import { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import { getCc3239Informations } from "../../../api";
import { AgreementRoute } from "../../../common/type/WizardType";
import {
  AgreementSearch,
  EnterpriseSearch,
  NoEnterprise,
} from "../../../Components/Agreements";
import { AgreementSearchValue } from "./store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Error } from "../../../common/ErrorField";
import ShowAlert from "../../../common/Agreement/RouteSelection/ShowAlert";
import { getSupportedCc } from "../../common";
import { Agreement } from "../../../types";

const AgreementStep = (): JSX.Element => {
  const supportedCc = getSupportedCc();
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
    <>
      <RadioQuestion
        questions={[
          {
            label: "Je sais quelle est ma convention collective (je la saisis)",
            value: "agreement" as AgreementRoute,
            id: "route-agreement",
          },
          {
            label:
              "Je ne sais pas quelle est ma convention collective (je la recherche)",
            value: "enterprise" as AgreementRoute,
            id: "route-enterprise",
          },
          {
            label:
              "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)",
            value: "not-selected" as AgreementRoute,
            id: "route-none",
          },
        ]}
        name="route"
        label=" Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={route}
        onChangeSelectedOption={onRouteChange}
        error={error?.route}
        showRequired
        tooltip={{
          content: (
            <p>
              Vous pouvez trouver le nom de votre convention collective sur
              votre <strong>bulletin de paie</strong>.
            </p>
          ),
        }}
        autoFocus
      />
      {route === "not-selected" && <ShowAlert route="not-selected" />}

      {route === "agreement" && (
        <>
          <AgreementSearch
            supportedAgreements={supportedCc}
            selectedAgreement={agreement}
            onSelectAgreement={onAgreementChange}
            onUserAction={(_action, value: AgreementSearchValue) =>
              onAgreementSearch(value)
            }
            alertAgreementNotSupported={undefined}
            simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
            searchResultOverride={inject650IfDetected}
          />
          {error?.agreement && <Error>{error.agreement}</Error>}
        </>
      )}
      {route === "enterprise" && (
        <>
          <EnterpriseSearch
            supportedAgreements={supportedCc}
            selectedAgreement={agreement}
            selectedEnterprise={enterprise}
            onSelectAgreement={onAgreementChange}
            onUserAction={(action, value: AgreementSearchValue) =>
              onEnterpriseSearch(value)
            }
            simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
            isDisabled={agreement?.num === 3239}
          />
          {!enterprise && (
            <NoEnterprise
              isCheckboxChecked={hasNoEnterpriseSelected}
              setIsCheckboxChecked={setHasNoEnterpriseSelected}
              onCheckboxChange={async (isCheckboxChecked) => {
                const cc3239 = await getCc3239Informations();
                onAgreementChange(isCheckboxChecked ? cc3239 : null);
              }}
            />
          )}
          {error?.enterprise && <Error>{error.enterprise}</Error>}
        </>
      )}
      {error?.errorPublicodes && <Error>{error.errorPublicodes}</Error>}
    </>
  );
};

export const inject650IfDetected = (
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
