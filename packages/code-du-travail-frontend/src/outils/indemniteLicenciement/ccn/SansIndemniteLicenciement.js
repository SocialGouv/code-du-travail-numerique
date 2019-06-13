import React from "react";
import { Container } from "@cdt/ui";

import { branches } from "../branches";

function Step({ form }) {
  const {
    values: { branche }
  } = form.getState();

  const selectedBranche = branches.find(br => br.value === branche);
  console.log(form.getState());
  return (
    <Container>
      <h3>{selectedBranche.label}</h3>
      <p>
        Pour votre branche, le calcul de l’indemnité de licenciement se base sur
        l’indemnité légale de licenciement.
      </p>
    </Container>
  );
}

export default Step;
