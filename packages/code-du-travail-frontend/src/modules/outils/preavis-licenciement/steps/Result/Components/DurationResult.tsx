import React from "react";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { LicenciementSituation } from "../utils/types";

type Props = {
  duration: string;
  agreementSituation?: LicenciementSituation;
  legalSituation?: LicenciementSituation;
  note?: string;
  idcc?: number;
};

export const DurationResult = ({
  duration,
  agreementSituation,
  legalSituation,
  idcc,
}: Props): JSX.Element => {
  if (legalSituation && legalSituation.duration === 0) {
    if (!agreementSituation) {
      return (
        <div className="fr-mb-4w">
          <Highlight size="lg" className="fr-mb-2w">
            {duration}
          </Highlight>
          <p className="fr-text--md">
            Le code du travail ne prévoit pas de durée de préavis de
            licenciement sauf, cas particuliers.
          </p>
        </div>
      );
    } else if (agreementSituation.duration === 0) {
      return (
        <div className="fr-mb-4w">
          <Highlight size="lg" className="fr-mb-2w">
            {duration}
          </Highlight>
          <p className="fr-text--md">
            Le code du travail et la convention collective ne prévoient pas de
            préavis.
          </p>
        </div>
      );
    }
  }

  const note = agreementSituation?.note;

  return (
    <div className="fr-mb-4w">
      <p className="fr-text--md fr-mb-2w">
        À partir des éléments que vous avez saisis, la durée du préavis de
        licenciement est estimée à :{" "}
        <Highlight size="lg" className="fr-ml-1w">
          {duration}
        </Highlight>
      </p>

      {note && (
        <div className="fr-callout fr-callout--blue-france fr-mt-2w">
          <p className="fr-text--sm fr-mb-0">{note}</p>
        </div>
      )}

      {idcc && (
        <div className="fr-mt-2w">
          <Badge severity="info" small>
            Convention collective n°{idcc}
          </Badge>
        </div>
      )}
    </div>
  );
};
