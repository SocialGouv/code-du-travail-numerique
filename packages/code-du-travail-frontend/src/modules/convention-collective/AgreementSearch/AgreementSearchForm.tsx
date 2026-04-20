"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { EnterpriseAgreementSearchInput } from "../../enterprise";
import {
  Agreement,
  AgreementRoute,
} from "src/modules/outils/indemnite-depart/types";
import { useAgreementSearchTracking } from "../tracking";

type Props = {
  onAgreementSelect: (agreement?: Agreement) => void;
  selectedAgreementAlert?: (
    agreement?: Agreement
  ) => NonNullable<ReactNode> | undefined;
  defaultAgreement?: Agreement;
  trackingActionName: string;
  level: 2 | 3;
  onBackToPersonalize?: () => void;
  showNoAgreementOption?: boolean;
  noAgreementContent?: ReactNode;
  onRouteChange?: (route: AgreementRoute | undefined) => void;
  error?: string;
};

export const AgreementSearchForm = ({
  onAgreementSelect,
  selectedAgreementAlert,
  defaultAgreement,
  trackingActionName,
  level,
  onBackToPersonalize,
  showNoAgreementOption = false,
  noAgreementContent,
  onRouteChange,
  error,
}: Props) => {
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (defaultAgreement && !selectedRoute) {
      setSelectedRoute("agreement");
      onRouteChange?.("agreement");
    }
  }, [defaultAgreement]);

  useEffect(() => {
    if (error && radioRefs.current[0]) {
      radioRefs.current[0].focus();
      radioRefs.current[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  const { emitClickP1, emitClickP2, emitClickP3 } = useContributionTracking();

  const { emitSelectEvent } = useAgreementSearchTracking();

  const updateRoute = (route: AgreementRoute) => {
    setSelectedRoute(route);
    onRouteChange?.(route);
  };

  return (
    <>
      <RadioButtons
        legend="Quel est le nom de la convention collective applicable ?"
        state={error ? "error" : "default"}
        stateRelatedMessage={error}
        options={[
          {
            label:
              "Je sais quelle est ma convention collective et je la saisis.",
            nativeInputProps: {
              checked: selectedRoute === "agreement",
              onChange: () => updateRoute("agreement"),
              ref: (el: HTMLInputElement | null) => {
                radioRefs.current[0] = el;
              },
            },
          },
          {
            label:
              "Je cherche mon entreprise pour trouver ma convention collective.",
            nativeInputProps: {
              checked: selectedRoute === "enterprise",
              onChange: () => {
                onAgreementSelect();
                updateRoute("enterprise");
              },
              ref: (el: HTMLInputElement | null) => {
                radioRefs.current[1] = el;
              },
            },
          },
          ...(showNoAgreementOption
            ? [
                {
                  label:
                    "Je ne souhaite pas renseigner ma convention collective.",
                  nativeInputProps: {
                    checked: selectedRoute === "no-agreement",
                    onChange: () => {
                      onAgreementSelect();
                      updateRoute("no-agreement");
                      emitClickP3(trackingActionName);
                    },
                    ref: (el: HTMLInputElement | null) => {
                      radioRefs.current[2] = el;
                    },
                  },
                },
              ]
            : []),
        ]}
      />
      {selectedRoute === "agreement" && (
        <AgreementSearchInput
          onAgreementSelect={(agreement) => {
            if (agreement) {
              emitSelectEvent(`idcc${agreement.num}`, trackingActionName);
            }
            emitClickP1(trackingActionName);
            onAgreementSelect(agreement);
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={defaultAgreement}
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
          onBackToPersonalize={onBackToPersonalize}
        />
      )}
      {selectedRoute === "no-agreement" && noAgreementContent}
    </>
  );
};
