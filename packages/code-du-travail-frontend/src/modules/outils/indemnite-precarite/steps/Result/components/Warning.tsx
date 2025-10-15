import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

type Agreement = {
  title: string;
  num: number;
};

type Props = {
  agreement?: Agreement;
  isAgreementSupported: boolean;
};

const Warning: React.FC<Props> = ({ agreement, isAgreementSupported }) => {
  return (
    <div
      className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}
      data-testid="warning-alert"
    >
      <h4 className={fr.cx("fr-alert__title")} data-testid="warning-title">
        Attention il peut exister un montant plus favorable
      </h4>
      <p>
        {agreement && agreement.num > 0 ? (
          <>
            Un accord d&apos;entreprise peut prévoir un montant différent
            qu&apos;il soit plus élevé ou plus faible. Dans ce cas,
            s&apos;applique le montant prévu par l&apos;accord
            d&apos;entreprise, sauf si le contrat de travail prévoit un montant
            plus favorable pour le salarié.
            {!isAgreementSupported && (
              <>
                {" "}
                Attention, dans le cas où l&apos;accord d&apos;entreprise
                prévoit un taux inférieur à 10% dans la limite de 6%, il doit y
                avoir des contreparties offertes au salarié, notamment sous la
                forme d&apos;un accès privilégié à la formation professionnelle
                (action de formation, bilan de compétences).
              </>
            )}
          </>
        ) : (
          <>
            Une convention collective de branche étendue ou un accord
            d&apos;entreprise peut prévoir un montant différent qu&apos;il soit
            plus élevé ou plus faible que celui prévu par le code du travail.
            Attention, dans le cas où la convention ou l&apos;accord collectif
            prévoit un taux inférieur à 10% dans la limite de 6%, il doit y
            avoir des contreparties offertes au salarié, notamment sous la forme
            d&apos;un accès privilégié à la formation professionnelle (action de
            formation, bilan de compétences). Dans tous les cas, le contrat de
            travail peut prévoir un montant plus favorable pour le salarié. Il
            faut alors appliquer ce montant.
          </>
        )}
      </p>
    </div>
  );
};

export default Warning;
