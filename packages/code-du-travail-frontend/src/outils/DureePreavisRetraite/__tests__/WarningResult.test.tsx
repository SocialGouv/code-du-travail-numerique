import { render } from "@testing-library/react";
import * as React from "react";

import WarningResult, {
  titreFavorable,
  titrePreavis,
} from "../steps/ResultStep/Components/WarningResult";
import { WarningType } from "../steps/ResultStep/Step";

describe("WarningResult", () => {
  it.each`
    hasNotice | type                                            | expectedMessage                                                          | expectedWarning
    ${false}  | ${WarningType.noNoticeWithoutAgreement}         | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${false}  | ${WarningType.noNoticeWithoutAgreement}         | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${false}  | ${WarningType.noNoticeWithoutAgreement}         | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${false}  | ${WarningType.noNoticeWithoutAgreement}         | ${"Une convention collective de branche"}                                | ${titrePreavis}
    ${false}  | ${WarningType.noNoticeWithAgreement}            | ${"Un accord collectif d’entreprise"}                                    | ${titrePreavis}
    ${false}  | ${WarningType.noNoticeWithAgreement}            | ${"Un accord collectif d’entreprise"}                                    | ${titrePreavis}
    ${true}   | ${WarningType.departWithoutAgreement}           | ${"conduisant à une durée de préavis plus courte."}                      | ${titreFavorable}
    ${true}   | ${WarningType.departWithAgreement}              | ${"durée de préavis plus favorable pour le salarié = durée plus courte"} | ${titreFavorable}
    ${true}   | ${WarningType.miseWithoutAgreement}             | ${"conduisant à une durée de préavis plus longue."}                      | ${titreFavorable}
    ${true}   | ${WarningType.miseWithAgreement}                | ${"durée de préavis plus favorable pour le salarié = durée plus longue"} | ${titreFavorable}
    ${true}   | ${WarningType.departWithoutCollectiveAgreement} | ${"Le contrat de travail ou un usage peut prévoir une durée de préavis"} | ${titreFavorable}
    ${true}   | ${WarningType.miseWithoutCollectiveAgreement}   | ${"Le contrat de travail ou un usage peut prévoir une durée de préavis"} | ${titreFavorable}
  `(
    'doit renvoyer ce message "$expectedMessage" et ce warning "$type"',
    ({ hasNotice, type, expectedMessage, expectedWarning }) => {
      const { getByText } = render(
        <WarningResult hasNotice={hasNotice} type={type} />
      );
      expect(getByText(expectedMessage, { exact: false })).toBeTruthy();
      expect(getByText(expectedWarning, { exact: false })).toBeTruthy();
    }
  );
});
