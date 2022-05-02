import React from "react";
import {
  DecryptedResult,
  ShowResult,
  Situation,
  WarningResult,
} from "./Components";
import {
  Notification,
  PublicodesPreavisRetraiteResult,
  References,
  SituationElement,
} from "@socialgouv/modeles-social";
import ShowDetails from "../../../common/ShowDetails";
import PubliReferences from "../../../common/PubliReferences";
import { PreavisRetraiteFormState } from "../../form";

export type ResultStepProps = {
  notice: {
    result: PublicodesPreavisRetraiteResult;
    legal: PublicodesPreavisRetraiteResult;
    agreement: {
      result: PublicodesPreavisRetraiteResult;
      maximum: PublicodesPreavisRetraiteResult;
    };
    type: "mise" | "départ";
    notifications: Notification[];
  };
  detail: {
    values: PreavisRetraiteFormState;
    situation: SituationElement[];
    references: References[];
  };
};

function ResultStep({ notice, detail }: ResultStepProps): JSX.Element {
  return (
    <>
      <ShowResult
        result={notice.result}
        agreementMaximumResult={notice.agreement.maximum}
        type={notice.type}
        notifications={notice.notifications}
      />
      <ShowDetails>
        <Situation content={detail.values} elements={detail.situation} />
        <DecryptedResult
          data={detail.values}
          legalResult={notice.legal}
          result={notice.result}
          agreement={notice.agreement}
        />
        <PubliReferences references={detail.references} />
      </ShowDetails>
      <WarningResult
        resultValueInDays={notice.result.valueInDays}
        type={notice.type}
        ccNumber={detail.values?.ccn?.selected?.num}
      />
    </>
  );
}

export default ResultStep;
