import { PreavisRetraiteState, PreavisRetraiteStepLabel } from "./types";
import {
  InformationStep,
  IntroductionStep,
  OriginStep,
  ResultStep,
  SeniorityStep,
} from "./steps";

const renderStep = (
  name: PreavisRetraiteStepLabel,
  state: PreavisRetraiteState
): JSX.Element => {
  switch (name) {
    case PreavisRetraiteStepLabel.intro:
      return <IntroductionStep />;
    case PreavisRetraiteStepLabel.origin:
      return <OriginStep {...state.origin} />;
    case PreavisRetraiteStepLabel.agreement:
      return <></>; // TODO <AgreementStep form={""} title={""} />;
    case PreavisRetraiteStepLabel.infos:
      return <InformationStep {...state.informations} />;
    case PreavisRetraiteStepLabel.seniority:
      return <SeniorityStep {...state.seniority} />;
    case PreavisRetraiteStepLabel.result:
      if (state.result) {
        return <ResultStep {...state.result} />;
      }
  }
  return <>ERROR</>;
};

export default renderStep;
