import { supportedCcn } from "@socialgouv/modeles-social";
import React from "react";

import Disclaimer from "../../../common/Disclaimer";
import { SmallText } from "../../../common/stepStyles";

type Props = {
  resultValueInDays: number | null;
  ccNumber: number | null;
  type: "depart" | "mise" | null;
};
export const titreFavorable =
  "Attention il peut exister une durée plus favorable";

export const titrePreavis =
  "Attention il peut quand même exister une durée de préavis";

const WarningResult: React.FC<Props> = ({
  resultValueInDays,
  ccNumber,
  type,
}) => {
  const isSupported = React.useMemo(() => {
    if (ccNumber) {
      const idccInfo = supportedCcn.find((item) => item.idcc == ccNumber);
      return !!(idccInfo && idccInfo.preavisRetraite);
    }
    return false;
  }, [ccNumber]);
  if (resultValueInDays === 0) {
    if (isSupported) {
      return (
        <Disclaimer title={titrePreavis}>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis. Dans ce cas, cette durée doit
            s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </Disclaimer>
      );
    } else {
      return (
        <Disclaimer title={titrePreavis}>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis. Dans ce cas, cette durée doit s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </Disclaimer>
      );
    }
  }
  if (type === "depart") {
    if (isSupported) {
      return (
        <Disclaimer title={titrePreavis}>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis<sup>*</sup> ou une condition
            d’ancienneté<sup>*</sup> plus favorable pour le salarié. Dans ce
            cas, c’est cette durée ou cette ancienneté plus favorable qui
            s’applique au salarié.
          </p>

          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus courte.
          </SmallText>
          <SmallText>
            <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
            salarié = condition d’ancienneté moins restrictive et conduisant à
            une durée de préavis plus courte.
          </SmallText>
        </Disclaimer>
      );
    } else {
      return (
        <Disclaimer title={titreFavorable}>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis. Dans ce cas, cette durée doit s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </Disclaimer>
      );
    }
  }

  if (isSupported) {
    return (
      <Disclaimer title={titrePreavis}>
        <p>
          Un accord collectif d’entreprise, le contrat de travail ou un usage
          peut prévoir une durée de préavis<sup>*</sup> ou une condition
          d’ancienneté<sup>*</sup> plus favorable pour le salarié. Dans ce cas,
          c’est cette durée ou cette ancienneté plus favorable qui s’applique au
          salarié.
        </p>

        <SmallText>
          <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
          durée plus longue.
        </SmallText>
        <SmallText>
          <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
          salarié = condition d’ancienneté moins restrictive et conduisant à une
          durée de préavis plus longue.
        </SmallText>
      </Disclaimer>
    );
  } else {
    return (
      <Disclaimer title={titreFavorable}>
        <p>
          Une convention collective de branche, un accord collectif
          d’entreprise, le contrat de travail ou un usage peut prévoir une durée
          de préavis. Dans ce cas, cette durée doit s’appliquer.
        </p>
        <p>Nous vous conseillons de vérifiez cela.</p>
      </Disclaimer>
    );
  }
};

export default WarningResult;
