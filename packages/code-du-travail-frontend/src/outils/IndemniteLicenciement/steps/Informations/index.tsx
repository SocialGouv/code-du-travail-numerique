import {
  IndemniteLicenciementContext,
  useIndemniteLicenciementStore,
} from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";
import { useContext } from "react";

const InformationsStep = (): JSX.Element => {
  const store = useContext(IndemniteLicenciementContext);
  const { errors, onInformationsChange, informations } =
    useIndemniteLicenciementStore(store, (state) => ({
      errors: state.informationsData.error,
      onInformationsChange: state.informationsFunction.onInformationsChange,
      informations: state.informationsData.input.publicodesInformations,
    }));

  return (
    <CommonInformationStep
      errors={errors}
      onChange={onInformationsChange}
      informations={informations}
    />
  );
};

export default InformationsStep;
