import { Container, Title } from "@socialgouv/cdtn-ui";
import React from "react";

import { branches } from "../branches";

type Props = {
  children?: React.ReactNode;
  idcc: string;
};

export default function SansIndemniteLicenciement({
  idcc,
  children,
}: Props): JSX.Element {
  const selectedBranche = branches.find((br) => br.value === idcc)!;

  return (
    <Container>
      <Title as="h3">{selectedBranche.label}</Title>
      <p>
        Pour cette branche, le calcul de l’indemnité de licenciement se base sur
        l’indemnité légale de licenciement.
      </p>
      {children}
    </Container>
  );
}
