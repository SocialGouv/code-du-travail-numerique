import { Notification } from "@socialgouv/modeles-social";
import React from "react";

import Mdx from "../../../../common/Mdx";
import { PrecisionResult, Simulator } from "../../../common/PrecisionResult";
import {
  HighlightResult,
  SectionTitle,
  SmallText,
} from "../../../common/stepStyles";
import { PublicodesPreavisRetraiteResult } from "../../../publicodes";

type Props = {
  publicodesResult: PublicodesPreavisRetraiteResult;
  agreementMaximumResult: PublicodesPreavisRetraiteResult;
  type: "mise" | "départ";
  notifications: Notification[];
};

const ShowResult: React.FC<Props> = ({
  publicodesResult,
  agreementMaximumResult,
  type,
  notifications,
}: Props) => {
  return (
    <>
      <SectionTitle>Préavis de {type} à la retraite</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis
        {publicodesResult.value > 0
          ? `, la durée du préavis en cas de ${type} à la retraite est estimée à`
          : ""}
        &nbsp;:{" "}
        <HighlightResult>
          {agreementMaximumResult?.value &&
          agreementMaximumResult?.value !== publicodesResult.value ? (
            <>
              entre&nbsp;{publicodesResult.value}&nbsp;
              {publicodesResult.unit}&nbsp;et&nbsp;
              {agreementMaximumResult?.value}&nbsp;
              {agreementMaximumResult?.unit}
            </>
          ) : publicodesResult.value > 0 ? (
            <>
              {publicodesResult.value}
              &nbsp;
              {publicodesResult.unit}
            </>
          ) : (
            <>il n’y a pas de préavis à effectuer</>
          )}
          <sup>*</sup>
        </HighlightResult>
      </p>
      {notifications.length > 0 && (
        <SmallText>
          {notifications.map((notification) => (
            <Mdx
              key={notification.dottedName}
              markdown={"\\* " + notification.description}
            />
          ))}
        </SmallText>
      )}
      <PrecisionResult
        simulator={
          type === "mise"
            ? Simulator.PREAVIS_MISE_RETRAITE
            : Simulator.PREAVIS_DEPART_RETRAITE
        }
        period={`${publicodesResult.value} ${publicodesResult.unit}`}
      />
    </>
  );
};

export default ShowResult;
