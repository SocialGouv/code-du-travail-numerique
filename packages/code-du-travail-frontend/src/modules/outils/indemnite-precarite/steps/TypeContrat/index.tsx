import React, { useContext } from "react";
import {
  IndemnitePrecariteContext,
  useIndemnitePrecariteStore,
} from "../store";
import { ContractTypeQuestion } from "./components";
import { getContractOptions } from "../../agreements";

const TypeContratStepComponent = () => {
  const store = useContext(IndemnitePrecariteContext);
  const { agreement, contractOptionId, error, onContractOptionChange } =
    useIndemnitePrecariteStore(store, (state) => ({
      agreement: state.agreementData.input.agreement,
      contractOptionId: state.typeContratData.input.contractOptionId,
      error: state.typeContratData.error.contractOptionId,
      onContractOptionChange: state.typeContratFunction.onContractOptionChange,
    }));

  return (
    <ContractTypeQuestion
      options={getContractOptions(agreement)}
      value={contractOptionId}
      onChange={onContractOptionChange}
      error={error}
    />
  );
};

export default TypeContratStepComponent;
