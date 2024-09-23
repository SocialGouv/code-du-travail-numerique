import React, { useContext } from "react";
import { RadioQuestion } from "../../../Components";
import { WarningOriginDepart } from "./components/Warning";
import { PreavisRetraiteContext, usePreavisRetraiteStore } from "../store";

const StepOrigin = (): JSX.Element => {
  const store = useContext(PreavisRetraiteContext);

  const { originDepart, onChangeOriginDepart, errorOriginDepart } =
    usePreavisRetraiteStore(store, (state) => ({
      originDepart: state.originDepartData.input.originDepart,
      onChangeOriginDepart: state.originDepartFunction.onChangeOriginDepart,
      errorOriginDepart: state.originDepartData.error.errorOriginDepart,
    }));

  return (
    <>
      <RadioQuestion
        questions={[
          {
            label: "Le salarié décide lui-même de partir à la retraite",
            value: "depart-retraite",
            id: "depart-retraite",
          },
          {
            label: "L'employeur décide de mettre le salarié à la retraite",
            value: "mise-retraite",
            id: "mise-retraite",
          },
        ]}
        name="originDepart"
        label="Qui est à l’origine du départ en retraite&nbsp;?"
        selectedOption={originDepart}
        onChangeSelectedOption={onChangeOriginDepart}
        error={errorOriginDepart}
        showRequired
        autoFocus
      />
      {originDepart === "mise-retraite" && <WarningOriginDepart />}
    </>
  );
};

export default StepOrigin;
