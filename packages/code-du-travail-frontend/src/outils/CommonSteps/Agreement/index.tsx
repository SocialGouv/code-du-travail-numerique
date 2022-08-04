import React from "react";
import { RadioQuestion } from "../../Components";
import { Route } from "./store";
import { AgreementSearch, EnterpriseSearch } from "./components";
import { Agreement } from "../../../conventions/Search/api/type";
import {
  AgreementSupportInfo,
  OnSelectAgreementFn,
} from "../../common/Agreement/types";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { InlineError } from "../../common/ErrorField";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

type Props = {
  selectedRoute?: Route;
  onRouteChange: (Route) => void;
  supportedAgreements: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onAgreementChange: OnSelectAgreementFn;
  simulator: PublicodesSimulator;
  error?: {
    route?: string;
    agreement?: string;
    enterprise?: string;
  };
};

function AgreementStep({
  selectedRoute,
  onRouteChange,
  supportedAgreements,
  selectedEnterprise,
  selectedAgreement,
  onAgreementChange,
  error,
  simulator,
}: Props): JSX.Element {
  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Je sais quelle est ma convention collective (je la saisis)",
            value: Route.agreement,
            id: "route-agreement",
          },
          {
            label:
              "Je ne sais pas quelle est ma convention collective (je la recherche)",
            value: Route.enterprise,
            id: "route-enterprise",
          },
          {
            label:
              "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)",
            value: Route.none,
            id: "route-none",
          },
        ]}
        name="route"
        label=" Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={selectedRoute}
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
      />
      {selectedRoute === Route.agreement && (
        <>
          <AgreementSearch
            supportedAgreements={supportedAgreements}
            selectedAgreement={selectedAgreement}
            onSelectAgreement={onAgreementChange}
            onUserAction={() => {}}
            alertAgreementNotSupported={undefined}
            simulator={simulator}
          />
          {error?.agreement && <InlineError>{error.agreement}</InlineError>}
        </>
      )}
      {selectedRoute === Route.enterprise && (
        <>
          <EnterpriseSearch
            supportedAgreements={supportedAgreements}
            selectedAgreement={selectedAgreement}
            selectedEnterprise={selectedEnterprise}
            onSelectAgreement={onAgreementChange}
            onUserAction={() => {}}
          />
          {error?.enterprise && <InlineError>{error.enterprise}</InlineError>}
        </>
      )}
    </>
  );
}

export default AgreementStep;
