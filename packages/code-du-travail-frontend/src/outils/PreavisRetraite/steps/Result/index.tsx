import React, { useContext, useEffect } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import ShowDetails from "../../../common/ShowDetails";
import WarningResult from "./components/Warning";
import { getWarningType } from "./utils/getWarningType";
import PubliReferences from "../../../common/PubliReferences";
import DecryptedResult from "./components/DecryptedResult";
import ShowResult from "./components/ShowResult";
import { NoticeUsed } from "./utils/types";
import Situation from "./components/Situation";

const StepResult = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const {
    getPublicodesResult,
    originDepart,
    agreement,
    isAgreementSupported,
    legalResult,
    agreementResult,
    agreementMaximumResult,
    legalNotification,
    legalReferences,
    agreementNotification,
    agreementReferences,
    noticeUsed,
    bestResult,
    hasHandicap,
    isSeniorityLessThan6Months,
    seniorityInMonths,
    publicodesInformations,
  } = usePreavisRetraiteStore(store, (state) => ({
    originDepart: state.originDepartData.input.originDepart,
    agreement: state.agreementData.input.agreement,
    isAgreementSupported: state.resultData.input.isAgreementSupported,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    legalResult: state.resultData.input.legalResult,
    agreementResult: state.resultData.input.agreementResult,
    agreementMaximumResult: state.resultData.input.agreementMaximumResult,
    legalNotification: state.resultData.input.legalNotification,
    legalReferences: state.resultData.input.legalReferences,
    agreementNotification: state.resultData.input.agreementNotification,
    agreementReferences: state.resultData.input.agreementReferences,
    noticeUsed: state.resultData.input.noticeUsed,
    bestResult: state.resultData.input.bestResult,
    isSeniorityLessThan6Months:
      state.resultData.input.isSeniorityLessThan6Months,
    hasHandicap: state.resultData.input.hasHandicap,
    seniorityInMonths: state.seniorityData.input.seniorityInMonths,
    publicodesInformations: state.informationsData.input.publicodesInformations,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <>
      <ShowResult
        notifications={
          noticeUsed === NoticeUsed.legal
            ? legalNotification ?? []
            : agreementNotification ?? []
        }
        result={bestResult}
        agreementMaximumResult={agreementMaximumResult}
        type={originDepart!}
        idccNumber={agreement?.num}
      />
      <ShowDetails>
        <Situation
          agreement={agreement}
          hasHandicap={hasHandicap}
          isAgreementSupported={isAgreementSupported}
          originDepart={originDepart!}
          seniorityInMonths={seniorityInMonths}
          situations={publicodesInformations}
        />
        <DecryptedResult
          hasAgreement={!!agreement}
          hasAgreementResult={!!agreementResult}
          isAgreementSupported={!!isAgreementSupported}
          hasHandicap={!!hasHandicap}
          legalResult={legalResult}
          agreementResult={agreementResult}
          agreementMaximumResult={agreementMaximumResult}
          noticeUsed={noticeUsed!}
          typeDeDepart={originDepart!}
          isSeniorityLessThan6Months={!!isSeniorityLessThan6Months}
        />
        <PubliReferences
          references={
            noticeUsed === NoticeUsed.legal || NoticeUsed.same === noticeUsed
              ? legalReferences ?? []
              : agreementReferences ?? []
          }
        />
      </ShowDetails>
      <WarningResult
        hasNotice={NoticeUsed.none !== noticeUsed}
        type={getWarningType(
          originDepart,
          agreement?.num,
          bestResult?.value,
          isAgreementSupported
        )}
      />
    </>
  );
};

export default StepResult;
