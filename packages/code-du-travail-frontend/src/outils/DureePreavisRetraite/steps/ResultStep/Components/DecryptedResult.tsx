import { Paragraph } from "@socialgouv/cdtn-ui";
import { AgreementInfo, supportedCcn } from "@socialgouv/modeles-social";
import React from "react";

import { SectionTitle } from "../../../../common/stepStyles";
import { FormContent } from "../../../../common/type/WizardType";
import {
  PublicodesPreavisRetraiteResult,
  PublicodesResult,
  usePublicodes,
} from "../../../../publicodes";

type Props = {
  data: FormContent;
};

const ShowResult: React.FC<{
  result: PublicodesPreavisRetraiteResult;
  agreementMaximumResult: PublicodesPreavisRetraiteResult | null;
}> = ({ result, agreementMaximumResult }) => {
  if (result.value > 0) {
    return (
      <strong>
        {agreementMaximumResult?.value &&
        agreementMaximumResult?.value !== result.value ? (
          <>
            entre&nbsp;{result.value}&nbsp;{result.unit}&nbsp;et&nbsp;
            {agreementMaximumResult.value}&nbsp;{agreementMaximumResult.unit}
          </>
        ) : (
          <>
            {result.value} {result.unit}
          </>
        )}
      </strong>
    );
  }
  return <strong>pas de préavis</strong>;
};

const ShowResultAgreement: React.FC<{
  result: PublicodesPreavisRetraiteResult | null;
  detail: Agreement | null;
  agreementMaximumResult: PublicodesPreavisRetraiteResult | null;
}> = ({ result, detail, agreementMaximumResult }) => {
  if (!result) {
    return <strong>convention collective non renseignée</strong>;
  }
  if (result?.value > 0) {
    return (
      <ShowResult
        result={result}
        agreementMaximumResult={agreementMaximumResult}
      />
    );
  }
  if (detail?.status === AgreementStatus.Supported) {
    return <strong>pas de préavis</strong>;
  }
  return <strong>convention collective non traitée</strong>;
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
  agreement: Agreement | null;
  handicap: boolean;
  isVoluntary: boolean;
  noticeUsed: NoticeUsed;
  seniorityLessThan6Months: boolean;
};

export const createRootData = (
  data: FormContent,
  result: PublicodesPreavisRetraiteResult,
  legalResult: PublicodesPreavisRetraiteResult,
  agreementResult: PublicodesPreavisRetraiteResult | null,
  supportedCcn: AgreementInfo[]
): RootData => {
  let agreement: Agreement | null = null;
  if (data.ccn?.selected) {
    const agreementFound = supportedCcn.find(
      (item) => item.idcc === data.ccn?.selected?.num
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
    result.valueInDays === agreementResult?.valueInDays
  ) {
    noticeUsed = NoticeUsed.agreementLabor;
  }
  return {
    agreement: agreement,
    handicap:
      data.infos !== undefined &&
      data.infos["contrat salarié - travailleur handicapé"] === "oui",
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
        return "Le code du travail ne prévoit pas de durée de préavis pour une ancienneté inférieure à 6 mois. La durée à appliquer pour le salarié est donc la durée prévue par la convention collective.";
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
      case NoticeUsed.none:
        return null;
    }
  }
};

const DecryptedResult: React.FC<Props> = ({ data }) => {
  const publicodesContext = usePublicodes<PublicodesPreavisRetraiteResult>();
  const legalResult = publicodesContext.execute(
    "contrat salarié . préavis de retraite légale en jours"
  );
  let agreementResult: PublicodesResult | null = null;
  let agreementMaximumResult: PublicodesResult | null = null;
  if (data.ccn) {
    agreementResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective en jours"
    );
    agreementMaximumResult = publicodesContext.execute(
      "contrat salarié . préavis de retraite collective maximum en jours"
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
        <ShowResult
          result={legalResult}
          agreementMaximumResult={agreementMaximumResult}
        />
      </Paragraph>
      <Paragraph>
        Durée prévue par la convention collective (durée
        conventionnelle)&nbsp;:&nbsp;
        <ShowResultAgreement
          result={agreementResult}
          detail={rootData.agreement}
          agreementMaximumResult={agreementMaximumResult}
        />
      </Paragraph>
      {description && <Paragraph>{description}</Paragraph>}
      {rootData.handicap && (
        <Paragraph>
          <i>
            Ce résultat tient compte de la majoration pour les travailleurs
            handicapés.
          </i>
        </Paragraph>
      )}
    </>
  );
};

export default DecryptedResult;
