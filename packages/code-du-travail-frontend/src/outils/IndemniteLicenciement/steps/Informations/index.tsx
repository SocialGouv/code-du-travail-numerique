import { useIndemniteLicenciementStore } from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";

const InformationsStep = (): JSX.Element => {
  const {
    errorInformations,
    onInformationsChange,
    informations,
    blockingNotification,
  } = useIndemniteLicenciementStore((state) => ({
    errorInformations: state.informationsData.error.errorInformations,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
    blockingNotification: state.informationsData.input.blockingNotification,
  }));

  return (
    <CommonInformationStep
      blockingNotification={blockingNotification}
      errors={errorInformations}
      onChange={onInformationsChange}
      informations={informations}
    />
  );
};

export default InformationsStep;
