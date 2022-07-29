import { useIndemniteLicenciementStore } from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";

const InformationsStep = (): JSX.Element => {
  const {
    errorInformations,
    onInformationsChange,
    informations,
    alertError,
    publicodesQuestions,
  } = useIndemniteLicenciementStore((state) => ({
    errorInformations: state.informationsData.error.errorInformations,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.informations,
    alertError: state.informationsData.error.alertError,
    publicodesQuestions: state.informationsData.input.publicodesQuestions,
  }));

  return (
    <CommonInformationStep
      alertError={alertError}
      errors={errorInformations}
      onChange={onInformationsChange}
      values={informations}
      questions={publicodesQuestions}
    />
  );
};

export default InformationsStep;
