import React from "react";

import { IndemniteLegale } from "./components";
import { useIndemniteLicenciementStore } from "../../store";

const StepResult = () => {
  const { publicodesLegalResult, getPublicodesResult, infoCalcul } =
    useIndemniteLicenciementStore((state) => ({
      infoCalcul: state.resultData.input.infoCalcul,
      publicodesLegalResult: state.resultData.input.publicodesLegalResult,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <IndemniteLegale
      result={
        publicodesLegalResult?.value
          ? (Number(publicodesLegalResult.value) + 0.004).toLocaleString(
              "fr-FR",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }
            )
          : "0"
      }
      unit={publicodesLegalResult?.unit?.denominators[0] ?? "€"}
      infoCalcul={infoCalcul}
    />
  );
};

export default StepResult;
