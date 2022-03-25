import { fireEvent, render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import {
  computeAnciennete,
  computeSalaires,
  StepAnciennete,
} from "../Anciennete";

function renderForm(data) {
  return render(
    <Form
      mutators={{
        ...arrayMutators,
      }}
      validate={StepAnciennete.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <StepAnciennete form={form} />
          <button data-testid="nextBt">suivant</button>
        </form>
      )}
    </Form>
  );
}

describe("<Anciennete />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should display error if dateEntre after dateSortie", async () => {
    const { getByLabelText, container } = renderForm({
      dateEntree: "2018-04-02",
    });
    const dateSortie = getByLabelText(/date de sortie/i);
    fireEvent.change(dateSortie, { target: { value: "2018-03-01" } });
    expect(
      container
        .querySelector("input[name=dateSortie]")
        .parentElement.nextSibling.textContent.trim()
    ).toMatch("La date de sortie doit se situer après le 02 April 2018");
  });

  it("should display error if dateEntree after dateNotif", () => {
    const { container, getByLabelText } = renderForm({
      dateEntree: "2018-05-01",
    });
    const dateNotif = getByLabelText(/licenciement/i);
    fireEvent.change(dateNotif, { target: { value: "2018-04-02" } });
    expect(
      container
        .querySelector("input[name=dateNotification]")
        .parentElement.nextSibling.textContent.trim()
    ).toMatch("La date de notification doit se situer après la date d’entrée");
  });

  it("should display error if dateNotif after dateSortie", () => {
    const { container, getByLabelText } = renderForm({
      dateSortie: "2018-04-01",
    });
    const dateNotif = getByLabelText(/licenciement/i);
    fireEvent.change(dateNotif, { target: { value: "2018-05-02" } });
    expect(
      container
        .querySelector("input[name=dateNotification]")
        .parentElement.nextSibling.textContent.trim()
    ).toMatch("La date de notification doit se situer avant la date de sortie");
  });

  it("should display error if dateNotif is older than 18 months", () => {
    const { container, getByLabelText } = renderForm({
      dateSortie: "2022-04-01",
    });
    const dateNotif = getByLabelText(/licenciement/i);
    fireEvent.change(dateNotif, { target: { value: "2018-02-02" } });
    expect(
      container
        .querySelector("input[name=dateNotification]")
        .parentElement.nextSibling.textContent.trim()
    ).toMatch(
      "La date de notification doit se situer dans les 18 derniers mois"
    );
  });

  it("should display error if anciennté < 8mois", () => {
    const { getByText, getByLabelText } = renderForm({
      dateEntree: "2018-04-02",
      dateNotification: "2018-09-02",
    });
    const dateSortie = getByLabelText(/date de sortie/i);
    fireEvent.change(dateSortie, { target: { value: "2018-12-31" } });
    expect(getByText(/8 mois d’ancienneté/).textContent.trim()).toMatch(
      "L’indemnité de licenciement est dûe au-delà de 8 mois d’ancienneté"
    );
  });
});

describe("computeAncienneté", () => {
  it("should compute ancienneté", () => {
    expect(
      computeAnciennete({ dateEntree: "2017-04-01", dateSortie: "2018-04-01" })
    ).toEqual(1);
  });
  it("should compute ancienneté with periods of absence", () => {
    expect(
      computeAnciennete({
        absencePeriods: [{ duration: "6", type: "Congés sans solde" }],
        dateEntree: "2017-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(0.5);
  });
  it("should compute ancienneté with periods of absence divided by two for Congé parental", () => {
    expect(
      computeAnciennete({
        absencePeriods: [{ duration: "6", type: "Congé parental d'éducation" }],
        dateEntree: "2016-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(1.75);
  });
});

describe("computeSalaires", () => {
  it("should compute salaires periods only if there is previous salaires", () => {
    expect(
      computeSalaires({
        dateEntree: "2016-04-01",
        dateNotification: "2018-04-01",
        dateSortie: "2018-05-01",
        hasSameSalaire: false,
        salaires: [],
      }).length
    ).toEqual(12);
  });
  it("should restore previous salaires periods", () => {
    expect(
      computeSalaires({
        dateEntree: "2018-01-01",
        dateNotification: "2018-09-01",
        dateSortie: "2018-10-01",
        hasSameSalaire: false,
        salaires: [
          { label: "août 2018", salary: 2000 },
          { label: "juillet 2018", salary: 1450 },
          { label: "juin 2018", salary: 2000 },
          { label: "mai 2018", salary: 1500 },
          { label: "avril 2018", salary: 2000 },
          { label: "mars 2018", salary: 1400 },
          { label: "février 2018", salary: 2000 },
          { label: "janvier 2018", salary: 1500 },
        ],
      })
    ).toEqual([
      { label: "août 2018", salary: 2000 },
      { label: "juillet 2018", salary: 1450 },
      { label: "juin 2018", salary: 2000 },
      { label: "mai 2018", salary: 1500 },
      { label: "avril 2018", salary: 2000 },
      { label: "mars 2018", salary: 1400 },
      { label: "février 2018", salary: 2000 },
      { label: "janvier 2018", salary: 1500 },
    ]);
  });
  it("should not compute salaires periods if hasSameSalaire is true", () => {
    expect(
      computeSalaires({
        dateEntree: "2016-04-01",
        dateNotification: "2018-04-01",
        dateSortie: "2018-05-01",
        hasSameSalaire: true,
      })
    ).toBe(null);
  });
});
