import React from "react";

import CCSearchInfo from "../../common/CCSearchInfo";
import { isNotNearZero } from "../../common/math";
import { Agreement } from "../../common/type/WizardType";

type Props = {
  durationCC: number;
  durationCDT: string;
  ccn: Agreement;
};

const DisclaimerText: React.FC<Props> = ({ durationCC, durationCDT, ccn }) => {
  if (durationCC === undefined) {
    if (parseInt(durationCDT, 10) === 0) {
      return (
        <>
          <p>
            L’existence et la durée du préavis de licenciement peuvent être
            prévues dans la convention collective, un accord d’entreprise ou à
            défaut par un usage dans l’entreprise.
          </p>
          <CCSearchInfo ccn={ccn} />
        </>
      );
    } else {
      return (
        <>
          <p>
            Une durée de préavis de licenciement ou une condition d’ancienneté
            plus favorable au salarié peut être prévue par une convention
            collective, un accord de branche, un accord d’entreprise ou le
            contrat de travail ou les usages.
          </p>
          <CCSearchInfo ccn={ccn} />
        </>
      );
    }
  } else {
    if (isNotNearZero(durationCDT)) {
      return (
        <p>
          Une durée de préavis de licenciement ou une condition d’ancienneté
          plus favorable au salarié que ce que prévoit le code du travail peut
          être prévue par la loi pour certains cas particuliers, par un accord
          d’entreprise, le contrat de travail ou les usages.
        </p>
      );
    } else if (isNotNearZero(durationCC)) {
      return (
        <p>
          L’existence ou la durée du préavis de licenciement peut aussi être
          prévue dans un accord d’entreprise ou à défaut par un usage dans
          l’entreprise.
        </p>
      );
    } else {
      // both cc and legal === 0
      return (
        <p>
          L’existence ou la durée du préavis de licenciement peut être prévue,
          par la loi pour certains cas particuliers, par un accord d’entreprise
          ou à défaut par un usage dans l’entreprise.
        </p>
      );
    }
  }
};

export default DisclaimerText;
