import React from "react";
import { render, wait } from "@testing-library/react";
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
    const { container, getAllByText } = render(
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
    const [deleteButton] = getAllByText(/supprimer/i);
    deleteButton.click();
    await wait(() => {});
    expect(container).toMatchSnapshot();
  });
  it("should add a period", async () => {
    const onSubmit = jest.fn();
    const { container, getByText, getAllByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    await wait(() => getAllByText(/supprimer/i));
    expect(container).toMatchSnapshot();
  });
});
