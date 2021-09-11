import { Text, theme } from "@socialgouv/cdtn-ui";
import { supportedCcn } from "@socialgouv/modeles-social/lib/constants";
import React from "react";
import styled from "styled-components";

import { SectionTitle } from "../../../common/stepStyles";
import { FormContent } from "../../../common/type/WizardType";
import {
  PublicodesContextInterface,
  PublicodesResult,
} from "../../../publicodes";

type Props = {
  data: FormContent;
  publicodesContext: PublicodesContextInterface;
};

const ShowResult: React.FC<{ result: PublicodesResult }> = ({ result }) => {
  if (result.value > 0) {
    return (
      <b>
        {result.value} {result.unit.numerators[0]}
      </b>
    );
  }
  return <b>pas de préavis</b>;
};

const ShowResultAgreement: React.FC<{
  result: PublicodesResult | null;
  detail: Agreement | null;
}> = ({ result, detail }) => {
  if (!result) {
    return <b>convention collective non renseignée</b>;
  }
  if (result && result.value > 0) {
    return <ShowResult result={result} />;
  }
  if (detail?.isSupported) {
    return <b>pas de préavis</b>;
  }
  return <b>convention collective non traitée</b>;
};

export enum NoticeUsed {
  legal = "Legal",
  agreementLabor = "agreementLabor",
  same = "same",
  none = "none",
}

type Agreement = {
  isSupported: boolean;
  notice: number;
};

type RootData = {
  isVoluntary: boolean;
  agreement: Agreement | null;
  noticeUsed: NoticeUsed;
  seniorityLessThan6Months: boolean;
};

export const createRootData = (
  data: FormContent,
  result: PublicodesResult,
  legalResult: PublicodesResult,
  agreementResult: PublicodesResult | null
): RootData => {
  let agreement = null;
  if (data.ccn) {
    if (supportedCcn.includes(data.ccn.num)) {
      agreement = { isSupported: true, notice: agreementResult.value };
    } else {
      agreement = {
        isSupported: false,
        notice: agreementResult?.value ?? 0,
      };
    }
  }
  let noticeUsed = NoticeUsed.none;
  if (
    (legalResult.value > 0 && legalResult.value === agreementResult?.value) ??
    -1
  ) {
    noticeUsed = NoticeUsed.same;
  } else if (result.value > 0 && result.value === legalResult.value) {
    noticeUsed = NoticeUsed.legal;
  } else if (result.value > 0 && result.value === agreementResult.value) {
    noticeUsed = NoticeUsed.agreementLabor;
  }
  return {
    agreement: agreement,
    isVoluntary: data["contrat salarié - mise à la retraite"] === "non",
    noticeUsed,
    seniorityLessThan6Months: Number(data["contrat salarié - ancienneté"]) < 6,
  };
};

export const getDescription = (data: RootData): string | null => {
  if (data.seniorityLessThan6Months) {
    switch (true) {
      case data.noticeUsed === NoticeUsed.none && data.agreement === null:
        return "Le salarié ayant une ancienneté inférieure à 6 mois, il n’y a pas de préavis à respecter.";
      case data.noticeUsed === NoticeUsed.none &&
        data.agreement?.isSupported === true:
        return "Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter.";
      case data.noticeUsed === NoticeUsed.agreementLabor &&
        data.agreement?.isSupported === true:
        return "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective.";
    }
    return null;
  }

  if (data.agreement === null) {
    return "La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale.";
  } else if (!data.agreement.isSupported) {
    return "La convention collective n’ayant pas été traitée par nos services, la durée de préavis affichée correspond à la durée légale.";
  } else {
    switch (data.noticeUsed) {
      case NoticeUsed.legal:
        if (data.agreement.notice > 0) {
          return `La durée à appliquer pour le salarié est donc la durée légale, celle-ci étant plus ${
            data.isVoluntary ? "courte" : "longue"
          } que la durée prévue par la convention collective.`;
        } else {
          return "En l’absence de durée prévue par la convention collective, la durée de préavis à appliquer pour le salarié est donc la durée légale.";
        }
      case NoticeUsed.agreementLabor:
        return `La durée à appliquer pour le salarié est donc la durée prévue par la convention collective, celle-ci étant plus ${
          data.isVoluntary ? "courte" : "longue"
        } que la durée légale.`;
      case NoticeUsed.same:
        return "Le résultat correspond à la fois à la durée prévue par le code du travail et à la fois à la durée prévue par la convention collective, celles-ci étant identiques dans cette situation.";
      case NoticeUsed.none:
        return null;
    }
  }
  return null;
};

const DecryptedResult: React.FC<Props> = ({ data, publicodesContext }) => {
  const legalResult = publicodesContext.execute(
    "contrat salarié . préavis de retraite légale"
  );
  let agreementResult = null;
  if (data.ccn) {
    agreementResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective"
    );
  }

  const rootData = createRootData(
    data,
    publicodesContext.result,
    legalResult,
    agreementResult
  );
  const description = getDescription(rootData);
  return (
    <>
      <SectionTitle>Le résultat décrypté</SectionTitle>
      <Text>
        Durée prévue par le code du travail (durée légale)&nbsp;:&nbsp;
        <ShowResult result={legalResult} />
      </Text>
      <br />
      <Text>
        Durée prévue par la convention collective (durée
        conventionnelle)&nbsp;:&nbsp;
        <ShowResultAgreement
          result={agreementResult}
          detail={rootData.agreement}
        />
      </Text>
      {description && (
        <TextInformation>
          <Text variant="secondary">{description}</Text>
        </TextInformation>
      )}
    </>
  );
};

const { spacings } = theme;

const TextInformation = styled.p`
  margin-top: ${spacings.small};
`;
export default DecryptedResult;
