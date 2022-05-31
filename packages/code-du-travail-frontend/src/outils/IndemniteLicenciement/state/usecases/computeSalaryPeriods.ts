import { parse } from "../../../common/utils";
import { MOTIFS } from "../../components/AbsencePeriods";
import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";

type Props = {
  dateEntree: string;
  dateNotification: string;
  absencePeriods?: { duration: string; type: string }[];
};

function computeSalaryPeriods({
  dateEntree,
  dateNotification,
  absencePeriods,
}: Props) {
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const totalAbsence = (absencePeriods || [])
    .filter((period) => Boolean(period.duration))
    .reduce((total, item) => {
      const motif = MOTIFS.find((motif) => motif.label === item.type) as {
        label: string;
        value: number;
      };
      return total + parseInt(item.duration) * motif.value;
    }, 0);

  const nbMonthes = Math.min(
    differenceInMonths(dNotification, dEntree) - totalAbsence,
    12
  );
  return Array.from({ length: nbMonthes }).map((_, index) => {
    return format(subMonths(dNotification, index + 1), "MMMM yyyy", {
      locale: frLocale,
    });
  });
}

export default computeSalaryPeriods;
