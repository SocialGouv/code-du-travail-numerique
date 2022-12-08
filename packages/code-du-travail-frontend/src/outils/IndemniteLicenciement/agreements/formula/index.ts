import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../../store";
import { AgreementFormula1596 } from "./1596";
import { AgreementFormula650 } from "./650";
import { AgreementFormula573 } from "./573";
import { AgreementFormula44 } from "./44";

const getAgreementFormula = (
  idcc: SupportedCcIndemniteLicenciement,
  agreementSeniority: SeniorityResult,
  agreementRefSalary: number,
  get: GetState<MainStore>
): Formula | undefined => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1596 === idcc:
      return new AgreementFormula1596().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC650 === idcc:
      return new AgreementFormula650().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC0573 === idcc:
      return new AgreementFormula573().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC0044 === idcc:
      return new AgreementFormula44().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    default: {
      const agreementFactoryFormula = new FormuleFactory().create(idcc);
      if (!agreementFactoryFormula) return undefined;
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority.value,
        refSalary: agreementRefSalary,
      });
    }
  }
};

export default getAgreementFormula;

export interface AgreementFormula {
  computeFormula: (
    agreementSeniority: SeniorityResult,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ) => Formula;
}
