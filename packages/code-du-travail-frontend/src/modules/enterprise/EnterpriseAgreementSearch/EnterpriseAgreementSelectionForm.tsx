"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise } from "../types";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useEffect, useRef, useState } from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  isInSimulator?: boolean;
  canContinueSimulationIfNoAgreement?: boolean;
  enterprise: Omit<Enterprise, "complements">;
  selectedAgreement?: Agreement;
  goBack: () => void;
  onAgreementSelect?: (agreement?: Agreement) => void;
};

export const EnterpriseAgreementSelectionForm = ({
  enterprise,
  selectedAgreement,
  goBack,
  onAgreementSelect,
  canContinueSimulationIfNoAgreement,
  isInSimulator,
}: Props) => {
  const [agreement, setAgreement] = useState<Agreement | undefined>(
    selectedAgreement
  );
  const agreements = getEnterpriseAgreements(enterprise.conventions);

  return (
    <>
      <EnterpriseAgreementSelectionDetail enterprise={enterprise} />
      <Button
        iconId="fr-icon-arrow-go-back-fill"
        onClick={goBack}
        priority="secondary"
        aria-label="Modifier l'entreprise sélectionnée"
        title="Modifier l'entreprise sélectionnée"
        aria-describedby={`your-enterprise`}
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
        name="convention-collective"
        options={agreements.map(({ disabled, description, ...agreement }) => ({
          label: `${agreement.shortTitle} IDCC ${agreement.id}`,
          nativeInputProps: {
            value: agreement.num,
            checked: selectedAgreement
              ? selectedAgreement.num === agreement.num
              : false,
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
      {agreement && !agreement.contributions && (
        <Alert
          severity="info"
          title={
            <span>
              Nous n&apos;avons pas de réponse pour cette convention collective
            </span>
          }
          description="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
        />
      )}
      {!agreements.length && (
        <Alert
          severity={
            isInSimulator && !canContinueSimulationIfNoAgreement
              ? "error"
              : "warning"
          }
          title={
            <>
              Aucune convention collective n&apos;a été déclarée pour
              l&apos;entreprise
            </>
          }
          description={
            isInSimulator ? (
              <>
                {canContinueSimulationIfNoAgreement ? (
                  <span>
                    Vous pouvez tout de même poursuivre pour obtenir les
                    informations générales prévues par le code du travail.
                  </span>
                ) : (
                  <span>
                    Impossible de poursuivre la simulation sans convention
                    collective.
                  </span>
                )}
              </>
            ) : undefined
          }
        />
      )}
    </>
  );
};
