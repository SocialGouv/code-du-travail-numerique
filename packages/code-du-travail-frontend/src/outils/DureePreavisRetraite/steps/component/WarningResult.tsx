import { supportedCcn as retraiteData } from "@socialgouv/modeles-social";
import React from "react";

import Disclaimer from "../../../common/Disclaimer";
import { SmallText } from "../../../common/stepStyles";
import { FormContent } from "../../../common/type/WizardType";
import { PublicodesContextInterface } from "../../../publicodes";

type Props = {
  publicodesContext: PublicodesContextInterface;
  data: FormContent;
};
const title = "Attention il peut exister une durée plus favorable";

const WarningResult: React.FC<Props> = ({ publicodesContext, data }) => {
  const isSupported = React.useMemo(() => {
    if (data && data.ccn) {
      const idccInfo = retraiteData.find((item) => item.idcc == data.ccn.num);
      return !!(idccInfo && idccInfo.preavisRetraite);
    }
    return false;
  }, [data]);
  if (publicodesContext.result.value === 0) {
    if (isSupported) {
      return (
        <Disclaimer
          title={"Attention il peut quand même exister une durée de préavis"}
        >
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
        <Disclaimer
          title={"Attention il peut quand même exister une durée de préavis"}
        >
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
  const type =
    data["contrat salarié - mise à la retraite"] === "oui" ? "mise" : "depart";

  if (type === "depart") {
    if (isSupported) {
      return (
        <Disclaimer title={title}>
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
        <Disclaimer
          title={"Attention il peut quand même exister une durée de préavis"}
        >
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
      <Disclaimer title={title}>
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
      <Disclaimer
        title={"Attention il peut quand même exister une durée de préavis"}
      >
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
