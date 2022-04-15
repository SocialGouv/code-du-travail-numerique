import { supportedCcn } from "@socialgouv/modeles-social";
import React from "react";

import Disclaimer from "../../../../common/Disclaimer";
import { SmallText } from "../../../../common/stepStyles";

type Props = {
  resultValueInDays?: number;
  ccNumber?: number;
  type: "départ" | "mise";
};
export const titreFavorable =
  "Attention il peut exister une durée plus favorable";

export const titrePreavis =
  "Attention il peut quand même exister une durée de préavis";

export enum StatusCcn {
  CCN_SUPPORTED = "CCN_SUPPORTED",
  CCN_UNSUPPORTED = "CCN_UNSUPPORTED",
  CC_UNSELECTED = "CC_UNSELECTED",
}

const WarningResult: React.FC<Props> = ({
  resultValueInDays,
  ccNumber,
  type,
}) => {
  const statusCcn: StatusCcn = React.useMemo(() => {
    const idccInfo = supportedCcn.find((item) => item.idcc == ccNumber);
    const isPreavisRetraite = !!(idccInfo && idccInfo.preavisRetraite);
    return ccNumber && isPreavisRetraite
      ? StatusCcn.CCN_SUPPORTED
      : ccNumber && !isPreavisRetraite
      ? StatusCcn.CCN_UNSUPPORTED
      : StatusCcn.CC_UNSELECTED;
  }, [ccNumber]);

  return (
    <Disclaimer title={resultValueInDays === 0 ? titrePreavis : titreFavorable}>
      {resultValueInDays === 0 && statusCcn === StatusCcn.CCN_SUPPORTED ? (
        <>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis. Dans ce cas, cette durée doit
            s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </>
      ) : resultValueInDays === 0 &&
        (statusCcn === StatusCcn.CC_UNSELECTED ||
          statusCcn === StatusCcn.CCN_UNSUPPORTED) ? (
        <>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis. Dans ce cas, cette durée doit s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </>
      ) : type === "départ" && statusCcn === StatusCcn.CCN_SUPPORTED ? (
        <>
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
        </>
      ) : type === "mise" && statusCcn === StatusCcn.CCN_SUPPORTED ? (
        <>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis<sup>*</sup> ou une condition
            d’ancienneté<sup>*</sup> plus favorable pour le salarié. Dans ce
            cas, c’est cette durée ou cette ancienneté plus favorable qui
            s’applique au salarié.
          </p>

          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus longue.
          </SmallText>
          <SmallText>
            <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
            salarié = condition d’ancienneté moins restrictive et conduisant à
            une durée de préavis plus longue.
          </SmallText>
        </>
      ) : type === "départ" &&
        (statusCcn === StatusCcn.CC_UNSELECTED ||
          statusCcn === StatusCcn.CCN_UNSUPPORTED) ? (
        <>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis<sup>*</sup> ou une condition d’ancienneté
            <sup>*</sup> plus favorable pour le salarié. Dans ce cas, c’est
            cette durée ou cette ancienneté plus favorable qui s’applique au
            salarié.
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
        </>
      ) : type === "mise" &&
        (statusCcn === StatusCcn.CC_UNSELECTED ||
          statusCcn === StatusCcn.CCN_UNSUPPORTED) ? (
        <>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis<sup>*</sup> ou une condition d’ancienneté
            <sup>*</sup> plus favorable pour le salarié. Dans ce cas, c’est
            cette durée ou cette ancienneté plus favorable qui s’applique au
            salarié.
          </p>

          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus longue.
          </SmallText>
          <SmallText>
            <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
            salarié = condition d’ancienneté moins restrictive et conduisant à
            une durée de préavis plus longue.
          </SmallText>
        </>
      ) : null}
    </Disclaimer>
  );
};

export default WarningResult;
