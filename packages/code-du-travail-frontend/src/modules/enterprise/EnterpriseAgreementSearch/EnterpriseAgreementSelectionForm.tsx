"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise, EnterpriseAgreement } from "../types";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import Button from "@codegouvfr/react-dsfr/Button";

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
              ? { onChange: () => onAgreementSelect(agreement) }
              : {}),
          },
          hintText: description,
        }))}
      />
    </>
  );
};
