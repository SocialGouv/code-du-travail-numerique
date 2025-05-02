import { fr } from "@codegouvfr/react-dsfr";
import {
  Notification,
  PublicodesPreavisRetraiteResult,
} from "@socialgouv/modeles-social";
import React from "react";

import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { NoticeNote } from "src/modules/outils/common/components/NoticeNote";
import { NoticeExample } from "src/modules/outils/common/components/NoticeExample";
import { ListSimulator } from "src/modules/outils/common/types";

type Props = {
  result?: PublicodesPreavisRetraiteResult;
  agreementMaximumResult?: PublicodesPreavisRetraiteResult;
  type: DepartOuMiseRetraite;
  notifications: Notification[];
  idccNumber?: number;
};

const ShowResult: React.FC<Props> = ({
  result,
  agreementMaximumResult,
  type,
  notifications,
  idccNumber,
}: Props) => {
  if (!result) return null;
  return (
    <>
      <h2 className={fr.cx("fr-mt-3w")}>
        Préavis de {type === "depart-retraite" ? "départ" : "mise"} à la
        retraite
      </h2>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis
        {result.value > 0
          ? `, la durée du préavis en cas de ${
              type === "depart-retraite" ? "départ" : "mise"
            } à la retraite est estimée à`
          : ""}
        &nbsp;:
      </p>
      <p data-testid="resultat">
        <strong className={fr.cx("fr-h2")}>
          {agreementMaximumResult?.value &&
          agreementMaximumResult?.value !== result.value ? (
            <>
              entre&nbsp;{result.value}&nbsp;
              {result.unit}&nbsp;et&nbsp;
              {agreementMaximumResult?.value}&nbsp;
              {agreementMaximumResult?.unit}
              <NoticeNote
                numberOfElements={1 + notifications.length}
                currentElement={1}
                isList
              />
            </>
          ) : result.value > 0 ? (
            <>
              {result.value}
              &nbsp;
              {result.unit}
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
      {result.value !== 0 && (
        <NoticeExample
          note={
            <NoticeNote
              numberOfElements={1 + notifications.length}
              currentElement={1}
            />
          }
          simulator={
            type === "depart-retraite"
              ? ListSimulator.PREAVIS_DEPART_RETRAITE
              : ListSimulator.PREAVIS_MISE_RETRAITE
          }
          period={`${result.value} ${result.unit}`}
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
