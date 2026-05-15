"use client";
import { ButtonsGroup } from "@codegouvfr/react-dsfr/ButtonsGroup";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { fr } from "@codegouvfr/react-dsfr";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { ContributionAfficherInfoVariations } from "../../config/abTests";
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
  variant?: string | null;
};

const AGREEMENT_LABEL =
  "Je sais quelle est ma convention collective et je la saisis.";
const ENTERPRISE_LABEL =
  "Je cherche mon entreprise pour trouver ma convention collective.";
const NO_AGREEMENT_LABEL =
  "Je ne souhaite pas renseigner ma convention collective.";

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
  variant,
}: Props) => {
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >();
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);

  const isRegularButtonVariant =
    variant === ContributionAfficherInfoVariations.REGULAR_BUTTON;

  useEffect(() => {
    if (defaultAgreement && !selectedRoute) {
      setSelectedRoute("agreement");
      onRouteChange?.("agreement");
    }
  }, [defaultAgreement]);

  useEffect(() => {
    if (!error) return;
    if (isRegularButtonVariant) {
      firstButtonRef.current?.focus();
      firstButtonRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }
    if (radioRefs.current[0]) {
      radioRefs.current[0].focus();
      radioRefs.current[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error, isRegularButtonVariant]);

  const { emitClickP1, emitClickP2, emitClickP3 } = useContributionTracking(
    variant ?? undefined
  );

  const { emitSelectEvent } = useAgreementSearchTracking();

  const updateRoute = (route: AgreementRoute) => {
    setSelectedRoute(route);
    onRouteChange?.(route);
  };

  const onSelectAgreementRoute = () => updateRoute("agreement");
  const onSelectEnterpriseRoute = () => {
    onAgreementSelect();
    updateRoute("enterprise");
  };
  const onSelectNoAgreementRoute = () => {
    onAgreementSelect();
    updateRoute("no-agreement");
    emitClickP3(trackingActionName);
  };

  return (
    <>
      {isRegularButtonVariant ? (
        <>
          <p className={fr.cx("fr-mb-1w", "fr-text--md")}>
            Quel est le nom de la convention collective applicable ?
          </p>
          <ButtonsGroup
            buttonsSize="medium"
            inlineLayoutWhen="md and up"
            buttons={[
              {
                children: AGREEMENT_LABEL,
                priority:
                  selectedRoute === "agreement" ? "primary" : "secondary",
                type: "button",
                onClick: onSelectAgreementRoute,
                nativeButtonProps: {
                  ref: (el: HTMLButtonElement | null) => {
                    firstButtonRef.current = el;
                  },
                  "aria-pressed": selectedRoute === "agreement",
                },
              },
              {
                children: ENTERPRISE_LABEL,
                priority:
                  selectedRoute === "enterprise" ? "primary" : "secondary",
                type: "button",
                onClick: onSelectEnterpriseRoute,
                nativeButtonProps: {
                  "aria-pressed": selectedRoute === "enterprise",
                },
              },
              ...(showNoAgreementOption
                ? [
                    {
                      children: NO_AGREEMENT_LABEL,
                      priority: (selectedRoute === "no-agreement"
                        ? "primary"
                        : "secondary") as "primary" | "secondary",
                      type: "button" as const,
                      onClick: onSelectNoAgreementRoute,
                      nativeButtonProps: {
                        "aria-pressed": selectedRoute === "no-agreement",
                      },
                    },
                  ]
                : []),
            ]}
          />
          {error && (
            <p
              className={fr.cx("fr-error-text", "fr-mt-1w")}
              role="alert"
              data-testid="missing-route-error"
            >
              {error}
            </p>
          )}
        </>
      ) : (
        <RadioButtons
          legend="Quel est le nom de la convention collective applicable ?"
          state={error ? "error" : "default"}
          stateRelatedMessage={error}
          options={[
            {
              label: AGREEMENT_LABEL,
              nativeInputProps: {
                checked: selectedRoute === "agreement",
                onChange: onSelectAgreementRoute,
                ref: (el: HTMLInputElement | null) => {
                  radioRefs.current[0] = el;
                },
              },
            },
            {
              label: ENTERPRISE_LABEL,
              nativeInputProps: {
                checked: selectedRoute === "enterprise",
                onChange: onSelectEnterpriseRoute,
                ref: (el: HTMLInputElement | null) => {
                  radioRefs.current[1] = el;
                },
              },
            },
            ...(showNoAgreementOption
              ? [
                  {
                    label: NO_AGREEMENT_LABEL,
                    nativeInputProps: {
                      checked: selectedRoute === "no-agreement",
                      onChange: onSelectNoAgreementRoute,
                      ref: (el: HTMLInputElement | null) => {
                        radioRefs.current[2] = el;
                      },
                    },
                  },
                ]
              : []),
          ]}
        />
      )}
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
