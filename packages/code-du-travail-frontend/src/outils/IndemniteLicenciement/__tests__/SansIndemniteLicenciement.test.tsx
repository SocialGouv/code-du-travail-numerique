import { render } from "@testing-library/react";
import React from "react";

import { loadPublicodes } from "../../api/LoadPublicodes";
import { PublicodesProvider, PublicodesSimulator } from "../../publicodes";
import SansIndemniteLicenciement from "../ccn/SansIndemniteLicenciement";

describe("<SansIndemniteLicenciement />", () => {
  it("should render", () => {
    const form = {
      getState() {
        return {
          values: {
            absencePeriods: [],
            anciennete: 6,
            branche: "1518",
            contrat: "cdi",
            dateEntree: "2013-07-02",
            dateNotification: "2019-07-02",
            dateSortie: "2019-07-31",
            fauteGrave: false,
            hasAbsenceProlonge: false,
            hasSameSalaire: true,
            hasTempsPartiel: false,
            inaptitude: false,
            salaire: "2390",
            salairePeriods: [],
            salaires: [],
          },
        };
      },
    };
    const { container } = render(
      <PublicodesProvider
        rules={loadPublicodes("indemnite-licenciement")}
        targetRule="contrat salarié . indemnité de licenciement"
        simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
      >
        <SansIndemniteLicenciement form={form} />
      </PublicodesProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
