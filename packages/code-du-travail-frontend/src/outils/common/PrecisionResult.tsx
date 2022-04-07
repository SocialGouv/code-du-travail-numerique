import React from "react";
import styled from "styled-components";

import { SmallText } from "./stepStyles";
import { convertPeriodToHumanDate, dateToString } from "../../lib";

const FROM_DATE = new Date("2022-04-22");

type PrecisionResultProps = {
  simulator: Simulator;
  period: string;
  fromDate?: Date;
};

export enum Simulator {
  PREAVIS_DEMISSION,
  PREAVIS_LICENCIEMENT,
  PREAVIS_DEPART_RETRAITE,
  PREAVIS_MISE_RETRAITE,
}

export const PrecisionResult = ({
  simulator,
  period,
  fromDate = FROM_DATE,
}: PrecisionResultProps): JSX.Element => {
  const resultFound = React.useMemo(
    () => convertPeriodToHumanDate(period, fromDate),
    [period, fromDate]
  );

  switch (simulator) {
    case Simulator.PREAVIS_DEMISSION:
      return (
        <StyledSmallText>
          *Le préavis débute le jour où le salarié remet sa lettre de démission
          en main propre ou à la date de première présentation de la lettre
          recommandée, peu importe le jour de son retrait par l’employeur.
          {resultFound && (
            <>
              <br />
              <SmallText as="i">
                Exemple : si l’employeur reçoit le courrier recommandé le{" "}
                {dateToString(fromDate)} alors le salarié effectuera son dernier
                jour dans l’entreprise le {resultFound}.
              </SmallText>
            </>
          )}
        </StyledSmallText>
      );
    case Simulator.PREAVIS_LICENCIEMENT:
      return (
        <StyledSmallText>
          *Le préavis débute à la date de première présentation de la
          notification du licenciement par lettre recommandée, peu importe le
          jour de son retrait par le salarié.
          {resultFound && (
            <>
              <br />
              <SmallText as="i">
                Exemple : si le salarié reçoit le courrier recommandé le{" "}
                {dateToString(fromDate)} alors il effectuera son dernier jour
                dans l’entreprise le {resultFound}. Si le {resultFound} tombe un
                samedi, un dimanche, un jour férié ou un jour qui n’est
                habituellement pas travaillé dans l’entreprise, le salarié
                effectuera son dernier jour dans l’entreprise le jour ouvrable
                suivant.
              </SmallText>
            </>
          )}
        </StyledSmallText>
      );
    case Simulator.PREAVIS_DEPART_RETRAITE:
      return (
        <StyledSmallText>
          *Le préavis débute le jour où le salarié remet sa lettre de départ à
          la retraite en main propre ou à la date de première présentation de la
          lettre recommandée, peu importe le jour de son retrait par
          l’employeur.
        </StyledSmallText>
      );
    case Simulator.PREAVIS_MISE_RETRAITE:
      return (
        <StyledSmallText>
          *Le préavis débute à la date de première présentation de la
          notification de la mise à la retraite par lettre recommandée, peu
          importe le jour de son retrait par le salarié.
        </StyledSmallText>
      );
    default:
      return <></>;
  }
};

const StyledSmallText = styled(SmallText)`
  font-style: normal;
`;
