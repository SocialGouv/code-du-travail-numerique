import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { AgreementInformation } from "src/modules/outils/indemnite-depart/common";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { publicodesUnitTranslator } from "src/modules/outils/common/publicodes";
import { sanitizePublicodesValue } from "src/modules/outils/common/publicodes";

type Props = {
  situations: AgreementInformation[];
  agreement?: Agreement;
};

const Situation: React.FC<Props> = ({ situations, agreement }) => {
  return (
    <>
      <h4 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h4>
      <ul>
        <li data-testid="situation-convention-collective">
          Convention collective :{" "}
          <strong>
            {agreement
              ? `${agreement.shortTitle} (IDCC ${agreement.num})`
              : "Code du travail"}
          </strong>
        </li>
        {situations.map((info, index) => {
          const sanitized = sanitizePublicodesValue(info.value);
          return (
            <li
              key={"agreement-" + index}
              data-testid={`situation-${info.label}`}
            >
              {info.label}&nbsp;:&nbsp;
              <strong>{sanitized}</strong>
              &nbsp;
              {publicodesUnitTranslator(sanitized, info.unit)}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Situation;
