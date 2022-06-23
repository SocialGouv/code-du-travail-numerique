import React from "react";

import Disclaimer from "../../../../common/Disclaimer";
import { SmallText } from "../../../../common/stepStyles";
import { WarningType } from "../Step";

type Props = {
  type: WarningType | null;
  hasNotice: boolean;
};

export const titreFavorable =
  "Attention il peut exister une durée plus favorable";

export const titrePreavis =
  "Attention il peut quand même exister une durée de préavis";

const WarningResult: React.FC<Props> = ({ type, hasNotice }) => {
  return (
    <Disclaimer title={hasNotice ? titreFavorable : titrePreavis}>
      {type === WarningType.noNoticeWithAgreement ? (
        <>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis. Dans ce cas, cette durée doit
            s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </>
      ) : type === WarningType.noNoticeWithoutAgreement ? (
        <>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis. Dans ce cas, cette durée doit s’appliquer.
          </p>
          <p>Nous vous conseillons de vérifiez cela.</p>
        </>
      ) : type === WarningType.departWithAgreement ? (
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
      ) : type === WarningType.miseWithAgreement ? (
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
      ) : type === WarningType.departWithoutAgreement ? (
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
      ) : type === WarningType.miseWithoutAgreement ? (
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
      ) : type === WarningType.miseWithoutCollectiveAgreement ? (
        <>
          <p>
            Le contrat de travail ou un usage peut prévoir une durée de préavis
            <sup>*</sup> ou une condition d’ancienneté<sup>*</sup> plus
            favorable pour le salarié. Dans ce cas, c’est cette durée ou cette
            ancienneté plus favorable qui s’applique au salarié.
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
      ) : type === WarningType.departWithoutCollectiveAgreement ? (
        <>
          <p>
            Le contrat de travail ou un usage peut prévoir une durée de préavis
            <sup>*</sup> ou une condition d’ancienneté<sup>*</sup> plus
            favorable pour le salarié. Dans ce cas, c’est cette durée ou cette
            ancienneté plus favorable qui s’applique au salarié.
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
      ) : null}
    </Disclaimer>
  );
};

export default WarningResult;
