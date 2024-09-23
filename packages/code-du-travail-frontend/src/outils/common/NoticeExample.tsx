import React from "react";

import { SmallText } from "./stepStyles";
import { Unit, convertDate, dateToString } from "../../lib";
import { convertPeriodToHumanDate, Extra, getExtra } from "../utils";

const FROM_DATE = new Date("2022-04-05");

const CCS_WITH_ONE_MORE_DAY = [573, 2120];

type NoticeExampleProps = {
  simulator: Simulator;
  period: string;
  fromDate?: Date;
  note?: JSX.Element;
  idccNumber?: number;
};

export enum Simulator {
  PREAVIS_DEMISSION,
  PREAVIS_LICENCIEMENT,
  PREAVIS_DEPART_RETRAITE,
  PREAVIS_MISE_RETRAITE,
  PREAVIS_RETRAITE_BOTH,
  INDEMNITE_LICENCIEMENT,
  HEURES_RECHERCHE_EMPLOI,
  INDEMNITE_PRECARITE,
}

export const NoticeExample = ({
  simulator,
  period,
  fromDate = FROM_DATE,
  note,
  idccNumber,
}: NoticeExampleProps): JSX.Element => {
  const isCcsWithOneMoreDay =
    idccNumber && CCS_WITH_ONE_MORE_DAY.includes(idccNumber);
  const defaultDayPreavisDemissionMessage = isCcsWithOneMoreDay
    ? "Le préavis débute le lendemain du jour où le salarié remet sa lettre de démission en main propre ou le lendemain de la première présentation de la lettre recommandée, peu importe le jour de son retrait par l’employeur."
    : "Le préavis débute le jour où le salarié remet sa lettre de démission en main propre ou à la date de première présentation de la lettre recommandée, peu importe le jour de son retrait par l’employeur.";
  const defaultDayPreavisLicenciementMessage = isCcsWithOneMoreDay
    ? "Le préavis débute le lendemain de la première présentation de la notification du licenciement par lettre recommandée, peu importe le jour de son retrait par le salarié."
    : "Le préavis débute à la date de la première présentation de la notification du licenciement par lettre recommandée, peu importe le jour de son retrait par le salarié.";
  const fromDateCalculated = React.useMemo(
    () => (isCcsWithOneMoreDay ? convertDate(fromDate, 1, Unit.DAY) : fromDate),
    [fromDate, isCcsWithOneMoreDay]
  );

  const periodCalculated = React.useMemo(
    () => convertPeriodToHumanDate(period, fromDateCalculated),
    [period, fromDateCalculated]
  );
  const extra = React.useMemo(() => getExtra(period), [period]);

  switch (simulator) {
    case Simulator.PREAVIS_DEMISSION:
      return (
        <SmallText data-testid="notice-preavis-demission">
          {note}
          <MorePrecision extra={extra} />
          {defaultDayPreavisDemissionMessage}
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
          <CommunAccord />
        </SmallText>
      );
    case Simulator.PREAVIS_LICENCIEMENT:
      return (
        <SmallText data-testid="notice-preavis-licenciement">
          {note}
          <MorePrecision extra={extra} />
          {defaultDayPreavisLicenciementMessage}
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
          )}
          <CommunAccord />
        </SmallText>
      );
    case Simulator.PREAVIS_DEPART_RETRAITE:
      return (
        <div data-testid="notice-depart-retraite">
          <MorePrecision extra={extra} />
          <SmallText>
            {note}
            Le préavis débute le jour où le salarié remet sa lettre de départ à
            la retraite en main propre ou à la date de première présentation de
            la lettre recommandée, peu importe le jour de son retrait par
            l’employeur.
            <CommunAccord />
          </SmallText>
        </div>
      );
    case Simulator.PREAVIS_MISE_RETRAITE:
      return (
        <div data-testid="notice-mise-retraite">
          <MorePrecision extra={extra} />
          <SmallText>
            {note}
            Le préavis débute à la date de première présentation de la
            notification de la mise à la retraite par lettre recommandée, peu
            importe le jour de son retrait par le salarié.
            <CommunAccord />
          </SmallText>
        </div>
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
  <SmallText as="span" data-testid="notice-open-day">
    Les jours ouvrés sont les jours effectivement travaillés dans une entreprise
    ou une administration. On en compte 5 par semaine.
    <br />
  </SmallText>
);

const PrecisionCalendarDay = (): JSX.Element => (
  <SmallText as="span" data-testid="notice-calendar-day">
    Les jours calendaires correspondent à la totalité des jours du calendrier de
    l’année civile, du 1er janvier au 31 décembre, y compris les jours fériés ou
    chômés.
    <br />
  </SmallText>
);

const CommunAccord = (): JSX.Element => (
  <SmallText as="span" data-testid="notice-commun-accord">
    <br />
    L’employeur et le salarié peuvent fixer d’un commun accord une date de
    départ anticipée, libérant ainsi le salarié de l’exécution de la totalité ou
    d’une partie du préavis.
  </SmallText>
);
