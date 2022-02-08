import React from "react";

import { useSimulatorStore } from "../store";

const StepResult = (): JSX.Element => {
  const simulatorState = useSimulatorStore((state) => state);

  React.useEffect(() => {
    simulatorState.calculateSituation();
  }, []);

  return (
    <>
      <p>Le prix des carottes {simulatorState.carrotPrice}</p>
      <p>Le prix des champignons {simulatorState.mushroomPrice}</p>
      <p>
        Result publicode {JSON.stringify(simulatorState.publiResult, null, 2)}
      </p>
    </>
  );
};

export { StepResult };
