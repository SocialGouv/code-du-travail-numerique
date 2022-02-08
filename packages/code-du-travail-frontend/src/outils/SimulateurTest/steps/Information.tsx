import React from "react";

import { YesNoQuestion } from "../common/YesNoQuestion";
import { useSimulatorStore } from "../store";

const StepInformation = (): JSX.Element => {
  //TODO: faut voir comment on peut améliorer cette partie
  const simulatorState = useSimulatorStore((state) => state);

  const onChangeCheck1 = (v: boolean): void => {
    simulatorState.onSetCarrotPrice(!v ? "2€/kg" : "0€/kg");
  };

  const onChangeCheck2 = (v: boolean): void => {
    simulatorState.onSetMushRoomPrice(!v ? "5€/kg" : "0€/kg");
  };

  return (
    <>
      <YesNoQuestion
        label="Les carottes sont gratuites"
        onChangeYes={() => onChangeCheck1(true)}
        onChangeNo={() => onChangeCheck1(false)}
        isYesChecked={simulatorState.carrotPrice === "0€/kg"}
        isNoChecked={simulatorState.carrotPrice === "2€/kg"} // LE STATE est sorti du composant peut importe si le composant est mounté ou pas
      />
      <YesNoQuestion
        label="Les champignons sont gratuites"
        onChangeYes={() => onChangeCheck2(true)}
        onChangeNo={() => onChangeCheck2(false)}
        isYesChecked={simulatorState.mushroomPrice === "0€/kg"}
        isNoChecked={simulatorState.mushroomPrice === "5€/kg"}
      />
    </>
  );
};

export { StepInformation };
