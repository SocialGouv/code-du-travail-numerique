import produce from "immer";
import { StoreSliceWrapperPreavisRetraite } from "../../store";
import * as Sentry from "@sentry/nextjs";
import { ResultStoreData, ResultStoreSlice } from "./types";
import { InformationsStoreSlice } from "../../Informations/store";
import { OriginDepartStoreSlice } from "../../OriginStep/store";
import { AgreementStoreSlice } from "../../Agreement/store";
import { mapToPublicodesSituationForCalculationPreavisRetraite } from "../../../../publicodes";
import { informationToSituation } from "../../../../Components/Informations/utils";
import { SeniorityStoreSlice } from "../../Seniority/store";
import {
  PublicodesPreavisRetraiteResult,
  References,
  Notification,
  supportedCcn,
} from "@socialgouv/modeles-social";
import { NoticeUsed } from "../utils/types";
import { AgreementInformation } from "../../../../CommonIndemniteDepart/common";
import { getSeniorityInMonths } from "../../../agreements/seniority/getSeniority";
import { getValueForPublicodesResult } from "../utils/getValueForPublicodesResult";

const initialState: ResultStoreData = {
  input: {},
  error: {},
  hasBeenSubmit: false,
  isStepValid: true,
};

const createResultStore: StoreSliceWrapperPreavisRetraite<
  ResultStoreSlice,
  InformationsStoreSlice &
    OriginDepartStoreSlice &
    AgreementStoreSlice &
    SeniorityStoreSlice
> = (set, get) => ({
  resultData: { ...initialState },
  resultFunction: {
    getPublicodesResult: () => {
      const agreement = get().agreementData.input.agreement;
      const publicodes = get().agreementData.publicodes;
      const isAgreementSupported = !!supportedCcn.find(
        ({ preavisRetraite, idcc }) =>
          preavisRetraite && idcc === agreement?.num,
      );
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      const isSeniorityLessThan6Months =
        Number(get().seniorityData.input.seniorityInMonths) < 6;

      const hasHandicap =
        get().informationsData.input.publicodesInformations.find(
          (v) =>
            v.question.name === "contrat salarié - travailleur handicapé" &&
            v.info === "'Oui'",
        ) !== undefined;

      let errorPublicodes: boolean = false;
      let result: PublicodesPreavisRetraiteResult | undefined;
      let agreementResult: PublicodesPreavisRetraiteResult | undefined;
      let legalResult: PublicodesPreavisRetraiteResult | undefined;
      let agreementMaximumResult: PublicodesPreavisRetraiteResult | undefined;
      let resultNotifications: Notification[] | undefined;
      let resultReferences: References[] | undefined;
      let noticeUsed = NoticeUsed.none;

      const infos = informationToSituation(
        get().informationsData.input.publicodesInformations,
      );

      const situation = mapToPublicodesSituationForCalculationPreavisRetraite(
        get().originDepartData.input.originDepart!,
        getSeniorityInMonths(
          get().seniorityData.input.moreThanXYears,
          get().seniorityData.input.seniorityInMonths,
          get().agreementData.input.agreement,
        ),
        agreement?.num,
        infos,
      );

      const publicodesInformations = get()
        .informationsData.input.publicodesInformations.map((v) => {
          if (v.question.rule.titre && v.info) {
            return {
              label: v.question.rule.titre,
              value: getValueForPublicodesResult(v),
              unit: v.question.rule.unité,
            };
          }
        })
        .filter((v) => v !== undefined) as AgreementInformation[];

      try {
        const publicodesCalculation = publicodes.setSituation(situation);

        result = publicodesCalculation.result;

        resultNotifications = publicodes.getNotifications();

        resultReferences = publicodes.getReferences();

        legalResult = publicodes.execute(
          "contrat salarié . préavis de retraite légale en jours",
        );

        agreementResult = publicodes.execute(
          "contrat salarié . préavis de retraite collective en jours",
        );

        agreementMaximumResult = publicodes.execute(
          "contrat salarié . préavis de retraite collective maximum en jours",
        );

        if (
          legalResult &&
          agreementResult &&
          legalResult.valueInDays > 0 &&
          legalResult.valueInDays === agreementResult.valueInDays
        ) {
          noticeUsed = NoticeUsed.same;
        } else if (
          legalResult &&
          result.valueInDays > 0 &&
          result.valueInDays === legalResult.valueInDays
        ) {
          noticeUsed = NoticeUsed.legal;
        } else if (
          agreementResult &&
          result.valueInDays > 0 &&
          result.valueInDays === agreementResult.valueInDays
        ) {
          noticeUsed = NoticeUsed.agreementLabor;
        }
      } catch (e) {
        errorPublicodes = true;
        console.error(`La situation est ${JSON.stringify(situation)}`);
        console.error(
          `Les informations issues de publicodes sont ${JSON.stringify(infos)}`,
        );
        console.error(`L'erreur remontée est : ${JSON.stringify(e)}`);
        Sentry.captureException(e);
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.agreementResult = agreementResult;
          state.resultData.input.legalResult = legalResult;
          state.resultData.input.agreementMaximumResult =
            agreementMaximumResult;
          state.resultData.input.noticeUsed = noticeUsed;
          state.resultData.input.isAgreementSupported = isAgreementSupported;
          state.resultData.input.resultNotifications = resultNotifications;
          state.resultData.input.resultReferences = resultReferences;
          state.resultData.input.isSeniorityLessThan6Months =
            isSeniorityLessThan6Months;
          state.resultData.input.hasHandicap = hasHandicap;
          state.resultData.input.publicodesInformations =
            publicodesInformations;
          state.resultData.error.errorPublicodes = errorPublicodes;
          state.resultData.input.result = result;
        }),
      );
    },
  },
});

export default createResultStore;
