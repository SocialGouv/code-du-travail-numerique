import {
  IndemniteLicenciementPublicodes,
  PublicodesIndemniteLicenciementResult,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "@socialgouv/modeles-social";
import { StoreSlice } from "../../../../types";
import {
  mapToPublicodesSituationForIndemniteLicenciementConventionnel,
  mapToPublicodesSituationForIndemniteLicenciementLegal,
} from "../../../../publicodes";
import { AncienneteStoreSlice } from "../../Anciennete/store";
import { generateExplanation } from "../../../common";
import { ContratTravailStoreSlice } from "../../ContratTravail/store";
import { SalairesStoreSlice } from "../../Salaires/store";
import produce from "immer";

import { ResultStoreData, ResultStoreSlice } from "./types";
import { CommonAgreementStoreSlice } from "../../Agreement/store";

const initialState: ResultStoreData = {
  input: {
    publicodesLegalResult: null,
    publicodesAgreementResult: null,
  },
  error: {},
  hasBeenSubmit: true,
  isStepValid: true,
};

const createResultStore: StoreSlice<
  ResultStoreSlice,
  AncienneteStoreSlice &
    ContratTravailStoreSlice &
    SalairesStoreSlice &
    CommonAgreementStoreSlice
> = (set, get, publicodesRules) => ({
  resultData: {
    ...initialState,
    publicodes: new IndemniteLicenciementPublicodes(publicodesRules!),
  },
  resultFunction: {
    getPublicodesResult: () => {
      const refSalary = get().salairesData.input.refSalary;
      const agreementParameters = get().salairesData.input.agreementParameters;
      const agreementRefSalary = get().salairesData.input.agreementRefSalary;
      const agreement = get().agreementData.input.agreement;
      const isLicenciementInaptitude =
        get().contratTravailData.input.licenciementInaptitude === "oui";
      const publicodes = get().resultData.publicodes;
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const factory = new SeniorityFactory().create(
        SupportedCcIndemniteLicenciement.default
      );
      const legalSeniority = factory.computeSeniority({
        dateEntree: get().ancienneteData.input.dateEntree!,
        dateSortie: get().ancienneteData.input.dateSortie!,
        absencePeriods: get().ancienneteData.input.absencePeriods,
      });

      const publicodesSituationLegal = publicodes.setSituation(
        mapToPublicodesSituationForIndemniteLicenciementLegal(
          legalSeniority,
          refSalary,
          isLicenciementInaptitude
        )
      );

      let publicodesSituationConventionnel: PublicodesIndemniteLicenciementResult;
      let ancienneteConventionnel: number;

      if (agreement) {
        const factory = new SeniorityFactory().create(
          `IDCC${agreement.num}` as SupportedCcIndemniteLicenciement
        );
        const agreementSeniority = factory.computeSeniority({
          dateEntree: get().ancienneteData.input.dateEntree!,
          dateSortie: get().ancienneteData.input.dateSortie!,
          absencePeriods: get().ancienneteData.input.absencePeriods,
        });

        publicodes.setSituation(
          mapToPublicodesSituationForIndemniteLicenciementConventionnel(
            agreement.num,
            agreementSeniority,
            agreementRefSalary ?? refSalary,
            agreementParameters
          )
        );

        publicodesSituationConventionnel = publicodes.execute(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
      }

      const infoCalcul = generateExplanation({
        anciennete: legalSeniority,
        inaptitude: isLicenciementInaptitude,
        salaireRef: refSalary,
      });

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.publicodesLegalResult =
            publicodesSituationLegal.result;
          state.resultData.input.publicodesAgreementResult =
            publicodesSituationConventionnel ?? null;
          state.resultData.input.infoCalcul = infoCalcul;
        })
      );
    },
  },
});

export default createResultStore;
