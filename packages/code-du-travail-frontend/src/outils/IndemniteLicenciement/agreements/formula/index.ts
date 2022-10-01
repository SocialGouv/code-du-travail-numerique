import {
  Formula,
  FormuleFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../../store";
import { AgreementFormula1486 } from "./1486";
import { AgreementFormula1597 } from "./1597";
import { AgreementFormula2216 } from "./2216";
import { AgreementFormula2264 } from "./2264";
import { AgreementFormula3239 } from "./3239";
import { AgreementFormula413 } from "./413";
import { AgreementFormula16 } from "./16";
import { AgreementFormula44 } from "./44";

const getAgreementFormula = (
  idcc: SupportedCcIndemniteLicenciement,
  agreementSeniority: SeniorityResult,
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
    case SupportedCcIndemniteLicenciement.IDCC1486 === idcc:
      return new AgreementFormula1486().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC3239 === idcc:
      return new AgreementFormula3239().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC2216 === idcc:
      return new AgreementFormula2216().computeFormula(
        agreementSeniority,
        agreementRefSalary,
        get
      );
    case SupportedCcIndemniteLicenciement.IDCC0016 === idcc:
      return new AgreementFormula16().computeFormula(
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
