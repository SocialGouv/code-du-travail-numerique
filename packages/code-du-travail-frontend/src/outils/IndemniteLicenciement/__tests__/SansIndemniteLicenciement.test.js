import React from "react";
import { render } from "../../../../test/utils";
import SansIndemniteLicenciement from "../ccn/SansIndemniteLicenciement";

describe("<SansIndemniteLicenciement />", () => {
  it("should render", () => {
    const form = {
      getState() {
        return {
          values: {
            branche: "1518",
            contrat: "cdi",
            fauteGrave: false,
            inaptitude: false,
            dateEntree: "2013-07-02",
            anciennete: 6,
            dateNotification: "2019-07-02",
            dateSortie: "2019-07-31",
            hasAbsenceProlonge: false,
            absencePeriods: [],
            hasTempsPartiel: false,
            salairePeriods: [],
            hasSameSalaire: true,
            salaires: [],
            salaire: "2390"
          }
        };
      }
    };
    const { container } = render(<SansIndemniteLicenciement form={form} />);
    expect(container).toMatchSnapshot();
  });
});
