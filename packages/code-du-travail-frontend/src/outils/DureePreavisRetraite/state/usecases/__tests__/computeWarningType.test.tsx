import * as React from "react";

import { computeWarningType } from "../computeWarningType";
import { WarningType } from "../../../steps/ResultStep/Step";

describe("computeWarningType", () => {
  it.each`
    resultValueInDays | type        | ccNumber     | expectedType
    ${0}              | ${"départ"} | ${123456789} | ${WarningType.noNoticeWithoutAgreement}
    ${0}              | ${"mise"}   | ${123456789} | ${WarningType.noNoticeWithoutAgreement}
    ${0}              | ${"départ"} | ${undefined} | ${WarningType.noNoticeWithoutAgreement}
    ${0}              | ${"mise"}   | ${null}      | ${WarningType.noNoticeWithoutAgreement}
    ${0}              | ${"départ"} | ${1090}      | ${WarningType.noNoticeWithAgreement}
    ${0}              | ${"mise"}   | ${1090}      | ${WarningType.noNoticeWithAgreement}
    ${12}             | ${"départ"} | ${123456789} | ${WarningType.departWithoutAgreement}
    ${12}             | ${"départ"} | ${1090}      | ${WarningType.departWithAgreement}
    ${12}             | ${"mise"}   | ${123456789} | ${WarningType.miseWithoutAgreement}
    ${12}             | ${"mise"}   | ${1090}      | ${WarningType.miseWithAgreement}
    ${12}             | ${"départ"} | ${3239}      | ${WarningType.departWithoutCollectiveAgreement}
    ${12}             | ${"mise"}   | ${3239}      | ${WarningType.miseWithoutCollectiveAgreement}
  `(
    'doit renvoyer ce message "expectedType" pour la CC $ccNumber dans un contexte de $type à la retraite, avec comme préavis $resultValueInDays jour(s)',
    ({ resultValueInDays, type, ccNumber, expectedType }) => {
      const result = computeWarningType({
        resultValueInDays,
        type,
        ccNumber,
      });
      expect(result).toBe(expectedType);
    }
  );
});
