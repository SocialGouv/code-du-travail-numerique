import React from "react";
import { RadioQuestion } from "../../Components";
import { AgreementSearch, EnterpriseSearch, NoEnterprise } from "./components";
import {
  AgreementSupportInfo,
  OnSelectAgreementFn,
} from "../../common/Agreement/types";
import { Enterprise } from "../../../conventions/Search/api/enterprises.service";
import { Error } from "../../common/ErrorField";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import ShowAlert from "../../common/Agreement/RouteSelection/ShowAlert";
import { AgreementSearchValue, CommonAgreementStoreError } from "./store";
import { AgreementRoute } from "../../common/type/WizardType";
import { getCc3239Informations } from "../../api";
import { Agreement } from "../../types";

type Props = {
  selectedRoute?: AgreementRoute;
  onRouteChange: (AgreementRoute) => void;
  onInitAgreementPage: () => void;
  supportedAgreements: AgreementSupportInfo[];
  selectedEnterprise?: Enterprise;
  selectedAgreement?: Agreement;
  onAgreementChange: OnSelectAgreementFn;
  onAgreementSearch: (value: AgreementSearchValue) => void;
  onEnterpriseSearch: (value: AgreementSearchValue) => void;
  simulator: PublicodesSimulator;
  hasNoEnterpriseSelected: boolean;
  setHasNoEnterpriseSelected: (boolean) => void;
  error?: CommonAgreementStoreError;
  searchAgreementResultOverride?: (
    query: string,
    results: Agreement[]
  ) => Agreement[];
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
  onInitAgreementPage,
  onEnterpriseSearch,
  onAgreementSearch,
  hasNoEnterpriseSelected,
  setHasNoEnterpriseSelected,
  searchAgreementResultOverride,
}: Props): JSX.Element {
  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label:
              "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)",
            value: "not-selected" as AgreementRoute,
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
        autoFocus
      />
      {selectedRoute === "not-selected" && <ShowAlert route="not-selected" />}
    </>
  );
}

export default AgreementStep;
