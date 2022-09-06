import {
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../store";

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
    case SupportedCcIndemniteLicenciement.IDCC1516 === idcc: {
      const ccInput = get().agreement1516Data.input;
      const sReference = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1516
      );
      return sReference.computeReferenceSalary({
        salairesPendantPreavis: ccInput.salaryPeriods ?? [],
        salaires: salaries,
      });
    }
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc: {
      const sReference = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.IDCC413
      );
      return sReference.computeReferenceSalary({
        salaires: salaries,
      });
    }
    case SupportedCcIndemniteLicenciement.IDCC1527 === idcc: {
      const ccInput = get().agreement1527Data.input;
      const sReference = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1527
      );
      return sReference.computeReferenceSalary({
        salaires: salaries,
        hasCommission: ccInput.hasCommission === "oui",
        salaryContract: Number(ccInput.contractSalary),
      });
    }
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
