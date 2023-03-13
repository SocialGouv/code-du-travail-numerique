import {
  ReferenceSalaryFactory,
  SalaryPeriods,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { MainStore } from "../../store";
import { AgreementSalary1486 } from "./1486";
import { AgreementSalary1516 } from "./1516";
import { AgreementSalary1527 } from "./1527";
import { AgreementSalary3239 } from "./3239";
import { AgreementSalary413 } from "./413";
import { AgreementSalary16 } from "./16";
import { AgreementSalary44 } from "./44";
import { AgreementSalary29 } from "./29";
import { AgreementSalary573 } from "./573";
import { AgreementSalary2609 } from "./2609";

const getAgreementReferenceSalary = (
  idcc: SupportedCcIndemniteLicenciement | null,
  get: StoreApi<MainStore>["getState"]
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
    case SupportedCcIndemniteLicenciement.IDCC3239 === idcc:
      return new AgreementSalary3239().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC0016 === idcc:
      return new AgreementSalary16().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC0029 === idcc:
      return new AgreementSalary29().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC0044 === idcc:
      return new AgreementSalary44().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC0573 === idcc:
      return new AgreementSalary573().computeSalary(salaries, get);
    case SupportedCcIndemniteLicenciement.IDCC2609 === idcc:
      return new AgreementSalary2609().computeSalary(salaries, get);
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
    get: StoreApi<MainStore>["getState"]
  ) => number;
}
