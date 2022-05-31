import { parse } from "../../../common/utils";
import { MOTIFS } from "../../components/AbsencePeriods";
import { differenceInMonths } from "date-fns";

type Props = {
  dateEntree: string;
  dateSortie: string;
  absencePeriods?: { duration: string; type: string }[];
};

const computeSeniority = ({
  dateEntree,
  dateSortie,
  absencePeriods = [],
}: Props) => {
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);

  // on calcule totalAbsence en mois par année (ex: 12mois = 1)
  // pour pouvoir ensuite le retranché de l’anciennété qui est aussi en mois par année
  const totalAbsence =
    (absencePeriods || [])
      .filter((period) => Boolean(period.duration))
      .reduce((total, item) => {
        const motif = MOTIFS.find((motif) => motif.label === item.type) as {
          label: string;
          value: number;
        };
        return total + parseInt(item.duration) * motif.value;
      }, 0) / 12;
  return differenceInMonths(dSortie, dEntree) / 12 - totalAbsence;
};
export default computeSeniority;
