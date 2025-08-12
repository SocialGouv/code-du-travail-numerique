import { fr } from "@codegouvfr/react-dsfr";
import React from "react";

type Props = {
  isResultValid?: boolean;
};

const Warning = (props: Props) => {
  return (
    <div className={fr.cx("fr-alert", "fr-alert--info")}>
      <h4 className={fr.cx("fr-alert__title")}>
        Attention il peut exister une durée plus favorable
      </h4>
      <div>
        {props.isResultValid ? (
          <p>
            Si un accord d&apos;entreprise ou à défaut un usage dans la
            profession ou l&apos;entreprise plus récent prévoit des heures
            d&apos;absence autorisée pour rechercher un emploi pendant le
            préavis, le salarié en bénéficie si ces mesures sont plus favorables
            que la convention collective.
          </p>
        ) : (
          <p>
            Un accord d&apos;entreprise ou à défaut un usage dans la profession
            ou l&apos;entreprise peut prévoir que le salarié bénéficie
            d&apos;heures d&apos;absence autorisée pour rechercher un emploi
            pendant le préavis.
          </p>
        )}
      </div>
    </div>
  );
};

export default Warning;
