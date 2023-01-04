import { differenceInMonths, parse } from "date-fns";

export type RequiredSeniorityProps = {
  dateEntree: string;
  dateNotification: string;
};

export function computeRequiredSeniority({
  dateEntree,
  dateNotification,
}: RequiredSeniorityProps): number {
  const dEntree = parse(dateEntree, "dd/MM/yyyy", new Date());
  const dNotification = parse(dateNotification, "dd/MM/yyyy", new Date());
  return differenceInMonths(dNotification, dEntree) / 12;
}
