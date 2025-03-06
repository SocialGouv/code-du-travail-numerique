"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { EnterpriseAgreementSearchInput } from "../../enterprise";
import { AgreementRoute } from "../../../outils/common/type/WizardType";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  selectedAgreementAlert?: (
    agreement?: Agreement
  ) => NonNullable<ReactNode> | undefined;
  defaultAgreement?: Agreement;
  trackingActionName: string;
};

export const AgreementSearchForm = ({
  onAgreementSelect,
  selectedAgreementAlert,
  defaultAgreement,
  trackingActionName,
}: Props) => {
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();

  useEffect(() => {
    if (defaultAgreement && !selectedRoute) {
      setSelectedRoute("agreement");
    }
  }, [defaultAgreement]);

  const { emitClickP1, emitClickP2 } = useContributionTracking();

  return (
    <>
      <RadioButtons
        legend="Quel est le nom de la convention collective applicable ?"
        options={[
          {
            label:
              "Je sais quelle est ma convention collective et je la saisis.",
            nativeInputProps: {
              checked: selectedRoute === "agreement",
              onChange: () => setSelectedRoute("agreement"),
            },
          },
          {
            label:
              "Je cherche mon entreprise pour trouver ma convention collective.",
            nativeInputProps: {
              checked: selectedRoute === "enterprise",
              onChange: () => {
                onAgreementSelect();
                setSelectedRoute("enterprise");
              },
            },
          },
        ]}
      />
      {selectedRoute === "agreement" && (
        <AgreementSearchInput
          onAgreementSelect={(agreement) => {
            emitClickP1(trackingActionName);
            onAgreementSelect(agreement);
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={defaultAgreement}
          trackingActionName={trackingActionName}
        />
      )}
      {selectedRoute === "enterprise" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement) => {
            emitClickP2(trackingActionName);
            onAgreementSelect(agreement);
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          trackingActionName={trackingActionName}
        />
      )}
    </>
  );
};
