import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "../utils/types";

type Props = {
  agreement?: Agreement;
};

const Warning: React.FC<Props> = ({ agreement }) => {
  return (
    <div className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}>
      <h3 className={fr.cx("fr-alert__title")}>
        Attention il peut exister une durée plus favorable
      </h3>
      <p>
        Une durée de préavis de licenciement ou une condition d&apos;ancienneté
        plus favorable au salarié peut être prévue par une convention
        collective, un accord de branche, un accord d&apos;entreprise ou le
        contrat de travail ou les usages.
      </p>
      {agreement && (
        <p className={fr.cx("fr-mb-0")}>
          <strong>Convention collective :</strong> {agreement.shortTitle}
        </p>
      )}
    </div>
  );
};

export default Warning;
