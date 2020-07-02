import { render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { SalaireTempsPartiel } from "../SalaireTempsPartiel";

describe("<SalaireTempsPartiel />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          periods: [
            { duration: 12, salary: 2000, type: "Temps plein" },
            { duration: 6, salary: 1000, type: "Temps partiel" },
          ],
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
            { duration: 12, salary: 2000, type: "Temps plein" },
            { duration: 6, salary: 1000, type: "Temps partiel" },
          ],
        }}
        mutators={{ ...arrayMutators }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    const [deleteButton] = getAllByText(/supprimer/i);
    deleteButton.click();
    expect(container).toMatchSnapshot();
  });
  it("should add a period", async () => {
    const onSubmit = jest.fn();
    const { getAllByText, getByText } = render(
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          periods: [
            { duration: 12, salary: 2000, type: "Temps plein" },
            { duration: 6, salary: 1000, type: "Temps partiel" },
          ],
        }}
        onSubmit={onSubmit}
        render={() => <SalaireTempsPartiel name="periods" />}
      />
    );
    const addButton = getByText(/ajouter/i);
    addButton.click();
    expect(getAllByText(/supprimer/i).length).toBe(3);
  });
});
