"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";

import { useContributionTracking } from "../../contributions/tracking";
import { getAfficherInfoVariantFlags } from "../../config/abTests";
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
  onEnterpriseWithoutAgreement?: (hasNoAgreement: boolean) => void;
  error?: string;
  variant?: string | null;
  forcedRoute?: AgreementRoute;
  enterpriseRequireSearchSignal?: number;
  agreementRequireSearchSignal?: number;
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
  onEnterpriseWithoutAgreement,
  error,
  variant,
  forcedRoute,
  enterpriseRequireSearchSignal,
  agreementRequireSearchSignal,
}: Props) => {
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >(forcedRoute);
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { isRegularButton: isRegularButtonVariant } =
    getAfficherInfoVariantFlags(variant);

  useEffect(() => {
    if (forcedRoute && forcedRoute !== selectedRoute) {
      setSelectedRoute(forcedRoute);
      onRouteChange?.(forcedRoute);
    }
  }, [forcedRoute]);

  useEffect(() => {
    if (defaultAgreement && !selectedRoute) {
      setSelectedRoute("agreement");
      onRouteChange?.("agreement");
    }
  }, [defaultAgreement]);

  useEffect(() => {
    if (!error) return;
    if (radioRefs.current[0]) {
      radioRefs.current[0].focus();
      radioRefs.current[0].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  const { emitClickP1, emitClickP2, emitClickP3 } =
    useContributionTracking(variant);

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
      {!isRegularButtonVariant && (
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
          requireSearchSignal={agreementRequireSearchSignal}
        />
      )}
      {selectedRoute === "enterprise" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement, _enterprise) => {
            emitClickP2(trackingActionName);
            onAgreementSelect(agreement);
            onEnterpriseWithoutAgreement?.(
              !agreement &&
                !!_enterprise &&
                (_enterprise.conventions?.length ?? 0) === 0
            );
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          trackingActionName={trackingActionName}
          level={level}
          onBackToPersonalize={onBackToPersonalize}
          requireSearchSignal={enterpriseRequireSearchSignal}
        />
      )}
      {selectedRoute === "no-agreement" && noAgreementContent}
    </>
  );
};
