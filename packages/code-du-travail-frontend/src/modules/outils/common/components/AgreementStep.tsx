import React from "react";
import { RadioQuestion } from ".";
import { AgreementRoute } from "../../indemnite-depart/types";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "src/modules/enterprise";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreFn,
  CommonAgreementStoreInput,
} from "../../indemnite-depart/steps/Agreement/store";
import { PublicodesSimulator } from "@socialgouv/modeles-social";
import { Agreement } from "../../indemnite-depart/types";
import isCcFullySupported from "src/modules/outils/common/utils/isCcFullySupported";
import { fr } from "@codegouvfr/react-dsfr";
import { AccessibleAlert } from "./AccessibleAlert";

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
}: Required<Props>) => {
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
        <AccessibleAlert
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
              agr &&
              selectedAgreementAlert(agr, simulator, showNotSelectedOption)
            }
            defaultAgreement={agreement}
            trackingActionName={trackingActionName}
          />
          {error?.agreement && (
            <div className={fr.cx("fr-mt-2w")}>
              <AccessibleAlert
                title="Attention"
                severity="error"
                description={error.agreement}
                autoFocus
              />
            </div>
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
              agr &&
              selectedAgreementAlert(agr, simulator, showNotSelectedOption)
            }
            trackingActionName={trackingActionName}
            enterprise={enterprise}
            agreement={agreement}
            isInSimulator={true}
            canContinueSimulationIfNoAgreement={showNotSelectedOption}
          />
          {error?.enterprise && (
            <div className={fr.cx("fr-mt-2w")}>
              <AccessibleAlert
                title="Attention"
                severity="error"
                description={error.enterprise}
                autoFocus
              />
            </div>
          )}
        </>
      )}
      {error?.errorPublicodes && (
        <div className={fr.cx("fr-mt-2w")}>
          <AccessibleAlert
            title="Attention"
            severity="error"
            description={error.errorPublicodes}
            autoFocus
          />
        </div>
      )}
    </>
  );
};

const selectedAgreementAlert = (
  agreement: Agreement,
  simulator: PublicodesSimulator,
  showNotSelectedOption: boolean
) => {
  const isSupported = isCcFullySupported(agreement.num, simulator);
  if (!isSupported && !showNotSelectedOption) {
    return (
      <>
        <p>
          La convention collective sélectionnée n&apos;est pas traitée par nos
          services.
        </p>
        <p>
          Vous ne pouvez pas poursuivre la simulation avec cette convention
          collective.
        </p>
      </>
    );
  } else if (!isSupported) {
    return (
      <>
        <p>
          La convention collective sélectionnée n&apos;est pas traitée par nos
          services.
        </p>
        <p>
          Vous pouvez tout de même poursuivre la simulation qui vous fournira un
          résultat basé sur le code du travail.
        </p>
      </>
    );
  }
  return undefined;
};
