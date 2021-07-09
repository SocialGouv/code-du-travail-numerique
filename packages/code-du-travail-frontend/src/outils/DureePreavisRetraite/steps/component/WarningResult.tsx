import { Alert, icons, IconStripe, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { SmallText } from "../../../common/stepStyles";
import { FormContent } from "../../../common/type/WizardType";
import { PublicodesContextInterface } from "../../../publicodes";

type Props = {
  publicodesContext: PublicodesContextInterface;
  data: FormContent;
};

const WarningResult: React.FC<Props> = ({ publicodesContext, data }) => {
  if (publicodesContext.result.value === 0) {
    if (data.ccn) {
      return (
        <Warning>
          <IconStripe centered icon={icons.Warning}>
            <WarningTitle>
              Attention il peut quand même exister une durée de préavis
            </WarningTitle>
          </IconStripe>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peut prévoir une durée de préavis. Dans ce cas, cette durée doit
            s’appliquer.
            <br />
            Nous vous conseillons de vérifiez cela.
          </p>
        </Warning>
      );
    } else {
      return (
        <Warning>
          <IconStripe centered icon={icons.Warning}>
            <WarningTitle>
              Attention il peut quand même exister une durée de préavis
            </WarningTitle>
          </IconStripe>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis. Dans ce cas, cette durée doit s’appliquer. <br />
            Nous vous conseillons de vérifiez cela.
          </p>
        </Warning>
      );
    }
  }
  const type =
    data["contrat salarié - mise à la retraite"] === "oui" ? "mise" : "depart";

  if (type === "depart") {
    if (data.ccn) {
      return (
        <Warning>
          <IconStripe centered icon={icons.Warning}>
            <WarningTitle>
              Attention il peut exister une durée plus favorable
            </WarningTitle>
          </IconStripe>
          <p>
            Un accord collectif d’entreprise, le contrat de travail ou un usage
            peuvent prévoir une durée de préavis<sup>*</sup> ou encore une
            condition d’ancienneté<sup>*</sup> plus favorable pour le salarié.
            Dans ce cas, c’est cette durée plus favorable ou cette ancienneté
            plus favorable qui s’applique au salarié.
          </p>
          <p>
            <SmallText>
              <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié
              = durée plus courte.
              <br />
              <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
              salarié = condition d’ancienneté moins restrictive et conduisant à
              une durée de préavis plus courte.
            </SmallText>
          </p>
        </Warning>
      );
    } else {
      return (
        <Warning>
          <IconStripe centered icon={icons.Warning}>
            <WarningTitle>
              Attention il peut exister une durée plus favorable
            </WarningTitle>
          </IconStripe>
          <p>
            Une convention collective de branche, un accord collectif
            d’entreprise, le contrat de travail ou un usage peut prévoir une
            durée de préavis<sup>*</sup> ou encore une condition d’ancienneté
            <sup>*</sup> plus favorable pour le salarié. Dans ce cas, c’est
            cette durée plus favorable ou cette ancienneté plus favorable qui
            s’applique au salarié.
          </p>
          <p>
            <SmallText>
              <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié
              = durée plus courte.
              <br />
              <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
              salarié = condition d’ancienneté moins restrictive et conduisant à
              une durée de préavis plus courte.
            </SmallText>
          </p>
        </Warning>
      );
    }
  }

  if (data.ccn) {
    return (
      <Warning>
        <IconStripe centered icon={icons.Warning}>
          <WarningTitle>
            Attention il peut exister une durée plus favorable
          </WarningTitle>
        </IconStripe>
        <p>
          Un accord collectif d’entreprise, le contrat de travail ou un usage
          peuvent prévoir une durée de préavis<sup>*</sup> ou encore une
          condition d’ancienneté<sup>*</sup> plus favorable pour le salarié.
          Dans ce cas, c’est cette durée plus favorable ou cette ancienneté plus
          favorable qui s’applique au salarié.
        </p>
        <p>
          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus longue.
            <br />
            <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
            salarié = condition d’ancienneté moins restrictive et conduisant à
            une durée de préavis plus longue.
          </SmallText>
        </p>
      </Warning>
    );
  } else {
    return (
      <Warning>
        <IconStripe centered icon={icons.Warning}>
          <WarningTitle>
            Attention il peut exister une durée plus favorable
          </WarningTitle>
        </IconStripe>
        <p>
          Une convention collective de branche, un accord collectif
          d’entreprise, le contrat de travail ou un usage peut prévoir une durée
          de préavis<sup>*</sup> ou encore une condition d’ancienneté
          <sup>*</sup> plus favorable pour le salarié. Dans ce cas, c’est cette
          durée plus favorable ou cette ancienneté plus favorable qui s’applique
          au salarié.
        </p>
        <p>
          <SmallText>
            <sup>*</sup>&nbsp;durée de préavis plus favorable pour le salarié =
            durée plus longue.
            <br />
            <sup>*</sup>&nbsp;condition d’ancienneté plus favorable pour le
            salarié = condition d’ancienneté moins restrictive et conduisant à
            une durée de préavis plus longue.
          </SmallText>
        </p>
      </Warning>
    );
  }
};

const { fonts, spacings } = theme;

export const Warning = styled(Alert)`
  margin-top: ${spacings.large};
`;

export const WarningTitle = styled.span`
  color: ${({ theme }) => theme.altText};
  font-weight: 600;
  font-size: ${fonts.sizes.headings.small};
  font-family: "Open Sans", sans-serif;
`;

export default WarningResult;
