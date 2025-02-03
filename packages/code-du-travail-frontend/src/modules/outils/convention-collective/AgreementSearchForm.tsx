"use client";
import { RadioButtons } from "@codegouvfr/react-dsfr/RadioButtons";
import { ReactNode, useState } from "react";
import { AgreementSearchInput } from "./AgreementSearchInput";
import {
  EnterpriseAgreement,
  EnterpriseAgreementSearchInput,
} from "../../enterprise";

type Props = {
  onAgreementSelect?: (agreement?: EnterpriseAgreement, mode?: string) => void;
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
  >(!!defaultAgreement ? "agreementSearch" : undefined);

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
                if (onAgreementSelect) onAgreementSelect();
                setMode("enterpriseSearch");
              },
            },
          },
        ]}
      />
      {mode === "agreementSearch" && (
        <AgreementSearchInput
          onAgreementSelect={(agreement) => {
            if (onAgreementSelect) onAgreementSelect(agreement, "p1");
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          defaultAgreement={defaultAgreement}
          trackingActionName={trackingActionName}
        />
      )}
      {mode === "enterpriseSearch" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement) => {
            if (onAgreementSelect) onAgreementSelect(agreement, "p2");
          }}
          selectedAgreementAlert={selectedAgreementAlert}
          trackingActionName={trackingActionName}
        />
      )}
    </>
  );
};
