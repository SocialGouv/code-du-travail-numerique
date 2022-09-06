import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../../store";
import { AgreementSalary1486 } from "./1486";
import { AgreementSalary1516 } from "./1516";
import { AgreementSalary1527 } from "./1527";
import { AgreementSalary413 } from "./413";

const getAgreementReferenceSalary = (
  idcc: SupportedCcIndemniteLicenciement,
  get: GetState<MainStore>
): number => {
  const salaryInput = get().salairesData.input;
  let salaries = salaryInput.salaryPeriods;
  const { salary } = salaryInput;

  if (salary) {
    const parseSalary = parseFloat(salary);
    salaries = salaryInput.salaryPeriods.map((v) => ({
      ...v,
      value: parseSalary,
      prime: undefined,
    }));
  }

  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === idcc:
      return new AgreementSalary1516().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc:
      return new AgreementSalary413().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC1486 === idcc:
      return new AgreementSalary1486().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC1527 === idcc:
      return new AgreementSalary1527().computeSalary(salaries, get);
    default: {
      const sReference = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      return sReference.computeReferenceSalary({
        salaires: salaries,
      });
    }
  }
};

export default getAgreementReferenceSalary;

export interface AgreementSalary {
  computeSalary: (
    salaryPeriods: SalaryPeriods[],
    get: GetState<MainStore>
  ) => number;
}
