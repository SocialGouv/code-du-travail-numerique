import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";

type Props = {
  isAgreementSupported: boolean;
  agreement?: Agreement;
};

const Warning: React.FC<Props> = ({ isAgreementSupported, agreement }) => {
  if (!isAgreementSupported && agreement) {
    return (
      <div className={fr.cx("fr-mt-4w")}>
        <h3 className={fr.cx("fr-h5")}>
          Attention il peut exister une autre durée de préavis
        </h3>
        <p>
          L&apos;existence ou la durée du préavis de démission peut être prévue
          par un accord d&apos;entreprise ou à défaut, par un usage dans
          l&apos;entreprise.
        </p>
      </div>
    );
  }

  return null;
};

export default Warning;
