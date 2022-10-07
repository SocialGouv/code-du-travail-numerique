import { StyledFilledElementTable } from "./FilledElements";
import { Absence } from "@socialgouv/modeles-social";

type Props = {
  absencesPeriods: Absence[];
};

const AbsenceTable = ({ absencesPeriods }: Props): JSX.Element => {
  if (absencesPeriods.length === 0) {
    return <></>;
  }

  const showDate =
    absencesPeriods.filter((item) => item.motif.startAt).length > 0;

  return (
    <StyledFilledElementTable>
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
            <td>{period.motif.label}</td>
            <td>{period.durationInMonth} mois</td>
            {showDate && <td>{period.startedAt ?? "-"}</td>}
          </tr>
        ))}
      </tbody>
    </StyledFilledElementTable>
  );
};

export default AbsenceTable;
