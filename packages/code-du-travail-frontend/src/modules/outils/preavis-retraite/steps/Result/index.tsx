import React, { useContext, useEffect } from "react";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";
import WarningResult from "./components/Warning";
import { getWarningType } from "./utils/getWarningType";
import DecryptedResult from "./components/DecryptedResult";
import ShowResult from "./components/ShowResult";
import { NoticeUsed } from "./utils/types";
import Situation from "./components/Situation";
import ErrorPublicodes from "src/modules/outils/indemnite-depart/steps/Resultat/components/ErrorPublicodes";
import { PubliReferences } from "src/modules/outils/common/components";
import { fr } from "@codegouvfr/react-dsfr";

const StepResult = () => {
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
    agreementRoute,
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
    agreementRoute: state.agreementData.input.route,
  }));

  useEffect(() => {
    getPublicodesResult();
  }, []);

  if (errorPublicodes) {
    return <ErrorPublicodes title={"Préavis"} />;
  }

  return (
    <div className={fr.cx("fr-col-md-8", "fr-col-12", "fr-mb-6w")}>
      <ShowResult
        notifications={resultNotifications ?? []}
        result={result}
        agreementMaximumResult={agreementMaximumResult}
        type={originDepart!}
        idccNumber={agreement?.num}
      />
      <WarningResult
        hasNotice={NoticeUsed.none !== noticeUsed}
        type={getWarningType(
          originDepart,
          agreement?.num,
          result?.value,
          isAgreementSupported
        )}
      />
      <h2 className={fr.cx("fr-h4")}>Détail du calcul</h2>
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
        agreementRoute={agreementRoute}
      />
      <PubliReferences
        references={resultReferences ?? []}
        classNameTitle={fr.cx("fr-h5", "fr-mb-0")}
      />
    </div>
  );
};

export default StepResult;
