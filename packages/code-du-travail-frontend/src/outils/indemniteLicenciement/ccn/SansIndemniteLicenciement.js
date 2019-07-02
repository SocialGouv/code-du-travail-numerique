import React from "react";
import { Container } from "@cdt/ui";

import { IndemniteLegale } from "../components/IndemniteLegale";
import { branches } from "../branches";
import { getIndemniteFromFinalForm } from "../indemnite";

function Step({ form }) {
  const {
    values: { branche }
  } = form.getState();

  const { indemniteLegale, formuleLegale } = getIndemniteFromFinalForm(form);
  const selectedBranche = branches.find(br => br.value === branche);

  return (
    <Container>
      <h3>{selectedBranche.label}</h3>
      <p>
        Pour votre branche, le calcul de l’indemnité de licenciement se base sur
        l’indemnité légale de licenciement.
      </p>
      <IndemniteLegale indemnite={indemniteLegale} formula={formuleLegale} />
    </Container>
  );
}

export default Step;
