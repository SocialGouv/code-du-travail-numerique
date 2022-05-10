import React from "react";

import { SmallText } from "./stepStyles";
import { dateToString } from "../../lib";
import { convertPeriodToHumanDate, Extra, getExtra } from "../utils";

const FROM_DATE = new Date("2022-04-23");

type NoticeExampleProps = {
  simulator: Simulator;
  period: string;
  fromDate?: Date;
  note?: JSX.Element;
};

export enum Simulator {
  PREAVIS_DEMISSION,
  PREAVIS_LICENCIEMENT,
  PREAVIS_DEPART_RETRAITE,
  PREAVIS_MISE_RETRAITE,
}

export const NoticeExample = ({
  simulator,
  period,
  fromDate = FROM_DATE,
  note,
}: NoticeExampleProps): JSX.Element => {
  const periodCalculated = React.useMemo(
    () => convertPeriodToHumanDate(period, fromDate),
    [period, fromDate]
  );

  switch (simulator) {
    case Simulator.PREAVIS_DEMISSION:
      return (
        <SmallText>
          {note}
          <MorePrecision period={period} />
          Le préavis débute le jour où le salarié remet sa lettre de démission
          en main propre ou à la date de première présentation de la lettre
          recommandée, peu importe le jour de son retrait par l’employeur.
          {periodCalculated && (
            <>
              <SmallText as="i">
                {" "}
                Exemple : si l’employeur reçoit le courrier recommandé le{" "}
                {dateToString(fromDate)} alors le salarié effectuera son dernier
                jour dans l’entreprise le {periodCalculated}.
              </SmallText>
            </>
          )}
        </SmallText>
      );
    case Simulator.PREAVIS_LICENCIEMENT:
      return (
        <SmallText>
          {note}
          Le préavis débute à la date de première présentation de la
          notification du licenciement par lettre recommandée, peu importe le
          jour de son retrait par le salarié.
          <MorePrecision period={period} />
          {periodCalculated && (
            <>
              <SmallText as="i">
                {" "}
                Exemple : si le salarié reçoit le courrier recommandé le{" "}
                {dateToString(fromDate)} alors il effectuera son dernier jour
                dans l’entreprise le {periodCalculated}. Si le{" "}
                {periodCalculated} tombe un samedi, un dimanche, un jour férié
                ou un jour qui n’est habituellement pas travaillé dans
                l’entreprise, le salarié effectuera son dernier jour dans
                l’entreprise le jour ouvrable suivant.
              </SmallText>
            </>
          )}
        </SmallText>
      );
    case Simulator.PREAVIS_DEPART_RETRAITE:
      return (
        <>
          <MorePrecision period={period} />
          <SmallText>
            {note}
            Le préavis débute le jour où le salarié remet sa lettre de départ à
            la retraite en main propre ou à la date de première présentation de
            la lettre recommandée, peu importe le jour de son retrait par
            l’employeur.
          </SmallText>
        </>
      );
    case Simulator.PREAVIS_MISE_RETRAITE:
      return (
        <>
          <MorePrecision period={period} />
          <SmallText>
            {note}
            Le préavis débute à la date de première présentation de la
            notification de la mise à la retraite par lettre recommandée, peu
            importe le jour de son retrait par le salarié.
          </SmallText>
        </>
      );
    default:
      return <></>;
  }
};

const MorePrecision = ({ period }: { period: string }): JSX.Element => {
  const extra = React.useMemo(() => getExtra(period), [period]);
  switch (extra) {
    case Extra.OPEN:
      return <PrecisionOpenDay />;
    case Extra.CALENDAR:
      return <PrecisionCalendarDay />;
    default:
      return <></>;
  }
};

const PrecisionOpenDay = (): JSX.Element => (
  <>
    <SmallText as="span">
      Les jours ouvrés sont les jours effectivement travaillés dans une
      entreprise ou une administration. On en compte 5 par semaine.
      <br />
    </SmallText>
    <SmallText as="i">
      Exemple : si les jours travaillés dans l&apos;entreprise sont du lundi au
      vendredi et que l’employeur reçoit le courrier recommandé le mardi alors
      le salarié effectuera son dernier jour dans l’entreprise le mercredi.
    </SmallText>
  </>
);

const PrecisionCalendarDay = (): JSX.Element => (
  <>
    <SmallText as="span">
      Les jours calendaires correspondent à la totalité des jours du calendrier
      de l’année civile, du 1er janvier au 31 décembre, y compris les jours
      fériés ou chômés.
      <br />
    </SmallText>
  </>
);
