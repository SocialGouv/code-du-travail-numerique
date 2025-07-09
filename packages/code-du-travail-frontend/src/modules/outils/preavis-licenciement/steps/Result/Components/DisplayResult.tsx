import React from "react";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { LicenciementSituation } from "../utils/types";

type Props = {
  idcc: number;
  legalSituation?: LicenciementSituation;
  agreementSituation?: LicenciementSituation;
};

const isNotNearZero = (value: number): boolean => {
  return Math.abs(value) > 0.01;
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
        <p className="fr-text--md fr-mb-2w">
          La durée prévue par le code du travail est le même que celle prévue
          par la convention collective&nbsp;:
        </p>
      );
    }
    return (
      <p className="fr-text--md fr-mb-2w">
        Il s&apos;agit de la durée la plus longue entre la durée légale prévue
        par le Code du travail et la durée conventionnelle prévue par la
        convention collective&nbsp;:
      </p>
    );
  }
  return null;
};

export const DisplayResult = ({
  idcc,
  legalSituation,
  agreementSituation,
}: Props): JSX.Element => {
  if (!legalSituation) {
    return <></>;
  }

  return (
    <div className="fr-mb-4w">
      <h3 className="fr-h4 fr-mb-2w">Résultat</h3>
      <ShowMessage
        agreementDuration={agreementSituation?.duration}
        legalDuration={legalSituation.duration}
        idcc={idcc}
      />
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card fr-card--no-arrow fr-card--no-border">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h4 className="fr-card__title">
                  <Badge severity="info" small className="fr-mr-1w">
                    Légal
                  </Badge>
                  Durée légale
                </h4>
                <p className="fr-card__desc fr-text--bold">
                  {isNotNearZero(legalSituation.duration)
                    ? legalSituation.answer
                    : "Aucun préavis."}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card fr-card--no-arrow fr-card--no-border">
            <div className="fr-card__body">
              <div className="fr-card__content">
                <h4 className="fr-card__title">
                  <Badge severity="success" small className="fr-mr-1w">
                    Conventionnel
                  </Badge>
                  Durée conventionnelle
                </h4>
                <p className="fr-card__desc fr-text--bold">
                  {agreementSituation
                    ? isNotNearZero(agreementSituation.duration)
                      ? agreementSituation.answer
                      : "Aucun préavis."
                    : idcc === 0
                      ? "La convention collective n'a pas été renseignée."
                      : "La convention collective n'a pas été traitée par nos services."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
