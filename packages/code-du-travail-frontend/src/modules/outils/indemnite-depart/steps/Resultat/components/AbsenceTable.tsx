import { fr } from "@codegouvfr/react-dsfr";
import { Absence } from "@socialgouv/modeles-social";

type Props = {
  absencesPeriods: Absence[];
};

const AbsenceTable = ({ absencesPeriods }: Props): JSX.Element => {
  if (absencesPeriods.length === 0) {
    return <></>;
  }

  const showDate =
    absencesPeriods.filter((item) => item.startedAt !== undefined).length > 0;

  return (
    <div className={fr.cx("fr-mt-2w", "fr-table")}>
      <div className={fr.cx("fr-table__wrapper")}>
        <div className={fr.cx("fr-table__container")}>
          <div className={fr.cx("fr-table__content")}>
            <table>
              <thead>
                <tr>
                  <th>Motif de l&apos;absence</th>
                  <th>Durée</th>
                  {showDate && <th>Date</th>}
                </tr>
              </thead>
              <tbody>
                {absencesPeriods.map((period, index) => (
                  <tr key={"absence-" + index}>
                    <td data-testid="absence-motif">{period.motif.label}</td>
                    <td data-testid="absence-duration">
                      {period.durationInMonth} mois
                    </td>
                    {showDate && (
                      <td data-testid="absence-date">
                        {period.startedAt ?? "-"}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsenceTable;
