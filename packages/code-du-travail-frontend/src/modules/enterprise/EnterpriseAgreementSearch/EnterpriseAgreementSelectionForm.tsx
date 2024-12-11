"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise, EnterpriseAgreement } from "../types";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  goBack: () => void;
  onAgreementSelect?: (agreement: EnterpriseAgreement) => void;
};

export const EnterpriseAgreementSelectionForm = ({
  enterprise,
  goBack,
  onAgreementSelect,
}: Props) => {
  const [agreement, setAgreement] = useState<EnterpriseAgreement | undefined>();
  const agreements = getEnterpriseAgreements(enterprise.conventions);
  return (
    <>
      <EnterpriseAgreementSelectionDetail enterprise={enterprise} />
      <Button
        iconId="fr-icon-arrow-go-back-fill"
        onClick={goBack}
        priority="secondary"
      >
        Modifier
      </Button>
      <RadioButtons
        className={fr.cx("fr-mt-2w")}
        options={agreements.map(({ disabled, description, ...agreement }) => ({
          label: `${agreement.shortTitle} IDCC ${agreement.id}`,
          nativeInputProps: {
            value: agreement.num,
            ...(onAgreementSelect
              ? {
                  onChange: () => {
                    onAgreementSelect(agreement);
                    setAgreement(agreement);
                  },
                }
              : {}),
          },
        }))}
      />
      {((agreement && !agreement.contributions) || !agreements.length) && (
        <Alert
          severity="info"
          title="Nous n'avons pas de réponse pour cette convention collective"
          description="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
        />
      )}
    </>
  );
};
