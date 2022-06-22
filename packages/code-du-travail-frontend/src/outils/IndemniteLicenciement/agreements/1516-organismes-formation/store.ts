import {
  IndemniteLicenciementPublicodes,
  ReferenceSalaryFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../store";
import { mapToPublicodesSituationForIndemniteLicenciement } from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { computeSeniority, generateExplanation } from "../../../common";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { ConventionCollective } from "../../../../common/type/WizardType";

//TODO: à virer
const ccn: ConventionCollective = {
  route: "agreement",
  selected: {
    id: "YYYYY",
    num: 1596,
    shortTitle: "XXX",
    slug: "xxx",
    title: "Title",
  },
};

const initialState: ResultStoreData = {
  input: {
    publicodesResult: null,
    salaireRef: 0,
    seniority: 0,
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice & ContratTravailStoreSlice & SalairesStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    getPublicodesResult: () => {
      const ancienneteInput = get().ancienneteData.input;
      const salaireInput = get().salairesData.input;
      const publicodes = get().resultData.publicodes;
      const sReference = new ReferenceSalaryFactory().create(
        SupportedCcIndemniteLicenciement.IDCC1516
      );

      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const seniority = computeSeniority({
        dateSortie: ancienneteInput.dateSortie!,
        dateEntree: ancienneteInput.dateEntree!,
        absencePeriods: ancienneteInput.absencePeriods!,
      });

      const primes = salaireInput.primes.filter((v) => v !== null) as number[];
      const salaires = salaireInput.salaryPeriods.filter(
        (v) => v.value !== undefined
      ) as { month: string; value: number }[];

      const salaireRef = sReference.computeReferenceSalary({
        hasSameSalaire: salaireInput.hasSameSalaire === "oui",
        primesPendantPreavis: primes,
        salaire: salaireInput.salaireBrut
          ? parseFloat(salaireInput.salaireBrut)
          : undefined,
        salaires,
        salairesPendantPreavis: salaires,
      });

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.salaireRef = salaireRef;
          state.resultData.input.seniority = seniority;
        })
      );
    },
  },
});

export default createResultStore;
