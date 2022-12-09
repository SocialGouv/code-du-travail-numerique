import {
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
  SeniorityResult,
  SalaryPeriods,
  Absence,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { MainStore } from "../../store";
import { AgreementSalary1527 } from "../salary/1527";
import { AgreementSeniority16 } from "./16";

const getAgreementSeniority = (
  idcc: SupportedCcIndemniteLicenciement,
  get: StoreApi<MainStore>["getState"]
): SeniorityResult => {
  const dateEntree = get().ancienneteData.input.dateEntree!;
  const dateSortie = get().ancienneteData.input.dateSortie!;
  const absencePeriods = get().ancienneteData.input.absencePeriods;
  const defaultValues = { dateEntree, dateSortie, absencePeriods };

  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC0016 === idcc:
      return new AgreementSeniority16().computeSeniority({
        ...defaultValues,
        get,
      });
    default: {
      return new SeniorityFactory()
        .create(idcc)
        .computeSeniority(defaultValues);
    }
  }
};

export default getAgreementSeniority;

export interface AgreementSeniority {
  computeSeniority: (data: {
    dateEntree: string;
    dateSortie: string;
    absencePeriods: Absence[];
    get: StoreApi<MainStore>["getState"];
  }) => SeniorityResult;
}

export * from "./validator";
