import { fr } from "@codegouvfr/react-dsfr";
import { PublicodesPreavisRetraiteResult } from "@socialgouv/modeles-social";
import React from "react";
import { getDescription } from "../utils/getDescription";
import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { NoticeUsed } from "../utils/types";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";

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
      <h3 className={fr.cx("fr-h5", "fr-mt-2w", "fr-mb-0")}>
        Le résultat décrypté
      </h3>
      <p>
        Durée prévue par le code du travail (durée légale)&nbsp;:&nbsp;
        <ShowResult
          result={legalResult}
          agreementMaximumResult={agreementMaximumResult}
        />
      </p>
      <p>
        Durée prévue par la convention collective (durée
        conventionnelle)&nbsp;:&nbsp;
        <ShowResultAgreement
          result={agreementResult}
          isAgreementSupported={isAgreementSupported}
          agreementMaximumResult={agreementMaximumResult}
          agreementRoute={agreementRoute}
        />
      </p>
      {description && <p data-testid="description-decrypted">{description}</p>}
      {hasHandicap && (
        <p className={fr.cx("fr-text--xs")} style={{ fontStyle: "italic" }}>
          Ce résultat tient compte de la majoration pour les travailleurs
          handicapés.
        </p>
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
  if (agreementRoute === "not-selected") {
    return <strong>convention collective non renseignée</strong>;
  }
  if (result && result.value > 0 && agreementMaximumResult) {
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
