"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { EnterpriseAgreementSearchInput } from "../../enterprise";
import { AgreementRoute } from "../../../outils/common/type/WizardType";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { useAgreementSearchTracking } from "../tracking";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  selectedAgreementAlert?: (
    agreement?: Agreement
  ) => NonNullable<ReactNode> | undefined;
  defaultAgreement?: Agreement;
  trackingActionName: string;
  level?: 2 | 3;
};

export const AgreementSearchForm = ({
  onAgreementSelect,
  selectedAgreementAlert,
  defaultAgreement,
  trackingActionName,
  level,
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

  const { emitSelectEvent } = useAgreementSearchTracking();

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
            if (agreement) {
              emitSelectEvent(`idcc${agreement.id}`, trackingActionName);
            }
            emitClickP1(trackingActionName);
            onAgreementSelect(agreement);
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={defaultAgreement}
          trackingActionName={trackingActionName}
          level={level}
        />
      )}
      {selectedRoute === "enterprise" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement, _enterprise) => {
            emitClickP2(trackingActionName);
            onAgreementSelect(agreement);
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          trackingActionName={trackingActionName}
          level={level}
        />
      )}
    </>
  );
};
