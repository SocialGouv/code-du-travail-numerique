"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise, EnterpriseAgreement } from "../types";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useState } from "react";
import { useEnterpriseAgreementSearchTracking } from "./tracking";

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
  const { emitSelectEnterpriseAgreementEvent } =
    useEnterpriseAgreementSearchTracking();
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
      <div className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}>
        {!!agreements.length &&
          (agreements.length === 1 ? (
            <>1 convention collective trouvée&nbsp;:</>
          ) : (
            <>{agreements.length} conventions collectives trouvées&nbsp;:</>
          ))}
      </div>
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
                    emitSelectEnterpriseAgreementEvent(`idcc${agreement.id}`);
                  },
                }
              : {}),
          },
        }))}
      />
      {((agreement && !agreement.contributions) || !agreements.length) && (
        <Alert
          severity="info"
          title="Aucune convention collective n'a été déclarée pour l'entreprise"
          description="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
        />
      )}
    </>
  );
};
