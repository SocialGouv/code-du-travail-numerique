import { render } from "@testing-library/react";
import React from "react";
import FilledElement from "../FilledElements";

describe("<FilledElement />", () => {
  it("should render", () => {
    expect(
      render(
        <FilledElement
          typeContrat="contrat"
          isLicenciementFauteGrave={true}
          agreementName="agreementName"
          isLicenciementInaptitude={true}
          agreementInformations={[
            {
              label: "label",
              value: "yo",
            },
          ]}
          agreementRefSalaryInfo={<div>Hello ref salary</div>}
          dateEntree="01/01/2020"
          dateSortie="01/01/2021"
          dateNotification="01/02/2021"
          absencesPeriods={[
            {
              motif: "Motif A",
              durationInMonth: 2,
            },
          ]}
          salaryPeriods={[
            {
              month: "Janvier",
              prime: 100,
              value: 1000,
            },
          ]}
          hasTempsPartiel={true}
          isAgreementBetter={false}
        />
      )
    ).toBeTruthy();
  });
});
