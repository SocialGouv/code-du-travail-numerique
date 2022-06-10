import React from "react";

import { SmallText } from "./stepStyles";
import { dateToString } from "../../lib";
import { convertPeriodToHumanDate, Extra, getExtra } from "../utils";

const FROM_DATE = new Date("2022-04-05");

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
  const extra = React.useMemo(() => getExtra(period), [period]);

  switch (simulator) {
    case Simulator.PREAVIS_DEMISSION:
      return (
        <SmallText>
          {note}
          <MorePrecision extra={extra} />
          Le préavis débute le jour où le salarié remet sa lettre de démission
          en main propre ou à la date de première présentation de la lettre
          recommandée, peu importe le jour de son retrait par l’employeur.
          {periodCalculated && (
            <SmallText as="i">
              {" "}
              Exemple : si l’employeur reçoit le courrier recommandé le{" "}
              {dateToString(fromDate)} alors le salarié effectuera son dernier
              jour dans l’entreprise le {periodCalculated}.
              {extra !== Extra.OPEN && (
                <SmallText as="span">
                  {" "}
                  Si le {periodCalculated} tombe un samedi, un dimanche, un jour
                  férié ou un jour qui n’est habituellement pas travaillé dans
                  l’entreprise, le salarié effectuera son dernier jour dans
                  l’entreprise le jour ouvré précédent.
                </SmallText>
              )}
            </SmallText>
          )}
        </SmallText>
      );
    case Simulator.PREAVIS_LICENCIEMENT:
      return (
        <SmallText>
          {note}
          <MorePrecision extra={extra} />
          Le préavis débute à la date de première présentation de la
          notification du licenciement par lettre recommandée, peu importe le
          jour de son retrait par le salarié.
          {periodCalculated && (
            <SmallText as="i">
              {" "}
              Exemple : si le salarié reçoit le courrier recommandé le{" "}
              {dateToString(fromDate)} alors il effectuera son dernier jour dans
              l’entreprise le {periodCalculated}. Si le {periodCalculated} tombe
              un samedi, un dimanche, un jour férié ou un jour qui n’est
              habituellement pas travaillé dans l’entreprise, le salarié
              effectuera son dernier jour dans l’entreprise le jour ouvrable
              suivant.
            </SmallText>
          )}{" "}
        </SmallText>
      );
    case Simulator.PREAVIS_DEPART_RETRAITE:
      return (
        <>
          <MorePrecision extra={extra} />
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
          <MorePrecision extra={extra} />
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

const MorePrecision = ({ extra }: { extra: Extra | null }): JSX.Element => {
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
  <SmallText as="span">
    Les jours ouvrés sont les jours effectivement travaillés dans une entreprise
    ou une administration. On en compte 5 par semaine.
    <br />
  </SmallText>
);

const PrecisionCalendarDay = (): JSX.Element => (
  <SmallText as="span">
    Les jours calendaires correspondent à la totalité des jours du calendrier de
    l’année civile, du 1er janvier au 31 décembre, y compris les jours fériés ou
    chômés.
    <br />
  </SmallText>
);
