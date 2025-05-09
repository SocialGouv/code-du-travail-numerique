import { SectionTitle } from "../../../../common/stepStyles";
import { isNotNearZero } from "../../../../common/utils";
import React from "react";
import { LicenciementSituation } from "../utils";

type Props = {
  idcc: number;
  legalSituation?: LicenciementSituation;
  agreementSituation?: LicenciementSituation;
};

const ShowMessage = ({
  idcc,
  legalDuration,
  agreementDuration,
}: {
  idcc: number;
  legalDuration: number;
  agreementDuration?: number;
}) => {
  if (idcc > 0) {
    if (legalDuration === agreementDuration) {
      return (
        <p>
          La durée prévue par le code du travail est le même que celle prévue
          par la convention collective&nbsp;:
        </p>
      );
    }
    return (
      <p>
        Il s’agit de la durée la plus longue entre la durée légale prévue par le
        Code du travail et la durée conventionnelle prévue par la convention
        collective&nbsp;:
      </p>
    );
  }
  return;
};

const DisplayResult = ({
  idcc,
  legalSituation,
  agreementSituation,
}: Props): JSX.Element => {
  if (!legalSituation) {
    return <></>;
  }
  return (
    <>
      <SectionTitle>Résultat</SectionTitle>
      <ShowMessage
        agreementDuration={agreementSituation?.duration}
        legalDuration={legalSituation.duration}
        idcc={idcc}
      />
      <ul>
        <li>
          Durée légale&nbsp;:{" "}
          <strong>
            {isNotNearZero(legalSituation.duration)
              ? legalSituation.answer
              : "Aucun préavis."}
          </strong>
        </li>
        <li>
          Durée conventionnelle&nbsp;:{" "}
          <strong>
            {agreementSituation
              ? isNotNearZero(agreementSituation.duration)
                ? agreementSituation.answer
                : "Aucun préavis."
              : idcc === 0
                ? "La convention collective n'a pas été renseignée."
                : "La convention collective n'a pas été traitée par nos services."}
          </strong>
        </li>
      </ul>
    </>
  );
};

export default DisplayResult;
