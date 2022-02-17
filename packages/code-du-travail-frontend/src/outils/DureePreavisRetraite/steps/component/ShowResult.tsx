import React from "react";

import Mdx from "../../../../common/Mdx";
import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../../common/stepStyles";
import {
  PublicodesPreavisRetraiteResult,
  usePublicodes,
} from "../../../publicodes";

const ShowResult: React.FC = () => {
  const publicodesContext = usePublicodes<PublicodesPreavisRetraiteResult>();

  const type =
    publicodesContext.situation.find(
      (item) => item.name === "contrat salarié - mise à la retraite"
    )?.value === "oui"
      ? "mise"
      : "départ";

  const notifications = publicodesContext.getNotifications();
  const agreementMaximumResult = publicodesContext.execute(
    "contrat salarié . préavis de retraite collective maximum en jours"
  );

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
          {agreementMaximumResult?.value &&
          agreementMaximumResult?.value !== publicodesContext.result.value ? (
            <>
              entre&nbsp;{publicodesContext.result.value}&nbsp;
              {publicodesContext.result.unit}&nbsp;et&nbsp;
              {agreementMaximumResult?.value}&nbsp;
              {agreementMaximumResult?.unit}
            </>
          ) : publicodesContext.result.value > 0 ? (
            <>
              {publicodesContext.result.value}
              &nbsp;
              {publicodesContext.result.unit}
            </>
          ) : (
            <>il n’y a pas de préavis à effectuer</>
          )}
          {notifications.length > 0 ? <sup>*</sup> : ""}
        </HighlightResult>
      </p>
      {notifications.length > 0 && (
        <SmallText>
          {publicodesContext.getNotifications().map((notification) => (
            <Mdx
              key={notification.dottedName}
              markdown={"\\* " + notification.description}
            />
          ))}
        </SmallText>
      )}
    </>
  );
};

export default ShowResult;
