import { fr } from "@codegouvfr/react-dsfr";
import {
  Notification,
  PublicodesPreavisDemissionResult,
} from "@socialgouv/modeles-social";
import React from "react";

import { NoticeNote } from "src/modules/outils/common/components/NoticeNote";
import { NoticeExample } from "src/modules/outils/common/components/NoticeExample";
import { ListSimulator } from "src/modules/outils/common/types";

type Props = {
  result?: PublicodesPreavisDemissionResult;
  notifications: Notification[];
  idccNumber?: number;
};

// Helper function to convert unit object to string
const formatUnit = (unit: any): string => {
  if (typeof unit === "string") {
    return unit;
  }
  if (typeof unit === "object" && unit !== null) {
    // Handle unit objects like {numerators: ["jour"], denominators: []}
    if (unit.numerators && Array.isArray(unit.numerators)) {
      return unit.numerators.join(" ");
    }
  }
  return "";
};

const ShowResult: React.FC<Props> = ({
  result,
  notifications,
  idccNumber,
}: Props) => {
  if (!result) return null;

  const unitString = formatUnit(result.unit);

  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>Préavis de démission</h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis
        {result.value != null && result.value > 0
          ? ", la durée du préavis de démission est estimée à"
          : ""}
        &nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>
          {result.value != null && result.value > 0 ? (
            <>
              {result.value}
              &nbsp;
              {unitString}
              <NoticeNote
                numberOfElements={1 + notifications.length}
                currentElement={1}
                isList
              />
            </>
          ) : (
            <>il n&apos;y a pas de préavis à effectuer</>
          )}
        </strong>
      </p>
      {result.value != null && result.value === 0 && (
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
      )}
      {result.value !== 0 && (
        <NoticeExample
          note={
            <NoticeNote
              numberOfElements={1 + notifications.length}
              currentElement={1}
            />
          }
          simulator={ListSimulator.PREAVIS_DEMISSION}
          period={`${result.value} ${unitString}`}
          idccNumber={idccNumber}
        />
      )}
      {notifications.length > 0 && (
        <p data-testid="notice-description">
          {notifications.map((notification, index) => (
            <div key={index}>
              <NoticeNote
                numberOfElements={1 + notifications.length}
                currentElement={1 + 1 + index}
              />
              {notification.description}
            </div>
          ))}
        </p>
      )}
    </>
  );
};

export default ShowResult;
