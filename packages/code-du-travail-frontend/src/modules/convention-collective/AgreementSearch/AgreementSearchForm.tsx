"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { EnterpriseAgreementSearchInput } from "../../enterprise";
import { AgreementRoute } from "../../../outils/common/type/WizardType";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { useEnterpriseAgreementSearchTracking } from "src/modules/enterprise/EnterpriseAgreementSearch/tracking";
import { useAgreementSearchTracking } from "../tracking";
import { fr } from "@codegouvfr/react-dsfr";

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
  const {
    emitSelectEnterpriseEvent,
    emitNoEnterpriseSelectEvent,
    emitSelectEnterpriseAgreementEvent,
  } = useEnterpriseAgreementSearchTracking();
  const { emitSelectEvent } = useAgreementSearchTracking();

  return (
    <>
      <p className={fr.cx("fr-text--sm")}>
        Tous les champs sont obligatoires sauf mention contraire
      </p>
      <RadioButtons
        legend="Quel est le nom de la convention collective applicable ? (facultatif)"
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
        />
      )}
      {selectedRoute === "enterprise" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement, enterprise) => {
            if (enterprise) {
              emitSelectEnterpriseEvent(trackingActionName, {
                label: enterprise.label,
                siren: enterprise.siren,
              });
              emitSelectEnterpriseAgreementEvent(
                `idcc${enterprise.conventions[0].num}`,
                trackingActionName
              );
            } else {
              emitNoEnterpriseSelectEvent();
            }
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
