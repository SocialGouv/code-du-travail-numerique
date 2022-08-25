import { Absence, Motif } from "@socialgouv/modeles-social";
import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { parse } from "../../../common/utils";

type Props = {
  dateEntree: string;
  dateNotification: string;
  motifs: Motif[];
  absencePeriods?: Absence[];
};

function computeSalaryPeriods({
  motifs,
  dateEntree,
  dateNotification,
  absencePeriods,
}: Props): string[] {
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const totalAbsence = (absencePeriods || [])
    .filter((period) => Boolean(period.durationInMonth))
    .reduce((total, item) => {
      const motif = motifs.find((motif) => motif.key === item.motif.key);
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
