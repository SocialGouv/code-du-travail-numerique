import {
  Formula,
  FormuleFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../../store";
import { AgreementFormula1597 } from "./1597";
import { AgreementFormula2264 } from "./2264";
import { AgreementFormula413 } from "./413";

const getAgreementFormula = (
  idcc: SupportedCcIndemniteLicenciement,
  agreementSeniority: number,
  agreementRefSalary: number,
  get: GetState<MainStore>
): Formula => {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC2264 === idcc:
      return new AgreementFormula2264().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc:
      return new AgreementFormula413().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC1597 === idcc:
      return new AgreementFormula1597().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    default: {
      const agreementFactoryFormula = new FormuleFactory().create(idcc);
      return agreementFactoryFormula.computeFormula({
        seniority: agreementSeniority,
        refSalary: agreementRefSalary,
      });
    }
  }
};

export default getAgreementFormula;

export interface AgreementFormula {
  computeFormula: (
    agreementSeniority: number,
    agreementRefSalary: number,
    get: GetState<MainStore>
  ) => Formula;
}
