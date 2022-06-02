import React from "react";
// import { IndemniteLegale } from "../components/IndemniteLegale";
// import { getIndemniteExplications, getSalaireRef } from "../indemnite";
// import { useForm } from "react-final-form";
// import { useIndemniteLicenciementStore } from "../state";

const StepIndemnite = (): JSX.Element => {
  // const result = useIndemniteLicenciementStore((state) => state.steps.result);
  // if (!result) {
  //   throw Error("Try to show result without computed result data");
  // }

  // const form = useForm();
  // const {
  //   hasSameSalaire = false,
  //   salaires = [],
  //   primes = [],
  //   salaire,
  //   anciennete,
  //   inaptitude,
  // } = form.getState().values;
  // const salaireRef = getSalaireRef({
  //   hasSameSalaire,
  //   primes,
  //   salaire,
  //   salaires,
  // });
  // const infoCalcul = getIndemniteExplications({
  //   anciennete,
  //   inaptitude,
  //   salaireRef,
  // });

  return (
    // <IndemniteLegale
    //   result={
    //     result.result.value
    //       ? (Number(result.result.value) + 0.004).toLocaleString("fr-FR", {
    //           minimumFractionDigits: 2,
    //           maximumFractionDigits: 2,
    //         })
    //       : "0"
    //   }
    //   unit={result.result.unit?.denominators[0] ?? "€"}
    //   infoCalcul={infoCalcul}
    // />
    <></>
  );
};

export default StepIndemnite;
