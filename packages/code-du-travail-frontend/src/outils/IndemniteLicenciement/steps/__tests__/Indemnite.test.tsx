import { render, screen } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { loadPublicodes } from "../../../api/LoadPublicodes";
import { PublicodesProvider, PublicodesSimulator } from "../../../publicodes";
import { StepIndemnite } from "../Indemnite";

const initialValues = {
  absencePeriods: [],
  anciennete: 2,
  contrat: "cdi",
  dateEntree: "2020-02-20",
  dateNotification: "2021-02-20",
  dateSortie: "2022-02-20",
  fauteGrave: false,
  hasAbsenceProlonge: false,
  hasPrimes: false,
  hasSameSalaire: false,
  inaptitude: false,
  primes: [],
  salaire: null,
  salairePeriods: [],
  salaires: [
    {
      label: "janvier 2021",
      salary: 10000,
    },
    {
      label: "décembre 2020",
      salary: 10000,
    },
    {
      label: "novembre 2020",
      salary: 10000,
    },
    {
      label: "octobre 2020",
      salary: 10000,
    },
    {
      label: "septembre 2020",
      salary: 10000,
    },
    {
      label: "août 2020",
      salary: 10000,
    },
    {
      label: "juillet 2020",
      salary: 10000,
    },
    {
      label: "juin 2020",
      salary: 10000,
    },
    {
      label: "mai 2020",
      salary: 10000,
    },
    {
      label: "avril 2020",
      salary: 10000,
    },
    {
      label: "mars 2020",
      salary: 10000,
    },
    {
      label: "février 2020",
      salary: 10000,
    },
  ],
};
describe("<StepIndemnite />", () => {
  it("should render", () => {
    render(
      <Form
        initialValues={initialValues}
        onSubmit={jest.fn()}
        render={({ form }) => (
          <PublicodesProvider
            rules={loadPublicodes("indemnite-licenciement")}
            simulator={PublicodesSimulator.INDEMNITE_LICENCIEMENT}
          >
            <StepIndemnite form={form} />
          </PublicodesProvider>
        )}
      />
    );
    expect(
      screen.getByText("Le code du travail prévoit un montant minimum de :")
    ).toHaveTextContent("5000 € brut.");
  });
});
