import { fr } from "@codegouvfr/react-dsfr";
import { ExplanationMainResult } from "@socialgouv/modeles-social";
import React from "react";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { getWarningMessage } from "../utils/getWarningLogic";

type Props = {
  ccn?: Agreement;
  resultExplanation?: ExplanationMainResult;
};

const Warning: React.FC<Props> = ({ ccn, resultExplanation }) => {
  return (
    <div className={fr.cx("fr-mt-4w", "fr-alert", "fr-alert--info")}>
      <h4 className={fr.cx("fr-alert__title")}>
        Attention il peut exister une durée plus favorable
      </h4>
      <p>
        {getWarningMessage({
          ccn,
          resultExplanation,
        })}
      </p>
    </div>
  );
};

export default Warning;
