import React from "react";
import { RadioQuestion } from "../../../../common/components";
import { AgreementRoute } from "../../../types";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "src/modules/enterprise";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreFn,
  CommonAgreementStoreInput,
} from "../store";
import { selectedAgreementAlert } from "./selectedAgreementAlert";
import { fr } from "@codegouvfr/react-dsfr";
import { PublicodesSimulator } from "@socialgouv/modeles-social";

type Props = {
  error: CommonAgreementStoreError;
  onRouteChange: (route: AgreementRoute) => void;
  route: CommonAgreementStoreInput["route"];
  onAgreementChange: CommonAgreementStoreFn["onAgreementChange"];
  enterprise: CommonAgreementStoreInput["enterprise"];
  agreement: CommonAgreementStoreInput["agreement"];
  onInitAgreementPage: CommonAgreementStoreFn["onInitAgreementPage"];
  trackingActionName: string;
  simulator: PublicodesSimulator;
  showNotSelectedOption: boolean;
};

export const CommonAgreementStep = ({
  error,
  onRouteChange,
  route,
  onAgreementChange,
  enterprise,
  agreement,
  onInitAgreementPage,
  trackingActionName,
  simulator,
  showNotSelectedOption,
}: Required<Props>): JSX.Element => {
  React.useEffect(() => {
    onInitAgreementPage();
  }, [onInitAgreementPage]);

  const questions = [
    {
      label: "Je sais quelle est ma convention collective et je la saisis.",
      value: "agreement" as AgreementRoute,
      id: "route-agreement",
    },
    {
      label:
        "Je ne sais pas quelle est ma convention collective et je la recherche.",
      value: "enterprise" as AgreementRoute,
      id: "route-enterprise",
    },
  ];

  if (showNotSelectedOption) {
    questions.push({
      label:
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape).",
      value: "not-selected" as AgreementRoute,
      id: "route-none",
    });
  }

  return (
    <>
      <RadioQuestion
        questions={questions}
        name="route"
        label="Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={route}
        onChangeSelectedOption={onRouteChange}
        error={error?.route}
        subLabel="Vous pouvez trouver le nom de votre convention collective sur votre bulletin de paie"
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
            selectedAgreementAlert={(agr) =>
              agr && selectedAgreementAlert(agr, simulator)
            }
            defaultAgreement={agreement}
            trackingActionName={trackingActionName}
          />
          {error?.agreement && (
            <Alert
              title={error.agreement}
              severity="error"
              className={fr.cx("fr-mt-2w")}
            />
          )}
        </>
      )}
      {route === "enterprise" && (
        <>
          <EnterpriseAgreementSearchInput
            onAgreementSelect={(agr, ent) => {
              onAgreementChange(agr, ent);
            }}
            selectedAgreementAlert={(agr) =>
              agr && selectedAgreementAlert(agr, simulator)
            }
            trackingActionName={trackingActionName}
            enterprise={enterprise}
            agreement={agreement}
            isInSimulator={true}
            canContinueSimulationIfNoAgreement={showNotSelectedOption}
          />
          {error?.enterprise && (
            <Alert
              title={error.enterprise}
              severity="error"
              className={fr.cx("fr-mt-2w")}
            />
          )}
        </>
      )}
      {error?.errorPublicodes && (
        <Alert
          title={error.errorPublicodes}
          severity="error"
          className={fr.cx("fr-mt-2w")}
        />
      )}
    </>
  );
};
