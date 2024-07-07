import {
  IndemniteDepartContext,
  useIndemniteDepartStore,
} from "../../store";
import CommonInformationStep from "../../../CommonSteps/Informations";
import { useContext } from "react";

const InformationsStep = (): JSX.Element => {
  const store = useContext(IndemniteDepartContext);
  const { errors, onInformationsChange, informations } =
    useIndemniteDepartStore(store, (state) => ({
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
