import { Container, Title } from "@socialgouv/cdtn-ui";
import React from "react";

import { branches } from "../branches";
import { IndemniteLegale } from "../components/IndemniteLegale";
import { getIndemniteFromFinalForm } from "../indemnite";

function Step({ form }) {
  const {
    values: { branche },
  } = form.getState();

  const { indemniteLegale, infoCalculLegal } = getIndemniteFromFinalForm(form);
  const selectedBranche = branches.find((br) => br.value === branche);

  return (
    <Container>
      <Title as="h3">{selectedBranche.label}</Title>
      <p>
        Pour cette branche, le calcul de l’indemnité de licenciement se base sur
        l’indemnité légale de licenciement.
      </p>
      <IndemniteLegale formValues={form} />
    </Container>
  );
}

export default Step;
