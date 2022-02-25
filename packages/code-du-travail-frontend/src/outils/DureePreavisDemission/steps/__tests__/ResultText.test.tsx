import { render } from "@testing-library/react";
import * as React from "react";

import { StepResult } from "../Result";

describe("StepResult", () => {
  it.each`
    ccNumber
    ${123456789}
    ${undefined}
  `(
    'doit afficher le résultat "Aucun résultat" si pas de CC ("$ccNumber")',
    ({ ccNumber }) => {
      const form = {
        getState() {
          return {
            values: {
              ccn: { num: ccNumber },
            },
          };
        },
      };
      const { getByText } = render(<StepResult form={form} />);
      expect(getByText("Aucun résultat", { exact: false })).toBeTruthy();
      expect(
        getByText(
          "L’existence ou la durée du préavis de démission peut être prévue par une convention collective, un accord d’entreprise ou à défaut, par un usage dans l’entreprise.",
          { exact: false }
        )
      ).toBeTruthy();
    }
  );

  it.each`
    catPro            | anciennete               | expectedResult
    ${"16| Employés"} | ${"16| 1 mois à 6 mois"} | ${"15 jours"}
    ${"16| Employés"} | ${"3| Moins de 1 mois"}  | ${"il n’y a pas de préavis à effectuer"}
  `(
    'doit afficher le résultat "$expectedResult" dans un contexte de "$catPro" avec comme anciennete "$anciennete"',
    ({ catPro, anciennete, expectedResult }) => {
      const form = {
        getState() {
          return {
            values: {
              ccn: { num: 675 },
              criteria: {
                ancienneté: anciennete,
                "catégorie professionnelle": catPro,
              },
            },
          };
        },
      };
      const { getByText } = render(<StepResult form={form} />);
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
