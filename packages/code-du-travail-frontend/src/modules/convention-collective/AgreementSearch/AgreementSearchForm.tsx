"use client";
import { fr } from "@codegouvfr/react-dsfr";
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
};

export const AgreementSearchForm = ({
  onAgreementSelect,
  selectedAgreementAlert,
}: Props) => {
  const [mode, setMode] = useState<
    "agreementSearch" | "enterpriseSearch" | "noSearch" | undefined
  >("agreementSearch");

  return (
    <>
      <p className={`${fr.cx("fr-mt-2w")}`}>
        La réponse dépend de la convention collective à laquelle votre
        entreprise est rattachée. Veuillez renseigner votre situation afin
        d’obtenir une réponse adaptée.
      </p>
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
              onChange: () => setMode("enterpriseSearch"),
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
        />
      )}
      {mode === "enterpriseSearch" && (
        <EnterpriseAgreementSearchInput
          onAgreementSelect={(agreement) => {
            if (onAgreementSelect) onAgreementSelect(agreement, "p2");
          }}
          selectedAgreementAlert={selectedAgreementAlert}
        />
      )}
    </>
  );
};
