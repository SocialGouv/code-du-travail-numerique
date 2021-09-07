import React from "react";

import Mdx from "../../../../common/Mdx";
import { SectionTitle } from "../../../common/stepStyles";
import { PublicodesContextInterface } from "../../../publicodes";
import { HighlightResult, Notification } from "../Result";

type Props = {
  publicodesContext: PublicodesContextInterface;
};

const ShowResult: React.FC<Props> = ({ publicodesContext }) => {
  const type =
    publicodesContext.situation.find(
      (item) => item.name === "contrat salarié - mise à la retraite"
    ).value === "oui"
      ? "mise"
      : "départ";

  const notifications = publicodesContext.getNotifications();

  return (
    <>
      <SectionTitle>Préavis de {type} à la retraite</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis
        {publicodesContext.result.value > 0
          ? `, la durée du préavis en cas de ${type} à la retraite est estimée à`
          : ""}
        &nbsp;:{" "}
        <HighlightResult>
          {publicodesContext.result.value > 0 ? (
            <>
              {publicodesContext.result.value}
              &nbsp;
              {publicodesContext.result.unit.numerators[0]}
            </>
          ) : (
            <>il n’y a pas de préavis à effectuer</>
          )}
          {notifications.length > 0 ? <sup>*</sup> : ""}
        </HighlightResult>
      </p>
      {notifications.length > 0 && (
        <Notification>
          {publicodesContext.getNotifications().map((notification) => (
            <Mdx
              key={notification.dottedName}
              markdown={"\\* " + notification.description}
            />
          ))}
        </Notification>
      )}
    </>
  );
};

export default ShowResult;
