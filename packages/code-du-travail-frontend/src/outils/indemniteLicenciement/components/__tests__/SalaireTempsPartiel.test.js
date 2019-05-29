import React from "react";
import { render, wait } from "react-testing-library";
import { SalaireTempsPartiel } from "../SalaireTempsPartiel";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";

describe("<SalaireTempsPartiel />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          periods: [
            { type: "Temps plein", duration: 12, salary: 2000 },
            { type: "Temps partiel", duration: 6, salary: 1000 }
          ]
        }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should delete a period", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        initialValues={{
          periods: [
            { type: "Temps plein", duration: 12, salary: 2000 },
            { type: "Temps partiel", duration: 6, salary: 1000 }
          ]
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    const deleteButton = getByText(/supprimer/i);
    deleteButton.click();
    await wait(() => {});
    expect(container).toMatchSnapshot();
  });
  it("should add a period", async () => {
    const onSubmit = jest.fn();
    const { container, getByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    await wait(() => getByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
