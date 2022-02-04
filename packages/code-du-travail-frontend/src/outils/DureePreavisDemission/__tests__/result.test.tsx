import { render } from "@testing-library/react";
import * as React from "react";

import { StepResult } from "../steps/Result";

describe("StepResult", () => {
  it.each`
    ccNumber     | catPro            | anciennete               | expectedResult                            | expectedWarning
    ${123456789} | ${undefined}      | ${undefined}             | ${"Aucun résultat"}                       | ${"L’existence ou la durée du préavis de démission peut être prévue par une convention collective, un accord d’entreprise ou à défaut, par un usage dans l’entreprise."}
    ${undefined} | ${undefined}      | ${undefined}             | ${"Aucun résultat"}                       | ${"L’existence ou la durée du préavis de démission peut être prévue par une convention collective, un accord d’entreprise ou à défaut, par un usage dans l’entreprise."}
    ${675}       | ${"16| Employés"} | ${"16| 1 mois à 6 mois"} | ${"15 jours"}                             | ${"L’existence ou la durée du préavis de démission peut être prévue par un accord d’entreprise ou à défaut, par un usage dans l’entreprise."}
    ${675}       | ${"16| Employés"} | ${"3| Moins de 1 mois"}  | ${"il n’y a pas de préavis à effectuer."} | ${"L’existence ou la durée du préavis de démission peut être prévue par un accord d’entreprise ou à défaut, par un usage dans l’entreprise."}
  `(
    'doit afficher le résultat "$expectedResult" pour la CC "$ccNumber" dans un contexte de "$catPro" avec comme anciennete "$anciennete"',
    ({ ccNumber, catPro, anciennete, expectedResult, expectedWarning }) => {
      const form = {
        getState() {
          return {
            values: {
              ccn: { num: ccNumber },
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
      expect(getByText(expectedWarning, { exact: false })).toBeTruthy();
    }
  );
});
