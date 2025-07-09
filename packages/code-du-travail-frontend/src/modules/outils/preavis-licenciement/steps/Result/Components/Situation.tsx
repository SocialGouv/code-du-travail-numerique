import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Agreement } from "../utils/types";

type SituationItem = {
  label: string;
  value: string;
  unit?: string;
};

type Props = {
  situations: SituationItem[];
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
            key={`situation-${info.label}-${index}`}
            data-testid={`situation-${info.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {info.label}&nbsp;:&nbsp;
            <strong>{info.value.replace(/^'|'$/g, "")}</strong>
            {info.unit && <span>&nbsp;{info.unit}</span>}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Situation;
