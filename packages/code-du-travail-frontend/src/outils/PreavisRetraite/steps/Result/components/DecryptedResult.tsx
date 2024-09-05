import { Paragraph } from "@socialgouv/cdtn-ui";
import { PublicodesPreavisRetraiteResult } from "@socialgouv/modeles-social";
import React from "react";
import { SectionTitle } from "../../../../common/stepStyles";
import { getDescription } from "../utils/getDescription";
import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { NoticeUsed } from "../utils/types";
import { AgreementRoute } from "../../../../common/type/WizardType";

type Props = {
  legalResult?: PublicodesPreavisRetraiteResult;
  agreementResult?: PublicodesPreavisRetraiteResult;
  agreementMaximumResult?: PublicodesPreavisRetraiteResult;
  hasHandicap: boolean;
  typeDeDepart: DepartOuMiseRetraite;
  noticeUsed: NoticeUsed;
  isSeniorityLessThan6Months: boolean;
  hasAgreement: boolean;
  isAgreementSupported: boolean;
  agreementRoute?: AgreementRoute;
};

const DecryptedResult: React.FC<Props> = ({
  hasHandicap,
  legalResult,
  agreementMaximumResult,
  typeDeDepart,
  noticeUsed,
  isSeniorityLessThan6Months,
  hasAgreement,
  isAgreementSupported,
  agreementResult,
  agreementRoute,
}) => {
  const description = getDescription(
    typeDeDepart,
    noticeUsed,
    isSeniorityLessThan6Months,
    hasAgreement,
    agreementResult && agreementResult.value > 0 ? true : false,
    isAgreementSupported
  );
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
          isAgreementSupported={isAgreementSupported}
          agreementMaximumResult={agreementMaximumResult}
          agreementRoute={agreementRoute}
        />
      </Paragraph>
      {description && (
        <Paragraph data-testid="description-decrypted">{description}</Paragraph>
      )}
      {hasHandicap && (
        <Paragraph italic>
          Ce résultat tient compte de la majoration pour les travailleurs
          handicapés.
        </Paragraph>
      )}
    </>
  );
};

export default DecryptedResult;

type ShowResultProps = {
  result?: PublicodesPreavisRetraiteResult;
  agreementMaximumResult?: PublicodesPreavisRetraiteResult;
};

const ShowResult: React.FC<ShowResultProps> = ({
  result,
  agreementMaximumResult,
}) => {
  if (result && result.value > 0) {
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

type ShowResultAgreementProps = ShowResultProps & {
  isAgreementSupported?: boolean;
  agreementRoute?: AgreementRoute;
};

const ShowResultAgreement: React.FC<ShowResultAgreementProps> = ({
  result,
  isAgreementSupported,
  agreementMaximumResult,
  agreementRoute,
}) => {
  if (!result || agreementRoute === "not-selected") {
    return <strong>convention collective non renseignée</strong>;
  }
  if (result?.value > 0 && agreementMaximumResult) {
    return (
      <ShowResult
        result={result}
        agreementMaximumResult={agreementMaximumResult}
      />
    );
  }
  if (isAgreementSupported) {
    return <strong>pas de préavis</strong>;
  }
  return <strong>convention collective non traitée</strong>;
};
