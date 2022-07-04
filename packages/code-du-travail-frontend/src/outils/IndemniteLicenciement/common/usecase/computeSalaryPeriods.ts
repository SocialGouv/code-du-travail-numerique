import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { parse } from "../../../common/utils";
import { MOTIFS } from "../motifs";
import { Absence } from "../types";

type Props = {
  dateEntree: string;
  dateNotification: string;
  absencePeriods?: Absence[];
};

function computeSalaryPeriods({
  dateEntree,
  dateNotification,
  absencePeriods,
}: Props): string[] {
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const totalAbsence = (absencePeriods || [])
    .filter((period) => Boolean(period.durationInMonth))
    .reduce((total, item) => {
      const motif = MOTIFS.find((motif) => motif.label === item.motif);
      if (motif && item.durationInMonth) {
        return total + item.durationInMonth * motif.value;
      }
      return total;
    }, 0);

  const nbMonths = Math.min(
    differenceInMonths(dNotification, dEntree) - totalAbsence,
    12
  );
  return Array.from({ length: nbMonths }).map((_, index) => {
    return format(subMonths(dNotification, index + 1), "MMMM yyyy", {
      locale: frLocale,
    });
  });
}

export default computeSalaryPeriods;
