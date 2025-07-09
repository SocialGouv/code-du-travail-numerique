import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { Highlight } from "@codegouvfr/react-dsfr/Highlight";
import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { LicenciementSituation } from "../utils/types";

type Props = {
  duration: string;
  agreementSituation?: LicenciementSituation;
  legalSituation?: LicenciementSituation;
  idcc?: number;
  note?: string;
};

const ShowResult: React.FC<Props> = ({
  duration,
  agreementSituation,
  legalSituation,
  idcc,
  note,
}: Props) => {
  const isZeroDuration = duration === "Aucun préavis" || duration === "0";

  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>Préavis de licenciement</h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis, la durée du préavis de
        licenciement est estimée à&nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>{duration}</strong>
      </p>

      {!isZeroDuration && (
        <div className={fr.cx("fr-mt-2w")}>
          {note && (
            <div className="fr-callout fr-callout--blue-france fr-mb-2w">
              <p className={fr.cx("fr-text--sm", "fr-mb-0")}>{note}</p>
            </div>
          )}

          {idcc && (
            <Badge severity="info" small>
              Convention collective n°{idcc}
            </Badge>
          )}
        </div>
      )}

      {isZeroDuration && (
        <p className={fr.cx("fr-text--md", "fr-mt-2w")}>
          {legalSituation?.duration === 0 && !agreementSituation
            ? "Le code du travail ne prévoit pas de durée de préavis de licenciement sauf, cas particuliers."
            : legalSituation?.duration === 0 &&
                agreementSituation?.duration === 0
              ? "Le code du travail et la convention collective ne prévoient pas de préavis."
              : "Aucun préavis n'est requis dans cette situation."}
        </p>
      )}
    </>
  );
};

export default ShowResult;
