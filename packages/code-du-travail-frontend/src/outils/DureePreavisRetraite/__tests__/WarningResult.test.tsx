import { render } from "@testing-library/react";
import * as React from "react";

import WarningResult from "../steps/component/WarningResult";

describe("WarningResult", () => {
  it.each`
    resultValueInDays | type        | ccNumber     | expectedMessage
    ${0}              | ${"depart"} | ${123456789} | ${"Une convention collective de branche"}
    ${0}              | ${"mise"}   | ${123456789} | ${"Une convention collective de branche"}
    ${0}              | ${"depart"} | ${1090}      | ${"Un accord collectif d’entreprise"}
    ${0}              | ${"mise"}   | ${1090}      | ${"Un accord collectif d’entreprise"}
    ${12}             | ${"depart"} | ${123456789} | ${"Dans ce cas, cette durée doit s’appliquer."}
    ${12}             | ${"depart"} | ${1090}      | ${"durée de préavis plus favorable pour le salarié = durée plus courte"}
    ${12}             | ${"mise"}   | ${123456789} | ${"Dans ce cas, cette durée doit s’appliquer."}
    ${12}             | ${"mise"}   | ${1090}      | ${"durée de préavis plus favorable pour le salarié = durée plus longue"}
  `(
    'doit renvoyer ce message "$expectedMessage" pour la CC $ccNumber dans un contexte de $type à la retraite, avec comme préavis $resultValueInDays jour(s)',
    ({ resultValueInDays, type, ccNumber, expectedMessage }) => {
      const { getByText } = render(
        <WarningResult
          resultValueInDays={resultValueInDays}
          type={type}
          ccNumber={ccNumber}
        />
      );
      expect(getByText(expectedMessage, { exact: false })).toBeTruthy();
    }
  );
});
