import React, { useContext, useEffect } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import ShowDetails from "../../../common/ShowDetails";
import WarningResult from "./components/Warning";
import { getWarningType } from "./utils/getWarningType";
import PubliReferences from "../../../common/PubliReferences";
import DecryptedResult from "./components/DecryptedResult";
import ShowResult from "./components/ShowResult";
import Situation from "./components/Situation";
import { NoticeUsed } from "./utils/types";

const StepResult = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const {
    getPublicodesResult,
    originDepart,
    agreement,
    isAgreementSupported,
    hasNotice,
    legalResult,
    agreementResult,
    agreementMaximumResult,
    legalNotification,
    legalReferences,
    agreementNotification,
    agreementReferences,
    noticeUsed,
    bestResult,
  } = usePreavisRetraiteStore(store, (state) => ({
    originDepart: state.originDepartData.input.originDepart,
    agreement: state.agreementData.input.agreement,
    isAgreementSupported: state.resultData.input.isAgreementSupported,
    hasNotice: state.resultData.input.hasNotice,
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
  }));

  useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <>
      <ShowResult
        notifications={
          noticeUsed === NoticeUsed.legal
            ? legalNotification
            : agreementNotification
        }
        references={
          noticeUsed === NoticeUsed.legal
            ? legalReferences
            : agreementReferences
        }
        result={noticeUsed === NoticeUsed.legal ? legalResult : agreementResult}
      />
      <ShowDetails>
        <DecryptedResult
          hasAgreement={!!agreement}
          hasAgreementResult={!!bestResult}
          isAgreementSupported={isAgreementSupported}
          hasHandicap={notice.hasHandicap}
          legalResult={notice.result}
          agreementMaximumResult={notice.agreement.maximum}
        />
        <PubliReferences references={formatRefs(refs)} />
      </ShowDetails>
      <WarningResult
        hasNotice={!!hasNotice}
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
