import { fr } from "@codegouvfr/react-dsfr";
import {
  Notification,
  PublicodesPreavisDemissionResult,
} from "@socialgouv/modeles-social";
import React from "react";

import { NoticeNote } from "src/modules/outils/common/components/NoticeNote";
import { NoticeExample } from "src/modules/outils/common/components/NoticeExample";
import { ListSimulator } from "src/modules/outils/common/types";
import { formatUnit } from "src/modules/outils/common/utils/formatUnit";

type Props = {
  result?: PublicodesPreavisDemissionResult;
  notifications: Notification[];
  idccNumber?: number;
};

const ShowResult: React.FC<Props> = ({
  result,
  notifications,
  idccNumber,
}: Props) => {
  if (!result) return null;

  const unitString = formatUnit(result.unit);

  const displayExample =
    result.value != null && result.value > 0 && idccNumber !== 3239;

  return (
    <>
      <h3 className={fr.cx("fr-mt-3w", "fr-h2")}>Préavis de démission</h3>
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
            <>
              il n&apos;y a pas de préavis à effectuer
              <NoticeNote
                numberOfElements={
                  displayExample
                    ? 1 + notifications.length
                    : notifications.length
                }
                currentElement={0}
                displayUnique={!displayExample}
                isList
              />
            </>
          )}
        </strong>
      </p>
      {result.value != null && result.value === 0 && (
        <p>
          Le code du travail ne prévoit pas de durée de préavis de démission
          sauf, cas particuliers.
        </p>
      )}
      {displayExample && (
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
                currentElement={displayExample ? 2 : 1 + index}
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
