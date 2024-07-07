import { differenceInMonths, format, subMonths } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { parse } from "../../../common/utils";

type Props = {
  dateEntree: string;
  dateNotification: string;
};

function computeSalaryPeriods({
  dateEntree,
  dateNotification,
}: Props): string[] {
  const dEntree = parse(dateEntree);
  const dNotification = parse(dateNotification);

  const nbMonths = Math.min(differenceInMonths(dNotification, dEntree), 12);
  return Array.from({ length: nbMonths }).map((_, index) => {
    const notificationLessOneMonth = subMonths(dNotification, index + 1);
    const formattedData = format(notificationLessOneMonth, "MMMM yyyy", {
      locale: frLocale,
    });
    // HACK: sometimes the formattedData return an empty string
    if (!formattedData?.trim()) {
      return `${
        notificationLessOneMonth.getMonth() + 1
      }/${notificationLessOneMonth.getFullYear()}`;
    }
    return formattedData;
  });
}

export default computeSalaryPeriods;
