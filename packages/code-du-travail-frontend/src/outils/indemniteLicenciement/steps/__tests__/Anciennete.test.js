import React from "react";
import { render, fireEvent } from "react-testing-library";
import { StepAnciennete } from "../Anciennete";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
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
  it("should display error if anciennté < 12mois and licenciement in 2017", () => {
    const { getByLabelText, getByText } = renderForm({
      dateEntree: "2017-04-02",
      dateNotification: "2017-09-02"
    });
    const dateSortie = getByLabelText(/date de sortie/i);
    fireEvent.change(dateSortie, { target: { value: "2018-12-31" } });
    expect(getByText(/est dûe au-delà de 12 mois/i)).toMatchSnapshot();
  });
});
