import { Paragraph, Text } from "@socialgouv/cdtn-ui";
import { supportedCcn } from "@socialgouv/modeles-social";
import { AgreementInfo } from "@socialgouv/modeles-social/bin/internal/ExtractSupportedCc";
import React from "react";

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
        {result.value} {result.unit}
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
  if (detail?.status === AgreementStatus.Supported) {
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

export enum AgreementStatus {
  Supported = "Supported",
  Planned = "Planned",
  NotSupported = "NotSupported",
}

type Agreement = {
  status: AgreementStatus;
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
  agreementResult: PublicodesResult | null,
  supportedCcn: AgreementInfo[]
): RootData => {
  let agreement: Agreement | null = null;
  if (data.ccn) {
    const agreementFound = supportedCcn.find(
      (item) => item.idcc === data.ccn.num
    );
    agreement = {
      notice: agreementResult?.valueInDays ?? 0,
      status: agreementFound
        ? agreementFound.preavisRetraite
          ? AgreementStatus.Supported
          : AgreementStatus.Planned
        : AgreementStatus.NotSupported,
    };
  }
  let noticeUsed = NoticeUsed.none;
  if (
    (legalResult.valueInDays > 0 &&
      legalResult.valueInDays === agreementResult?.valueInDays) ??
    -1
  ) {
    noticeUsed = NoticeUsed.same;
  } else if (
    result.valueInDays > 0 &&
    result.valueInDays === legalResult.valueInDays
  ) {
    noticeUsed = NoticeUsed.legal;
  } else if (
    result.valueInDays > 0 &&
    result.valueInDays === agreementResult.valueInDays
  ) {
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
        data.agreement?.status === AgreementStatus.Supported:
        return "Pour un salarié ayant une ancienneté inférieure à 6 mois, ni le code du travail ni la convention collective sélectionnée ne prévoit de préavis à respecter.";
      case data.noticeUsed === NoticeUsed.agreementLabor &&
        data.agreement?.status === AgreementStatus.Supported:
        return "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois mais il renvoie à la convention ou l'accord collectif de travail ou, à défaut, aux usages pratiqués dans la localité et la profession. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective.";
    }
    return null;
  }

  if (data.agreement === null) {
    return "La convention collective n’ayant pas été renseignée, la durée de préavis affichée correspond à la durée légale.";
  } else if (data.agreement.status === AgreementStatus.Planned) {
    return "La convention collective n’ayant pas été traitée pour le moment par nos services, la durée de préavis affichée correspond à la durée légale.";
  } else if (data.agreement.status === AgreementStatus.NotSupported) {
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
    "contrat salarié . préavis de retraite légale en jours"
  );
  let agreementResult = null;
  if (data.ccn) {
    agreementResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective en jours"
    );
  }

  const rootData = createRootData(
    data,
    publicodesContext.result,
    legalResult,
    agreementResult,
    supportedCcn
  );
  const description = getDescription(rootData);
  return (
    <>
      <SectionTitle>Le résultat décrypté</SectionTitle>
      <Paragraph>
        Durée prévue par le code du travail (durée légale)&nbsp;:&nbsp;
        <ShowResult result={legalResult} />
      </Paragraph>
      <Paragraph>
        Durée prévue par la convention collective (durée
        conventionnelle)&nbsp;:&nbsp;
        <ShowResultAgreement
          result={agreementResult}
          detail={rootData.agreement}
        />
      </Paragraph>
      {description && <Paragraph>{description}</Paragraph>}
    </>
  );
};

export default DecryptedResult;
