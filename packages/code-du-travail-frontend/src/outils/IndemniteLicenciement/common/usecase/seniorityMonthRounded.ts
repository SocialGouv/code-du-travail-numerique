import { differenceInMonths } from "date-fns";

export const seniorityMonthRounded = (seniorityInYear: number): number => {
  const initialDate = new Date();
  const afterDate = new Date();
  afterDate.setFullYear(afterDate.getFullYear() + seniorityInYear + 1);
  const diff = differenceInMonths(afterDate, initialDate);
  return (diff - 12) / 12;
};
