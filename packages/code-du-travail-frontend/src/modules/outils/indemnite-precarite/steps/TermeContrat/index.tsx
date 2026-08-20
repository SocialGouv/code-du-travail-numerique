import React, { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { IssueQuestion, TermeQuestion } from "./components";
import { contractLabel, getIssueOptions } from "./issues";
import { findContractOption } from "../../agreements";
import { CONTRACT_FAMILY } from "../../types";

const TermeContratStepComponent = () => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    agreement,
    contractOptionId,
    input,
    error,
    onFinALaDatePrevueChange,
    onIssueContratChange,
  } = useIndemnitePrecariteStore(store, (state) => ({
    agreement: state.agreementData.input.agreement,
    contractOptionId: state.typeContratData.input.contractOptionId,
    input: state.termeContratData.input,
    error: state.termeContratData.error,
    onFinALaDatePrevueChange:
      state.termeContratFunction.onFinALaDatePrevueChange,
    onIssueContratChange: state.termeContratFunction.onIssueContratChange,
  }));

  const option = findContractOption(contractOptionId, agreement);
  const family = option?.family ?? CONTRACT_FAMILY.CDD;
  const label = contractLabel(family);

  return (
    <div>
      <TermeQuestion
        contractLabel={label}
        value={input.finALaDatePrevue}
        onChange={onFinALaDatePrevueChange}
        error={error.finALaDatePrevue}
      />

      {input.finALaDatePrevue && (
        <div className={fr.cx("fr-mt-3w")}>
          <IssueQuestion
            contractLabel={label}
            options={getIssueOptions(family, input.finALaDatePrevue)}
            value={input.issueContrat}
            onChange={onIssueContratChange}
            error={error.issueContrat}
          />
        </div>
      )}
    </div>
  );
};

export default TermeContratStepComponent;
