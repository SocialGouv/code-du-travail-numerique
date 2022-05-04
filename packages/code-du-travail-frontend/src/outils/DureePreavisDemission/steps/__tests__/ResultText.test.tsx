import { render } from "@testing-library/react";
import * as React from "react";

import { StepResult } from "../Result";
import { renderForm } from "../../../../../test/renderForm";

describe("StepResult", () => {
  it.each`
    catPro            | anciennete               | expectedResult
    ${"16| Employés"} | ${"16| 1 mois à 6 mois"} | ${"15 jours"}
    ${"16| Employés"} | ${"3| Moins de 1 mois"}  | ${"il n’y a pas de préavis à effectuer"}
  `(
    'doit afficher le résultat "$expectedResult" dans un contexte de "$catPro" avec comme anciennete "$anciennete"',
    ({ catPro, anciennete, expectedResult }) => {
      const form = {
        ccn: { selected: { num: 675 } },
        criteria: {
          ancienneté: anciennete,
          "catégorie professionnelle": catPro,
        },
      };
      const { getByText } = renderForm(StepResult, form);
      expect(getByText(expectedResult, { exact: false })).toBeTruthy();
      expect(
        getByText(
          "L’existence ou la durée du préavis de démission peut être prévue par un accord d’entreprise ou à défaut, par un usage dans l’entreprise.",
          { exact: false }
        )
      ).toBeTruthy();
    }
  );
});
