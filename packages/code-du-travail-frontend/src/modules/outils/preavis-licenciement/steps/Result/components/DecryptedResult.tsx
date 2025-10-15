import { fr } from "@codegouvfr/react-dsfr";
import {
  ExplanationMainResult,
  PublicodesPreavisLicenciementResult,
} from "@socialgouv/modeles-social";
import React from "react";
import { AgreementRoute } from "src/modules/outils/indemnite-depart/types";
import { getDecryptedValue } from "../utils/getDecryptedResult";
import { formatUnit } from "../../../../common/utils/formatUnit";

type Props = {
  legalResult?: PublicodesPreavisLicenciementResult;
  agreementResult?: PublicodesPreavisLicenciementResult;
  isAgreementSupported?: boolean;
  agreementRoute?: AgreementRoute;
  resultExplanation?: ExplanationMainResult;
};

const DecryptedResult: React.FC<Props> = ({
  legalResult,
  isAgreementSupported,
  agreementResult,
  agreementRoute,
  resultExplanation,
}) => {
  return (
    <>
      <h4 className={fr.cx("fr-h5", "fr-mt-2w", "fr-mb-2w")}>
        Le résultat décrypté
      </h4>
      {resultExplanation && <p>{getDecryptedValue(resultExplanation)}</p>}
      <p>
        Durée prévue par le code du travail (durée légale)&nbsp;:&nbsp;
        {legalResult && legalResult.value !== 0 ? (
          <strong>
            {legalResult.value}&nbsp;{formatUnit(legalResult.unit)}
          </strong>
        ) : (
          <strong>pas de préavis</strong>
        )}
      </p>
      <p>
        Durée prévue par la convention collective (durée
        conventionnelle)&nbsp;:&nbsp;
        {agreementRoute === "not-selected" ? (
          <strong>convention collective non renseignée</strong>
        ) : agreementResult && agreementResult.value !== 0 ? (
          <strong>
            {agreementResult.value}&nbsp;{formatUnit(agreementResult.unit)}
          </strong>
        ) : isAgreementSupported ? (
          <strong>pas de préavis</strong>
        ) : (
          <strong>convention collective non traitée</strong>
        )}
      </p>
    </>
  );
};

export default DecryptedResult;
