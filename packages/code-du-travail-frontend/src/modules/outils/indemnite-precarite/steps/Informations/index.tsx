import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { ContractTypeQuestion, CriteriaQuestions } from "./components";

const InformationsStepComponent = (): JSX.Element => {
  const store = useContext(IndemnitePrecariteContext);
  const {
    errors,
    onContractTypeChange,
    onCriteriaChange,
    onCDDQuestionChange,
    onCTTQuestionChange,
    contractType,
    criteria,
    input,
  } = useIndemnitePrecariteStore(store, (state) => ({
    errors: state.informationsData.error,
    onContractTypeChange: state.informationsFunction.onContractTypeChange,
    onCriteriaChange: state.informationsFunction.onCriteriaChange,
    onCDDQuestionChange: state.informationsFunction.onCDDQuestionChange,
    onCTTQuestionChange: state.informationsFunction.onCTTQuestionChange,
    onConventionQuestionChange:
      state.informationsFunction.onConventionQuestionChange,
    agreement: state.agreementData.input.agreement,
    contractType: state.informationsData.input.contractType,
    criteria: state.informationsData.input.criteria,
    input: state.informationsData.input,
  }));

  return (
    <div>
      {/* Question sur le type de contrat */}
      <ContractTypeQuestion
        value={contractType}
        onChange={onContractTypeChange}
        error={errors.contractType}
      />

      {contractType && (
        <CriteriaQuestions
          contractType={contractType}
          criteria={criteria}
          input={input}
          onChange={onCriteriaChange}
          onCDDQuestionChange={onCDDQuestionChange}
          onCTTQuestionChange={onCTTQuestionChange}
          errors={errors}
        />
      )}
    </div>
  );
};

export default InformationsStepComponent;
