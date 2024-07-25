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
          preavisRetraite && idcc === agreement?.num
      );
      if (!publicodes) {
        throw new Error("Publicodes is not defined");
      }

      let errorPublicodes: boolean;
      let agreementResult: PublicodesPreavisRetraiteResult | undefined;
      let legalResult: PublicodesPreavisRetraiteResult | undefined;
      let agreementMaximumResult: PublicodesPreavisRetraiteResult | undefined;
      let legalNotification: Notification[] | undefined;
      let legalReferences: References[] | undefined;
      let agreementNotification: Notification[] | undefined;
      let agreementReferences: References[] | undefined;

      const infos = informationToSituation(
        get().informationsData.input.publicodesInformations
      );

      const situation = mapToPublicodesSituationForCalculationPreavisRetraite(
        get().originDepartData.input.originDepart!,
        getSeniorityInMonths(
          get().seniorityData.input.moreThanXYears,
          get().seniorityData.input.seniorityInMonths,
          get().agreementData.input.agreement
        ),
        agreement?.num,
        infos
      );

      const publicodesInformations = get()
        .informationsData.input.publicodesInformations.map((v) => {
          if (v.question.rule.titre && v.info) {
            return {
              label: v.question.rule.titre,
              value: v.info,
              unit: v.question.rule.unité,
            };
          }
        })
        .filter((v) => v !== undefined) as AgreementInformation[];

      try {
        publicodes.setSituation(situation);

        legalResult = publicodes.execute(
          "contrat salarié . préavis de retraite légale en jours"
        );

        legalNotification = publicodes.getNotifications();

        legalReferences = publicodes.getReferences();

        agreementResult = publicodes.execute(
          "contrat salarié . préavis de retraite collective en jours"
        );

        agreementNotification = publicodes.getNotifications();

        agreementReferences = publicodes.getReferences();

        agreementMaximumResult = publicodes.execute(
          "contrat salarié . préavis de retraite collective maximum en jours"
        );
      } catch (e) {
        errorPublicodes = true;
        console.error(`La situation est ${JSON.stringify(situation)}`);
        console.error(
          `Les informations issues de publicodes sont ${JSON.stringify(infos)}`
        );
        console.error(`L'erreur remontée est : ${JSON.stringify(e)}`);
        Sentry.captureException(e);
      }

      const bestResult =
        agreementResult?.valueInDays! > legalResult?.valueInDays!
          ? agreementResult
          : legalResult;

      let noticeUsed = NoticeUsed.none;
      if (
        (legalResult &&
          legalResult.valueInDays > 0 &&
          legalResult.valueInDays === agreementResult?.valueInDays) ??
        -1
      ) {
        noticeUsed = NoticeUsed.same;
      } else if (
        bestResult &&
        bestResult.valueInDays > 0 &&
        bestResult.valueInDays === legalResult?.valueInDays
      ) {
        noticeUsed = NoticeUsed.legal;
      } else if (
        bestResult &&
        bestResult.valueInDays > 0 &&
        bestResult.valueInDays === agreementResult?.valueInDays
      ) {
        noticeUsed = NoticeUsed.agreementLabor;
      }

      set(
        produce((state: ResultStoreSlice) => {
          state.resultData.input.agreementResult = agreementResult;
          state.resultData.input.legalResult = legalResult;
          state.resultData.input.agreementMaximumResult =
            agreementMaximumResult;
          state.resultData.input.bestResult = bestResult;
          state.resultData.input.noticeUsed = noticeUsed;
          state.resultData.input.isAgreementSupported = isAgreementSupported;
          state.resultData.input.agreementNotification = agreementNotification;
          state.resultData.input.agreementReferences = agreementReferences;
          state.resultData.input.legalNotification = legalNotification;
          state.resultData.input.legalReferences = legalReferences;
          state.resultData.input.isSeniorityLessThan6Months =
            Number(get().seniorityData.input.seniorityInMonths) < 6;
          state.resultData.input.hasHandicap =
            get().informationsData.input.publicodesInformations.find(
              (v) =>
                v.question.name === "contrat salarié - travailleur handicapé" &&
                v.info === "'Oui'"
            ) !== undefined;
          state.resultData.input.publicodesInformations =
            publicodesInformations;
        })
      );
    },
  },
});

export default createResultStore;
