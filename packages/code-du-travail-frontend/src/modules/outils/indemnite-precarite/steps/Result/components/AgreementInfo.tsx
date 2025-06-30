import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Agreement = {
  title: string;
  num: number;
};

type Props = {
  agreement?: Agreement;
  isAgreementSupported: boolean;
};

const AgreementInfo: React.FC<Props> = ({
  agreement,
  isAgreementSupported,
}) => {
  if (!agreement) return null;

  return (
    <div className={fr.cx("fr-card", "fr-mb-3w")}>
      <div className={fr.cx("fr-card__body")}>
        <h3 className={fr.cx("fr-card__title")}>
          Convention collective appliquée
        </h3>
        <p>
          <strong>{agreement.title}</strong> (IDCC {agreement.num})
        </p>
        {isAgreementSupported && (
          <p className={fr.cx("fr-text--sm")}>
            Cette convention collective prévoit des dispositions particulières
            pour le calcul de l&apos;indemnité.
          </p>
        )}
      </div>
    </div>
  );
};

export default AgreementInfo;
