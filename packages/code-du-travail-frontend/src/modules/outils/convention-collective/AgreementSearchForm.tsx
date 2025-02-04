"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useEffect, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";
import {
  EnterpriseAgreement,
  EnterpriseAgreementSearchInput,
} from "../../enterprise";
import { useContributionTracking } from "../../contributions/tracking";

type Props = {
  onAgreementSelect: (agreement?: EnterpriseAgreement) => void;
  selectedAgreementAlert?: (
    agreement?: EnterpriseAgreement
  ) => NonNullable<ReactNode> | undefined;
  defaultAgreement?: EnterpriseAgreement;
  trackingActionName: string;
};

export const AgreementSearchForm = ({
  onAgreementSelect,
  selectedAgreementAlert,
  defaultAgreement,
  trackingActionName,
}: Props) => {
  const [mode, setMode] = useState<
    "agreementSearch" | "enterpriseSearch" | "noSearch" | undefined
  >();

  useEffect(() => {
    setMode(!!defaultAgreement ? "agreementSearch" : undefined);
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
              checked: mode === "agreementSearch",
              onChange: () => setMode("agreementSearch"),
            },
          },
          {
            label:
              "Je cherche mon entreprise pour trouver ma convention collective.",
            nativeInputProps: {
              checked: mode === "enterpriseSearch",
              onChange: () => {
                onAgreementSelect();
                setMode("enterpriseSearch");
              },
            },
          },
        ]}
      />
      {mode === "agreementSearch" && (
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
      {mode === "enterpriseSearch" && (
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
