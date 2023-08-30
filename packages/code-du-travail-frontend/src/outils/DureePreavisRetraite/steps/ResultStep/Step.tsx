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

export enum WarningType {
  noNoticeWithAgreement = "no_notice_with_agreement",
  noNoticeWithoutAgreement = "no_notice_without_agreement",
  departWithAgreement = "depart_with_agreement",
  miseWithAgreement = "mise_with_agreement",
  departWithoutAgreement = "depart_without_agreement",
  miseWithoutAgreement = "mise_without_agreement",
  miseWithoutCollectiveAgreement = "mise_without_collective_agreement",
  departWithoutCollectiveAgreement = "depart_without_collective_agreement",
}

export type ResultStepProps = {
  notice: {
    result: PublicodesPreavisRetraiteResult;
    legal: PublicodesPreavisRetraiteResult;
    agreement: {
      result: PublicodesPreavisRetraiteResult;
      maximum: PublicodesPreavisRetraiteResult | null;
    };
    type: "mise" | "départ";
    notifications: Notification[];
  };
  detail: {
    values: PreavisRetraiteFormState;
    situation: SituationElement[];
    minYearCount: number;
    references: References[];
  };
  warning: {
    type: WarningType | null;
    hasNotice: boolean;
  };
};

function ResultStep({ notice, detail, warning }: ResultStepProps): JSX.Element {
  return (
    <>
      <ShowResult
        result={notice.result}
        agreementMaximumResult={notice.agreement.maximum}
        type={notice.type}
        notifications={notice.notifications}
      />
      <ShowDetails autoFocus>
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
}

export default ResultStep;
