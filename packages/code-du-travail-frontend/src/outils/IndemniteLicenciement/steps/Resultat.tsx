import React from "react";

import { IndemniteLegale } from "../components";
import { useIndemniteLicenciementStore } from "../store";
import { ResultStoreSlice } from "../store/resultStore";

const StepResult = () => {
  const { publicodesResult, getPublicodesResult, infoCalcul } =
    useIndemniteLicenciementStore((state: ResultStoreSlice) => ({
      ...state,
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
      infoCalcul={infoCalcul!}
    />
  );
};

export default StepResult;
