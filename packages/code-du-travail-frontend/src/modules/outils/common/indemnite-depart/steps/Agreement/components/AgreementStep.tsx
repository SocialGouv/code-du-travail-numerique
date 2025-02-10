import React from "react";
import { RadioQuestion } from "../../../../components";
import { Agreement, AgreementRoute, IndemniteDepartType } from "../../../types";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "src/modules/enterprise";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreFn,
  CommonAgreementStoreInput,
} from "../store";
import { selectedAgreementAlert } from "./selectedAgreementAlert";

type Props = {
  error: CommonAgreementStoreError;
  onRouteChange: (route: AgreementRoute) => void;
  route: CommonAgreementStoreInput["route"];
  onAgreementChange: CommonAgreementStoreFn["onAgreementChange"];
  enterprise: CommonAgreementStoreInput["enterprise"];
  agreement: CommonAgreementStoreInput["agreement"];
  onInitAgreementPage: CommonAgreementStoreFn["onInitAgreementPage"];
  indemniteDepartType: CommonAgreementStoreInput["indemniteDepartType"];
};

export const CommonAgreementStep = ({
  error,
  onRouteChange,
  route,
  onAgreementChange,
  enterprise,
  agreement,
  onInitAgreementPage,
  indemniteDepartType,
}: Required<Props>): JSX.Element => {
  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label:
              "Je sais quelle est ma convention collective et je la saisis.",
            value: "agreement" as AgreementRoute,
            id: "route-agreement",
          },
          {
            label:
              "Je ne sais pas quelle est ma convention collective et je la recherche.",
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
        label="Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={route}
        onChangeSelectedOption={onRouteChange}
        error={error?.route}
        subLabel="Vous pouvez trouver le nom de votre convention collective sur votre bulletin de paie"
        autoFocus
      />
      {route === "not-selected" && (
        <Alert
          severity="warning"
          title="Attention"
          description="Vous pouvez passer cette étape et poursuivre la simulation qui vous fournira un résultat basé sur le code du travail. Nous vous recommandons de renseigner votre convention collective qui peut prévoir un résultat plus favorable que celui défini par le code du travail."
        />
      )}

      {route === "agreement" && (
        <>
          <AgreementSearchInput
            onAgreementSelect={(agreement) => {
              onAgreementChange(agreement);
            }}
            selectedAgreementAlert={selectedAgreementAlert}
            defaultAgreement={agreement}
            trackingActionName={
              indemniteDepartType ?? IndemniteDepartType.LICENCIEMENT
            }
          />
          {error?.agreement && (
            <Alert title={error.agreement} severity="error" />
          )}
        </>
      )}
      {route === "enterprise" && (
        <>
          <EnterpriseAgreementSearchInput
            onAgreementSelect={(agreement, enterprise) => {
              onAgreementChange(agreement, enterprise);
            }}
            selectedAgreementAlert={selectedAgreementAlert}
            trackingActionName={
              indemniteDepartType ?? IndemniteDepartType.LICENCIEMENT
            }
            enterprise={enterprise}
            agreement={agreement}
          />
          {error?.enterprise && (
            <Alert title={error.enterprise} severity="error" />
          )}
        </>
      )}
      {error?.errorPublicodes && (
        <Alert title={error.errorPublicodes} severity="error" />
      )}
    </>
  );
};
