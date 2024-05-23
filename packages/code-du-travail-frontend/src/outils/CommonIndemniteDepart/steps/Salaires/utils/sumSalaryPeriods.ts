import { SalairesStoreInput } from "../store";

export const sumSalaryPeriods = (
  salaryPeriods: SalairesStoreInput["salaryPeriods"]
) => {
  const sum = salaryPeriods.reduce((acc, curr) => {
    if (curr.value !== undefined) {
      return acc + curr.value;
    }
    return acc;
  }, 0);
  return sum;
};
