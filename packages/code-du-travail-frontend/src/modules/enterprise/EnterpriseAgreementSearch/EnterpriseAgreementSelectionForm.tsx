"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise } from "../types";
import RadioButtons from "@codegouvfr/react-dsfr/RadioButtons";
import { EnterpriseAgreementSelectionDetail } from "./EnterpriseAgreementSelectionDetail";
import { getEnterpriseAgreements } from "./utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useEffect, useRef, useState } from "react";
import { useEnterpriseAgreementSearchTracking } from "./tracking";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  goBack: () => void;
  onAgreementSelect?: (agreement: Agreement) => void;
  trackingActionName: string;
};

export const EnterpriseAgreementSelectionForm = ({
  enterprise,
  goBack,
  onAgreementSelect,
  trackingActionName,
}: Props) => {
  const { emitSelectEnterpriseAgreementEvent } =
    useEnterpriseAgreementSearchTracking();
  const [agreement, setAgreement] = useState<Agreement | undefined>();
  const agreements = getEnterpriseAgreements(enterprise.conventions);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    resultRef.current?.focus();
  }, []);
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
                    emitSelectEnterpriseAgreementEvent(
                      `idcc${agreement.id}`,
                      trackingActionName
                    );
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
            <>
              <span tabIndex={-1} ref={resultRef}>
                Nous n&apos;avons pas de réponse pour cette convention
                collective
              </span>
            </>
          }
          description="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
        />
      )}
      {!agreements.length && (
        <Alert
          severity="info"
          title={
            <>
              <span tabIndex={-1} ref={resultRef}>
                Aucune convention collective n&apos;a été déclarée pour
                l&apos;entreprise
              </span>
            </>
          }
          description="Vous pouvez tout de même poursuivre pour obtenir les informations générales prévues par le code du travail."
        />
      )}
    </>
  );
};
