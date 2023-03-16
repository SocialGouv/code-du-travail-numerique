import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";
import { useContext } from "react";

const InformationsStep = (): JSX.Element => {
  const store = useContext(IndemniteLicenciementContext);
  const { errorInformations, onInformationsChange, informations } =
    useIndemniteLicenciementStore(store, (state) => ({
      errorInformations: state.informationsData.error.errorInformations,
      onInformationsChange: state.informationsFunction.onInformationsChange,
      informations: state.informationsData.input.publicodesInformations,
    }));

  return (
    <CommonInformationStep
      errors={errorInformations}
      onChange={onInformationsChange}
      informations={informations}
    />
  );
};

export default InformationsStep;
