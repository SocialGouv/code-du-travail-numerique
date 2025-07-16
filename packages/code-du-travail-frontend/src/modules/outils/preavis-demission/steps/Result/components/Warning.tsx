import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

const Warning = () => {
  return (
    <div className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}>
      <h3 className={fr.cx("fr-alert__title")}>
        Attention il peut exister une autre durée de préavis
      </h3>
      <p>
        L&apos;existence ou la durée du préavis de démission peut être prévue
        par un accord d&apos;entreprise ou à défaut, par un usage dans
        l&apos;entreprise.
      </p>
    </div>
  );
};

export default Warning;
