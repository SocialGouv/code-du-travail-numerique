import { useIndemniteLicenciementStore } from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";

const InformationsStep = (): JSX.Element => {
  const { errorInformations, onInformationsChange, informations, alertError } =
    useIndemniteLicenciementStore((state) => ({
      errorInformations: state.informationsData.error.errorInformations,
      onInformationsChange: state.informationsFunction.onInformationsChange,
      informations: state.informationsData.input.publicodesInformations,
      alertError: state.informationsData.error.alertError,
    }));

  return (
    <CommonInformationStep
      alertError={alertError}
      errors={errorInformations}
      onChange={onInformationsChange}
      informations={informations}
    />
  );
};

export default InformationsStep;
