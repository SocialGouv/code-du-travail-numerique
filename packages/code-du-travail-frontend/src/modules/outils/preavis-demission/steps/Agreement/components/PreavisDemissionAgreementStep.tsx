import React from "react";
import { RadioQuestion } from "../../../../common/components";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "src/modules/enterprise";
import {
  CommonAgreementStoreError,
  CommonAgreementStoreFn,
  CommonAgreementStoreInput,
} from "src/modules/outils/indemnite-depart/steps/Agreement/store";
import { selectedAgreementAlert } from "src/modules/outils/indemnite-depart/steps/Agreement/components/selectedAgreementAlert";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  error: CommonAgreementStoreError;
  onRouteChange: (route: AgreementRoute) => void;
  route: CommonAgreementStoreInput["route"];
  onAgreementChange: CommonAgreementStoreFn["onAgreementChange"];
  enterprise: CommonAgreementStoreInput["enterprise"];
  agreement: CommonAgreementStoreInput["agreement"];
  onInitAgreementPage: CommonAgreementStoreFn["onInitAgreementPage"];
  trackingActionName: string;
};

export const PreavisDemissionAgreementStep = ({
  error,
  onRouteChange,
  route,
  onAgreementChange,
  enterprise,
  agreement,
  onInitAgreementPage,
  trackingActionName,
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
          // Option "not-selected" supprimée pour le préavis de démission
        ]}
        name="route"
        label="Quel est le nom de la convention collective applicable&nbsp;?"
        selectedOption={route}
        onChangeSelectedOption={onRouteChange}
        error={error?.route}
        subLabel="Vous pouvez trouver le nom de votre convention collective sur votre bulletin de paie"
        autoFocus
      />

      {route === "agreement" && (
        <>
          <AgreementSearchInput
            onAgreementSelect={(agreement) => {
              onAgreementChange(agreement);
            }}
            selectedAgreementAlert={selectedAgreementAlert}
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
            onAgreementSelect={(agreement, enterprise) => {
              onAgreementChange(agreement, enterprise);
            }}
            selectedAgreementAlert={selectedAgreementAlert}
            agreement={agreement}
            enterprise={enterprise}
            trackingActionName={trackingActionName}
          />
          {error?.agreement && (
            <Alert
              title={error.agreement}
              severity="error"
              className={fr.cx("fr-mt-2w")}
            />
          )}
          {error?.enterprise && (
            <Alert
              title={error.enterprise}
              severity="error"
              className={fr.cx("fr-mt-2w")}
            />
          )}
        </>
      )}
    </>
  );
};
