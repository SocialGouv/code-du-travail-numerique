import React, { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";

const StepOrigin = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const { originDepart, onChangeOriginDepart, errorOriginDepart } =
    usePreavisRetraiteStore(store, (state) => ({
      originDepart: state.originDepartData.input.originDepart,
      onChangeOriginDepart: state.originDepartFunction.onChangeOriginDepart,
      errorOriginDepart: state.originDepartData.error.errorOriginDepart,
    }));

  return (
    <>
      <ShowResult
        result={notice.result}
        agreementMaximumResult={notice.agreement.maximum}
        type={notice.type}
        notifications={notice.notifications}
        idccNumber={detail.values.ccn?.selected?.num}
      />
      <ShowDetails>
        <Situation
          content={detail.values}
          elements={detail.situation}
          minSeniorityYear={detail.minYearCount}
        />
        <DecryptedResult
          data={detail.values}
          legalResult={notice.legal}
          result={notice.result}
          agreement={notice.agreement}
        />
        <PubliReferences references={detail.references} />
      </ShowDetails>
      <WarningResult hasNotice={warning.hasNotice} type={warning.type} />
    </>
  );
};

export default StepOrigin;
