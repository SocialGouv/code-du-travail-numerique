import { render } from "@testing-library/react";
import React from "react";
import FilledElement from "../FilledElements";
import { MotifKeys } from "@socialgouv/modeles-social";

describe("<FilledElement />", () => {
  it("should render", () => {
    expect(
      render(
        <FilledElement
          typeContrat="contrat"
          isLicenciementFauteGrave={true}
          agreementName="agreementName"
          isLicenciementInaptitude={true}
          showHasTempsPartiel={true}
          isArretTravail={true}
          dateArretTravail="01/01/2020"
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
              motif: {
                label: "Motif A",
                key: MotifKeys.maladieNonPro,
                value: 1,
              },
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
          hasSameSalary={true}
          salary={"1000"}
          isStepSalaryHidden={false}
        />
      )
    ).toBeTruthy();
  });
});
