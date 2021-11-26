import { render } from "@testing-library/react";
import * as React from "react";

import WarningResult, {
  titreFavorable,
  titrePreavis,
} from "../steps/component/WarningResult";

describe("WarningResult", () => {
  it.each`
    resultValueInDays | type        | ccNumber     | expectedMessage                                                          | expectedWarning
    ${0}              | ${"depart"} | ${123456789} | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${0}              | ${"mise"}   | ${123456789} | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${0}              | ${"depart"} | ${undefined} | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${0}              | ${"mise"}   | ${null}      | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${0}              | ${"depart"} | ${1090}      | ${"Un accord collectif d’entreprise"}                                    | ${titrePreavis}
    ${0}              | ${"mise"}   | ${1090}      | ${"Un accord collectif d’entreprise"}                                    | ${titrePreavis}
    ${12}             | ${"depart"} | ${123456789} | ${"Dans ce cas, cette durée doit s’appliquer."}                          | ${titreFavorable}
    ${12}             | ${"depart"} | ${1090}      | ${"durée de préavis plus favorable pour le salarié = durée plus courte"} | ${titrePreavis}
    ${12}             | ${"mise"}   | ${123456789} | ${"Dans ce cas, cette durée doit s’appliquer."}                          | ${titreFavorable}
    ${12}             | ${"mise"}   | ${1090}      | ${"durée de préavis plus favorable pour le salarié = durée plus longue"} | ${titrePreavis}
  `(
    'doit renvoyer ce message "$expectedMessage" et ce warning "$expectedWarning" pour la CC $ccNumber dans un contexte de $type à la retraite, avec comme préavis $resultValueInDays jour(s)',
    ({
      resultValueInDays,
      type,
      ccNumber,
      expectedMessage,
      expectedWarning,
    }) => {
      const { getByText } = render(
        <WarningResult
          resultValueInDays={resultValueInDays}
          type={type}
          ccNumber={ccNumber}
        />
      );
      expect(getByText(expectedMessage, { exact: false })).toBeTruthy();
      expect(getByText(expectedWarning, { exact: false })).toBeTruthy();
    }
  );
});
