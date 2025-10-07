import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { PublicodesInformation } from "src/modules/outils/indemnite-depart/steps/Informations/store";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { sanitizePublicodesValue } from "src/modules/outils/common/publicodes";

type Props = {
  isSeriousMisconduct?: boolean;
  isDisabledWorker?: boolean;
  seniority?: string;
  situations: Array<PublicodesInformation>;
  agreement?: Agreement;
};

const Situation: React.FC<Props> = ({
  situations,
  agreement,
  isDisabledWorker,
  seniority,
  isSeriousMisconduct,
}) => {
  return (
    <>
      <h4 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h4>
      <ul>
        {seniority && (
          <li data-testid="situation-seniority">
            Ancienneté selon le code du travail :{" "}
            <strong>{sanitizePublicodesValue(seniority)}</strong>
          </li>
        )}
        <li data-testid="situation-serious-misconduct">
          Licenciement pour faute grave :{" "}
          <strong>{isSeriousMisconduct ? "Oui" : "Non"}</strong>
        </li>
        {isDisabledWorker && (
          <li data-testid="situation-disabled-worker">
            Reconnu en tant que travailleur handicapé : <strong>Oui</strong>
          </li>
        )}
        <li data-testid="situation-convention-collective">
          Convention collective :{" "}
          <strong>
            {agreement
              ? `${agreement.shortTitle} (IDCC ${agreement.num})`
              : "Code du travail"}
          </strong>
        </li>
        {situations.map((info, index) => {
          const sanitized = sanitizePublicodesValue(info.info);
          return (
            <li
              key={`situation-${info.question.rule.titre}-${index}`}
              data-testid={`situation-${info.question.rule.titre?.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {info.question.rule.titre}&nbsp;:&nbsp;
              <strong>{sanitized}</strong>
              {info.question.rule.unité && (
                <span>&nbsp;{info.question.rule.unité}</span>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Situation;
