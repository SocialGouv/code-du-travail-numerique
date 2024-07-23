import {
  Notification,
  PublicodesPreavisRetraiteResult,
} from "@socialgouv/modeles-social";
import React from "react";

import { NoticeExample, Simulator } from "../../../../common/NoticeExample";
import { NoticeNote } from "../../../../common/NoticeNote";
import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../../../common/stepStyles";
import { DepartOuMiseRetraite } from "../../OriginStep/store";

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
      <SectionTitle>
        Préavis de {type === "depart-retraite" ? "départ" : "mise"} à la
        retraite
      </SectionTitle>
      <p>
        À partir des éléments que vous avez saisis
        {result.value > 0
          ? `, la durée du préavis en cas de ${type} à la retraite est estimée à`
          : ""}
        &nbsp;:{" "}
        <HighlightResult>
          {agreementMaximumResult?.value &&
          agreementMaximumResult?.value !== result.value ? (
            <>
              entre&nbsp;{result.value}&nbsp;
              {result.unit}&nbsp;et&nbsp;
              {agreementMaximumResult?.value}&nbsp;
              {agreementMaximumResult?.unit}
            </>
          ) : result.value > 0 ? (
            <>
              {result.value}
              &nbsp;
              {result.unit}
            </>
          ) : (
            <>il n’y a pas de préavis à effectuer</>
          )}
          <NoticeNote
            numberOfElements={1 + notifications.length}
            currentElement={1}
            isList
          />
        </HighlightResult>
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
            type === "mise-retraite"
              ? Simulator.PREAVIS_MISE_RETRAITE
              : Simulator.PREAVIS_DEPART_RETRAITE
          }
          period={`${result.value} ${result.unit}`}
          idccNumber={idccNumber}
        />
      )}
      {notifications.length > 0 && (
        <SmallText>
          {notifications.map((notification, index) => (
            <>
              <NoticeNote
                numberOfElements={1 + notifications.length}
                currentElement={1 + 1 + index}
              />
              {notification.description}
            </>
          ))}
        </SmallText>
      )}
    </>
  );
};

export default ShowResult;
