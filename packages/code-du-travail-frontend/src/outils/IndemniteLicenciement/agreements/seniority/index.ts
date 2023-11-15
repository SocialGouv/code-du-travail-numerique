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
import { AgreementSeniority1672 } from "./1672";
import { AgreementSeniority3248 } from "./3248";
import { AgreementSeniority650 } from "./650";

export const getAgreementSeniority = (
  idcc: SupportedCcIndemniteLicenciement | null,
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
    case SupportedCcIndemniteLicenciement.IDCC1672 === idcc:
      return new AgreementSeniority1672().computeSeniority({
        ...defaultValues,
        get,
      });
    case SupportedCcIndemniteLicenciement.IDCC413 === idcc:
      return new AgreementSeniority413().computeSeniority({
        ...defaultValues,
        get,
      });
    case SupportedCcIndemniteLicenciement.IDCC3248 === idcc:
      return new AgreementSeniority3248().computeSeniority({
        ...defaultValues,
        get,
      });
    case SupportedCcIndemniteLicenciement.IDCC650 === idcc:
      return new AgreementSeniority650().computeSeniority({
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
  idcc: SupportedCcIndemniteLicenciement | null,
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

  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC3248 === idcc:
      return new AgreementSeniority3248().computeSeniority({
        ...defaultValues,
        dateSortie: dateNotification,
        get,
      });
    case SupportedCcIndemniteLicenciement.IDCC650 === idcc:
      return new AgreementSeniority650().computeSeniority({
        ...defaultValues,
        dateSortie: dateNotification,
        get,
      });
    default: {
      return new SeniorityFactory()
        .create(idcc)
        .computeRequiredSeniority(defaultValues);
    }
  }
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
