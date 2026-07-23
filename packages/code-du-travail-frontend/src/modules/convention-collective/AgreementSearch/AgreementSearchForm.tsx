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
  /**
   * Route pré-cochée au montage. Simple pré-cochage (pas une action usager) :
   * n'émet aucun événement Matomo et n'appelle pas `onAgreementSelect`.
   * `defaultAgreement` est prioritaire (il pré-coche la route « agreement »).
   */
  defaultRoute?: AgreementRoute;
  trackingActionName: string;
  level: 2 | 3;
  onBackToPersonalize?: () => void;
  showNoAgreementOption?: boolean;
  noAgreementContent?: ReactNode;
  onRouteChange?: (route: AgreementRoute | undefined) => void;
  onEnterpriseWithoutAgreement?: (hasNoAgreement: boolean) => void;
  error?: string;
  enterpriseRequireSearchSignal?: number;
  agreementRequireSearchSignal?: number;
  showWhatIsAgreementLink?: boolean;
  /** Légende (label) du groupe de radios. Défaut : question générique. */
  legend?: ReactNode;
};

const DEFAULT_LEGEND =
  "Quel est le nom de la convention collective applicable ?";

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
  defaultRoute,
  trackingActionName,
  level,
  onBackToPersonalize,
  showNoAgreementOption = false,
  noAgreementContent,
  onRouteChange,
  onEnterpriseWithoutAgreement,
  error,
  enterpriseRequireSearchSignal,
  agreementRequireSearchSignal,
  showWhatIsAgreementLink = false,
  legend = DEFAULT_LEGEND,
}: Props) => {
  const [selectedRoute, setSelectedRoute] = useState<
    AgreementRoute | undefined
  >(undefined);
  const radioRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Pré-cochage : ce n'est pas une action de l'usager, on ne passe donc pas
  // par onSelect*Route (pas d'event, pas d'effacement de CC). Le parent peut
  // fournir la route après son propre effet de montage (lecture du hash), d'où
  // la dépendance ; on n'écrase jamais un choix déjà fait par l'usager.
  // L'effet defaultAgreement ci-dessous garde la priorité.
  useEffect(() => {
    if (defaultRoute && !selectedRoute && !defaultAgreement) {
      setSelectedRoute(defaultRoute);
      onRouteChange?.(defaultRoute);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRoute]);

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

  const { emitClickP1, emitClickP2, emitClickP3 } = useContributionTracking();

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
      <RadioButtons
        legend={legend}
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
          showWhatIsAgreementLink={showWhatIsAgreementLink}
        />
      )}
      {selectedRoute === "no-agreement" && noAgreementContent}
    </>
  );
};
