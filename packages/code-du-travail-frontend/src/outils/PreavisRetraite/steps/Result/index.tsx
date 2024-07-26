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
import { ErrorPublicodes } from "../../../CommonIndemniteDepart/steps/Resultat/components";

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
    resultReferences,
    resultNotifications,
    noticeUsed,
    hasHandicap,
    isSeniorityLessThan6Months,
    seniorityInMonths,
    publicodesInformations,
    moreThanXYears,
    errorPublicodes,
    result,
  } = usePreavisRetraiteStore(store, (state) => ({
    originDepart: state.originDepartData.input.originDepart,
    agreement: state.agreementData.input.agreement,
    isAgreementSupported: state.resultData.input.isAgreementSupported,
    getPublicodesResult: state.resultFunction.getPublicodesResult,
    legalResult: state.resultData.input.legalResult,
    agreementResult: state.resultData.input.agreementResult,
    agreementMaximumResult: state.resultData.input.agreementMaximumResult,
    resultNotifications: state.resultData.input.resultNotifications,
    resultReferences: state.resultData.input.resultReferences,
    noticeUsed: state.resultData.input.noticeUsed,
    isSeniorityLessThan6Months:
      state.resultData.input.isSeniorityLessThan6Months,
    hasHandicap: state.resultData.input.hasHandicap,
    seniorityInMonths: state.seniorityData.input.seniorityInMonths,
    publicodesInformations: state.resultData.input.publicodesInformations,
    moreThanXYears: state.seniorityData.input.moreThanXYears,
    errorPublicodes: state.resultData.error.errorPublicodes,
    result: state.resultData.input.result,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, []);

  if (errorPublicodes) {
    return <ErrorPublicodes title={"Préavis"} />;
  }

  return (
    <>
      <ShowResult
        notifications={resultNotifications ?? []}
        result={result}
        agreementMaximumResult={agreementMaximumResult}
        type={originDepart!}
        idccNumber={agreement?.num}
      />
      <ShowDetails>
        <Situation
          agreement={agreement}
          isAgreementSupported={isAgreementSupported}
          originDepart={originDepart!}
          seniorityInMonths={seniorityInMonths}
          situations={publicodesInformations ?? []}
          hasHandicap={hasHandicap}
          seniorityMoreThanXYears={moreThanXYears === "oui"}
        />
        <DecryptedResult
          hasAgreement={agreement ? true : false}
          isAgreementSupported={!!isAgreementSupported}
          hasHandicap={!!hasHandicap}
          legalResult={legalResult}
          agreementResult={agreementResult}
          agreementMaximumResult={agreementMaximumResult}
          noticeUsed={noticeUsed!}
          typeDeDepart={originDepart!}
          isSeniorityLessThan6Months={!!isSeniorityLessThan6Months}
        />
        <PubliReferences references={resultReferences ?? []} />
      </ShowDetails>
      <WarningResult
        hasNotice={NoticeUsed.none !== noticeUsed}
        type={getWarningType(
          originDepart,
          agreement?.num,
          result?.value,
          isAgreementSupported
        )}
      />
    </>
  );
};

export default StepResult;
