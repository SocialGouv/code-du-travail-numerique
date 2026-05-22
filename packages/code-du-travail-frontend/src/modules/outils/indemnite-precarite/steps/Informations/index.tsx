import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { ContractTypeQuestion, CriteriaQuestions } from "./components";
import AgreementsInjector from "../../agreements/AgreementsInjector";
import { IndemnitePrecariteStepName } from "../../types";

const InformationsStepComponent = () => {
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
    agreement,
  } = useIndemnitePrecariteStore(store, (state) => ({
    errors: state.informationsData.error,
    onContractTypeChange: state.informationsFunction.onContractTypeChange,
    onCriteriaChange: state.informationsFunction.onCriteriaChange,
    onCDDQuestionChange: state.informationsFunction.onCDDQuestionChange,
    onCTTQuestionChange: state.informationsFunction.onCTTQuestionChange,
    agreement: state.agreementData.input.agreement,
    contractType: state.informationsData.input.contractType,
    criteria: state.informationsData.input.criteria,
    input: state.informationsData.input,
  }));

  return (
    <div>
      <ContractTypeQuestion
        value={contractType}
        onChange={onContractTypeChange}
        error={errors.contractType}
      />

      {contractType && (
        <>
          <CriteriaQuestions
            contractType={contractType}
            criteria={criteria}
            input={input}
            onChange={onCriteriaChange}
            onCDDQuestionChange={onCDDQuestionChange}
            onCTTQuestionChange={onCTTQuestionChange}
            errors={errors}
          />

          {agreement && (
            <AgreementsInjector
              idcc={agreement.num}
              step={IndemnitePrecariteStepName.InfosGenerales}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InformationsStepComponent;
