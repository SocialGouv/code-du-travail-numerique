import {
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
  SeniorityResult,
} from "@socialgouv/modeles-social";
import { GetState } from "zustand";
import { MainStore } from "../../store";

const getAgreementSeniority = (
  idcc: SupportedCcIndemniteLicenciement,
  get: GetState<MainStore>
): SeniorityResult => {
  switch (true) {
    default: {
      return new SeniorityFactory().create(idcc).computeSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateSortie: get().ancienneteData.input.dateSortie!,
        absencePeriods: get().ancienneteData.input.absencePeriods,
      });
    }
  }
};

export default getAgreementSeniority;
