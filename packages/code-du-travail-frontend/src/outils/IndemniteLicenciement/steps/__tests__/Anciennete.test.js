import React from "react";
import { render, fireEvent } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import { Form } from "react-final-form";
import { StepAnciennete, computeAnciennete } from "../Anciennete";

function renderForm(data) {
  return render(
    <Form
      mutators={{
        ...arrayMutators
      }}
      validate={StepAnciennete.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => <StepAnciennete form={form} />}
    </Form>
  );
}

describe("<Anciennete />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should display error if dateEntre after dateSortie", () => {
    const { getByLabelText, getByText } = renderForm({
      dateEntree: "2018-04-02"
    });
    const dateSortie = getByLabelText(/date de sortie/i);
    fireEvent.change(dateSortie, { target: { value: "2018-03-01" } });
    expect(
      getByText(/la date de sortie doit se situer après/i)
    ).toMatchSnapshot();
  });

  it("should display error if dateEntree after dateNotif", () => {
    const { container, getByLabelText } = renderForm({
      dateEntrer: "2018-05-01"
    });
    const dateNotif = getByLabelText(/licenciement/i);
    fireEvent.change(dateNotif, { target: { value: "2018-04-02" } });
    expect(container.querySelector(".alert")).toMatchSnapshot();
  });

  it("should display error if dateNotif after dateSortie", () => {
    const { container, getByLabelText } = renderForm({
      dateSortie: "2018-04-01"
    });
    const dateNotif = getByLabelText(/licenciement/i);
    fireEvent.change(dateNotif, { target: { value: "2018-05-02" } });
    expect(container.querySelector(".alert")).toMatchSnapshot();
  });

  it("should display error if anciennté < 8mois", () => {
    const { getByLabelText, getByText } = renderForm({
      dateEntree: "2018-04-02",
      dateNotification: "2018-09-02"
    });
    const dateSortie = getByLabelText(/date de sortie/i);
    fireEvent.change(dateSortie, { target: { value: "2018-12-31" } });
    expect(getByText(/est dûe au-delà de 8 mois/i)).toMatchSnapshot();
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
        dateEntree: "2017-04-01",
        dateSortie: "2018-04-01",
        absencePeriods: [{ type: "Congés sans solde", duration: "6" }]
      })
    ).toEqual(0.5);
  });
  it("should compute ancienneté with periods of absence divided by two for Congé parental", () => {
    expect(
      computeAnciennete({
        dateEntree: "2016-04-01",
        dateSortie: "2018-04-01",
        absencePeriods: [{ type: "Congé parental d'éducation", duration: "6" }]
      })
    ).toEqual(1.75);
  });
});
