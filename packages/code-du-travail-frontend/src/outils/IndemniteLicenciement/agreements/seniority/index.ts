import {
  Absence,
  RequiredSeniorityResult,
  SeniorityFactory,
  SeniorityResult,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreApi } from "zustand";
import { MainStore } from "../../store";
import { AgreementSeniority16 } from "./16";
import { AgreementSeniority413 } from "./413";

export const getAgreementSeniority = (
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
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc:
      return new AgreementSeniority413().computeSeniority({
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

export const getAgreementRequiredSeniority = (
  idcc: SupportedCcIndemniteLicenciement,
  get: StoreApi<MainStore>["getState"]
): RequiredSeniorityResult => {
  const dateEntree = get().ancienneteData.input.dateEntree!;
  const dateSortie = get().ancienneteData.input.dateSortie!;
  const dateNotification = get().ancienneteData.input.dateNotification!;
  const absencePeriods = get().ancienneteData.input.absencePeriods;
  const defaultValues = {
    dateEntree,
    dateNotification,
    dateSortie,
    absencePeriods,
  };

  return new SeniorityFactory()
    .create(idcc)
    .computeRequiredSeniority(defaultValues);
};

export interface AgreementSeniority {
  computeSeniority: (data: {
    dateEntree: string;
    dateSortie: string;
    absencePeriods: Absence[];
    get: StoreApi<MainStore>["getState"];
  }) => SeniorityResult;
}

export * from "./validator";
