import React from "react";

import { IndemniteLegale } from "./components";
import { useIndemniteLicenciementStore } from "../../store";

const StepResult = () => {
  const { publicodesResult, getPublicodesResult, infoCalcul } =
    useIndemniteLicenciementStore((state) => ({
      infoCalcul: state.resultData.input.infoCalcul,
      publicodesResult: state.resultData.input.publicodesResult,
      getPublicodesResult: state.resultFunction.getPublicodesResult,
    }));

  React.useEffect(() => {
    getPublicodesResult();
  }, []);

  return (
    <IndemniteLegale
      result={
        publicodesResult?.value
          ? (Number(publicodesResult.value) + 0.004).toLocaleString("fr-FR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "0"
      }
      unit={publicodesResult?.unit?.denominators[0] ?? "€"}
      infoCalcul={infoCalcul}
    />
  );
};

export default StepResult;
