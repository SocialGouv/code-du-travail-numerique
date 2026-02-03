"use client";

import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { fr } from "@codegouvfr/react-dsfr";
import { useEffect, useState } from "react";
import type { Agreement } from "src/modules/outils/indemnite-depart/types";
import { AgreementSearchInput } from "src/modules/convention-collective/AgreementSearch/AgreementSearchInput";
import { EnterpriseAgreementSearchInput } from "src/modules/enterprise";

type Route = "agreement" | "enterprise";

type Props = {
  defaultAgreement?: Agreement;
  onAgreementSelect: (agreement: Agreement) => void;
};

export const AgreementSelectionForm = ({
  defaultAgreement,
  onAgreementSelect,
}: Props) => {
  const [route, setRoute] = useState<Route>("agreement");

  useEffect(() => {
    if (defaultAgreement) {
      setRoute("agreement");
    }
  }, [defaultAgreement]);

  return (
    <div className={fr.cx("fr-mt-2w")}>
      <RadioButtons
        legend="Quel est le nom de la convention collective applicable ?"
        options={[
          {
            label:
              "Je sais quelle est ma convention collective et je la saisis.",
            nativeInputProps: {
              checked: route === "agreement",
              onChange: () => setRoute("agreement"),
            },
          },
          {
            label:
              "Je cherche mon entreprise pour trouver ma convention collective.",
            nativeInputProps: {
              checked: route === "enterprise",
              onChange: () => setRoute("enterprise"),
            },
          },
        ]}
      />

      {route === "agreement" && (
        <AgreementSearchInput
          autocompleteId="header-agreement-search-autocomplete"
          trackingActionName="Header - convention collective"
          level={2}
          defaultAgreement={defaultAgreement}
          onAgreementSelect={(agreement) => {
            if (!agreement) return;
            onAgreementSelect(agreement);
          }}
        />
      )}

      {route === "enterprise" && (
        <EnterpriseAgreementSearchInput
          trackingActionName="Header - convention collective"
          level={2}
          agreement={defaultAgreement}
          onAgreementSelect={(agreement) => {
            if (!agreement) return;
            onAgreementSelect(agreement);
          }}
        />
      )}
    </div>
  );
};
