import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { AgreementInformation } from "src/modules/outils/indemnite-depart/common";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { publicodesUnitTranslator } from "src/modules/outils/common/publicodes";

type Props = {
  situations: AgreementInformation[];
  agreement?: Agreement;
};

const Situation: React.FC<Props> = ({ situations, agreement }) => {
  return (
    <>
      <h3 className={fr.cx("fr-h5", "fr-mb-0")}>Les éléments saisis</h3>
      <ul>
        <li data-testid="situation-convention-collective">
          Convention collective :{" "}
          <strong>
            {agreement
              ? `${agreement.shortTitle} (IDCC ${agreement.num})`
              : "Code du travail"}
          </strong>
        </li>
        {situations.map((info, index) => (
          <li
            key={"agreement-" + index}
            data-testid={`situation-${info.label}`}
          >
            {info.label}&nbsp;:&nbsp;
            <strong>{info.value.replace(/^'|'$/g, "")}</strong>
            &nbsp;
            {publicodesUnitTranslator(
              info.value.replace(/&apos;/g, ""),
              info.unit
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Situation;
