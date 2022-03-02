import React from "react";

import { HighlightResult, SectionTitle } from "../../common/stepStyles";

type Props = {
  result: number | string;
  unit: string;
};

export function IndemniteLegale({ result, unit }: Props): JSX.Element {
  return (
    <>
      <SectionTitle>Indemnité légale</SectionTitle>
      <p>
        {"Le code du travail prévoit un montant minimum de : "}
        <HighlightResult>{`${result} ${unit} brut.`}</HighlightResult>
      </p>
    </>
  );
}
