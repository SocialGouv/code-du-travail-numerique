import { useIndemniteLicenciementStore } from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";

const InformationsStep = (): JSX.Element => {
  const {
    errorInformations,
    onInformationsChange,
    informations,
    notificationBloquante,
  } = useIndemniteLicenciementStore((state) => ({
    errorInformations: state.informationsData.error.errorInformations,
    onInformationsChange: state.informationsFunction.onInformationsChange,
    informations: state.informationsData.input.publicodesInformations,
    notificationBloquante: state.informationsData.input.notificationBloquante,
  }));

  return (
    <CommonInformationStep
      notificationBloquante={notificationBloquante}
      errors={errorInformations}
      onChange={onInformationsChange}
      informations={informations}
    />
  );
};

export default InformationsStep;
